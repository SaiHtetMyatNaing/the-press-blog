import { Prisma } from "@/src/generated/client";

// Get all post pagination
export type Pagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Use Prisma's generated Post Type(included content)
export type Post = Prisma.PostGetPayload<{
    include: {
        author : true,
        
        category: {
            select: {
                id: true;
                title: true;
            }
        }
    }
}>

export type PostPreview = Prisma.PostGetPayload<{
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
      }
    },
    category: {
      select: {
        id: true,
        title: true,
      }
    }
  }
}>

// Get all post Result
export type getAllPostsResult = {
    posts: Post[];
    pagination: Pagination;
}