import { Prisma } from "@prisma/client";


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

// The shape of a single post as used in the UI
export type PostCardProps = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail: string;
  createdAt: Date;
  category: {
    title: string;
  };
  author: {
    name: string | null;
  };
};

// Get all post pagination
export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type PostPreview = Prisma.PostGetPayload<{
  select: {
    id: true;
    title: true;
    slug: true;
    excerpt: true;
    createdAt: true;
    updatedAt: true;
    thumbnail: true;
    readingTime: true;
    authorId: true;
    categoryId: true;
    author: { select: { id: true; name: true } };
    category: { select: { id: true; title: true } };
  };
}>;

// Get all post Result
export type getAllPostsResult = {
    posts: PostPreview[];
    pagination: Pagination;
}