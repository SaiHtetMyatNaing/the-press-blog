import "server-only";
import { cache } from "react";
import { prisma } from "../db/prisma";
import { Post } from "../types/posts";

// Get All Posts by using pagination
export const getAllPosts = cache(
  async (page: number = 1, limit: number = 10) => {
    try {
      const skip = (page - 1) * limit;

      const [posts, total] = await prisma.$transaction([
        prisma.post.findMany({
          skip,
          take: limit,
          include: {
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
      throw new Error("Failed to Fetch Posts");
    }
  }
);

// Get all post by Id 
export const getPostById = cache(async(id: string): Promise<Post> => {
    const single_post = await prisma.post.findUnique({
        where: { id },
        include: {
            category: {
                select: {
                    id: true,
                    title: true,
                }
            }
        }
    })
    
    if (!single_post) {
        throw new Error("Post not found")
    }
    
    return single_post
})
