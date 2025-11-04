"use server"

import { getServerSession } from "@/app/_lib/get-session";
import { CreatePostFormInput, createPostFormSchema, CreatePostInput, createPostSchema } from "../validations/post.schema";
import { calculateReadingTime, generateSlug } from "@/app/_lib/utils";
import { createPost, getPostBySlug } from "../dal/posts";
import { revalidatePath } from "next/cache";

export async function createPostAction(data: CreatePostFormInput) {
  try {
    // Get authenticated user
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized. Please sign in to create a post.",
      };
    }

    // Validate input (Zod validation)
    const validatedData = createPostFormSchema.parse(data);

    // Generate slug from title
    const slug = generateSlug(validatedData.title);

    // Check if slug already exists
    const existingPost = await getPostBySlug(slug);
    
    if (existingPost) {
      return {
        success: false,
        error: "A post with this title already exists. Please use a different title.",
      };
    }

    // Calculate reading time
    const readingTime = calculateReadingTime(validatedData.content);

    // Create post
    const post = await createPost({
      ...validatedData,
      slug,
      readingTime,
      authorId: session.user.id,
    });

    // Revalidate paths
    revalidatePath("/profile");
    revalidatePath("/posts");
    revalidatePath(`/posts/${post.slug}`);

    return {
      success: true,
      data: post,
      message: "Post created successfully!",
    };
  } catch (error) {
    console.error("Error creating post:", error);
    
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
    
    return {
      success: false,
      error: "Failed to create post. Please try again.",
    };
  }
}