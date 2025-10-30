import "server-only";
import { cache } from "react";
import { prisma } from "../db/prisma";
import { Post } from "../types/posts";

// Get All Posts by using pagination
export const getAllPosts = cache(
  async (
    categorySlug?: string,
    page: number = 1,
    limit: number = 10,
    searchQuery?: string
  ) => {
    const whereCondition: any = {};

    if (categorySlug) {
      whereCondition.category = { title: categorySlug };
    }

    // Add search filter
    if (searchQuery && searchQuery.trim()) {
      whereCondition.OR = [
        {
          title: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
        {
          excerpt: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
      ];
    }

    try {
      const skip = (page - 1) * limit;

      const [posts, total] = await prisma.$transaction([
        prisma.post.findMany({
          where: whereCondition,
          skip,
          take: limit,
          include: {
            author: true,
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
        prisma.post.count(),
      ]);

      return {
        posts,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error("Posts fetch failed:", error);
      throw new Error("Failed to Fetch Posts");
    }
  }
);

// Get all post by Id
export const getPostById = cache(async (id: string): Promise<Post> => {
  const single_post = await prisma.post.findUnique({
    where: { id },
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
