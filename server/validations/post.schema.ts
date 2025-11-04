  import { z } from "zod";

  export const createPostSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    slug: z
      .string()
      .min(1, "Slug is required")
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
    excerpt: z.string().min(1, "Excerpt is required").max(500),
    content: z.string().min(1, "Content is required"),
    thumbnail: z.string().url("Invalid thumbnail URL"),
    readingTime: z.number().int().positive(),
    authorId: z.string().min(1, "Author ID is required"),
    categoryId: z.string().min(1, "Category ID is required"),
  });

  export const updatePostSchema = z.object({
    title: z.string().min(1).max(255).optional(),
    slug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional(),
    excerpt: z.string().max(500).optional(),
    content: z.string().optional(),
    thumbnail: z.string().url().optional(),
    readingTime: z.number().int().positive().optional(),
    categoryId: z.string().optional(),
  });

  export const createPostFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  excerpt: z.string().min(1, "Excerpt is required").max(500),
  content: z.string().min(1, "Content is required"),
  thumbnail: z.string().url("Invalid thumbnail URL"),
  categoryId: z.string().min(1, "Category ID is required"),
});

export type CreatePostFormInput = z.infer<typeof createPostFormSchema>;
  export type CreatePostInput = z.infer<typeof createPostSchema>;
  export type UpdatePostInput = z.infer<typeof updatePostSchema>;
