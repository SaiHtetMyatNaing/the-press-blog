import "server-only";
import { cache } from "react";
import { prisma } from "../db/prisma";
import { getAllPostsResult, Post } from "../types/posts";
import { Prisma } from "@prisma/client";
import { CreatePostInput, createPostSchema, UpdatePostInput, updatePostSchema } from "../validations/post.schema";

// Unified function to get all posts with optional category filter
export const getAllPosts = cache(
  async (
    categorySlug?: string,
    page: number = 1,
    limit: number = 10,
    searchQuery?: string
  ): Promise<getAllPostsResult> => {
    // Validate and sanitize inputs
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(Math.max(1, limit), 100);

    const whereCondition: any = {};

    // Add category filter
    if (categorySlug) {
      whereCondition.category = {
        title: {
          equals: categorySlug,
          mode: "insensitive",
        },
      };
    }

    // Add search filter
    if (searchQuery?.trim()) {
      whereCondition.OR = [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { excerpt: { contains: searchQuery, mode: "insensitive" } },
      ];
    }

    try {
      const skip = (safePage - 1) * safeLimit;

      const [posts, total] = await prisma.$transaction([
        prisma.post.findMany({
          where: whereCondition,
          skip,
          take: safeLimit,
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            createdAt: true,
            thumbnail: true,
            readingTime: true,
            authorId: true,
            categoryId: true,
            updatedAt: true,
            author: {
              select: {
                id: true,
                name: true,
              },
            },
            category: {
              select: {
                id: true,
                title: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
        prisma.post.count({ where: whereCondition }),
      ]);

      const totalPages = Math.ceil(total / safeLimit);

      return {
        posts,
        pagination: {
          page: safePage,
          limit: safeLimit,
          total,
          totalPages,
          hasNextPage: safePage < totalPages,
          hasPrevPage: safePage > 1,
        },
      };
    } catch (error) {
      console.error("Posts fetch failed:", error);
      throw new Error("Failed to fetch posts");
    }
  }
);

// Get all post by slug
export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const single_post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: true,
      category: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
  return single_post;
});

// Counting the posts by author Id
export async function getPostCountByAuthorId(
  authorId: string
): Promise<number | null> {
  return await prisma.post.count({
    where: {
      authorId,
    },
  });
}

export async function getPostCount() {
  return await prisma.post.count();
}

//get posts by user name
export const getPostByUserId = async (id: string) => {
  return await prisma.post.findMany({
    where: {
      authorId: id,
    },
    include: {
      category: {
        select: {
          title: true
        }
      }
    }
  });
};

//get related post by Category id
export async function getRelatedPosts(
  postId: string,
  categoryId: string,
  limit: number = 3
) {
  const relatedPosts = await prisma.post.findMany({
    where: {
      categoryId: categoryId,
      NOT: {
        id: postId, // Exclude the current post
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      thumbnail: true,
      readingTime: true,
      createdAt: true,
      author: {
        select: {
          name: true,
          image: true,
        },
      },
      category: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    take: limit,
  });

  return relatedPosts;
}

export async function createPost(input: CreatePostInput) {
  const validatedData = createPostSchema.parse(input);
  return await prisma.post.create({
    data: validatedData,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      category: true,
    },
  });
}

export async function updatePostByById(data : UpdatePostInput , id : string){

  const validatedData = updatePostSchema.parse(data)

  // 2. Update post in database
  const updatedPost = await prisma.post.update({
    where: { id },
    data: validatedData,
    select: {
      id: true,
      title: true,
      content: true,
      categoryId: true,
      readingTime: true,
      updatedAt: true,
    },
  })
  return updatedPost
}

export async function deletePostById(id : string){
    const deletedPost = await prisma.post.delete({
       where : {
         id
       }
    })
  return deletedPost
}

export async function checkUserOwnThePost(id : string){
     const post = await prisma.post.findUnique({
      where: { id },
      select: { authorId: true }
    })
    return post
}
   
