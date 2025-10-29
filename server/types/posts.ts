import { Prisma } from "@/src/generated/client";

// Get all post pagination
export type Pagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Use Prisma's generated Post Type
export type Post = Prisma.PostGetPayload<{
    include: {
        category: {
            select: {
                id: true;
                title: true;
            }
        }
    }
}>

// Get all post Result
export type getAllPostsResult = {
    posts: Post[];
    pagination: Pagination;
}