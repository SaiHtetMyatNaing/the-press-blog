import "server-only";
import { cache } from "react";
import { prisma } from "../db/prisma";
import { Post } from "../types/posts";
import { Prisma } from "@prisma/client";

 // Unified function to get all posts with optional category filter
export const getAllPosts = cache(
  async (
    categorySlug?: string,
    page: number = 1,
    limit: number = 10,
    searchQuery?: string
  ) => {
    // Validate and sanitize inputs
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(Math.max(1, limit), 100);

    const whereCondition : any= {};

    // Add category filter
    if (categorySlug) {
      whereCondition.category = { 
        title: {
          equals: categorySlug,
          mode: "insensitive"
        }
      };
    }

    // Add search filter
    if (searchQuery?.trim()) {
      whereCondition.OR = [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { excerpt: { contains: searchQuery, mode: "insensitive" } },
        { content: { contains: searchQuery, mode: "insensitive" } },
      ];
    }

    try {
      const skip = (safePage - 1) * safeLimit;

      const [posts, total] = await prisma.$transaction([
        prisma.post.findMany({
          where: whereCondition,
          skip,
          take: safeLimit,
          include: {
            author : true,
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
export const getPostById = cache(async (slug: string): Promise<Post> => {
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

  if (!single_post) {
    throw new Error("Post not found");
  }

  return single_post;
});

// Counting the posts by author Id
export async function getPostCountByAuthorId(
  authorId: string
): Promise<number> {
  return await prisma.post.count({
    where: {
      authorId: authorId,
    },
  });
}

export async function getPostCount(){
   return await prisma.post.count()
}


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
          title: true, // ✅ Only category title
        },
      },
    },
    take: limit,
  });

  return relatedPosts;
}
