import { getAllPosts } from "@/server/dal/posts";
import PostGrid from "@/components/blog/blog-grid";
import { Suspense } from "react";
import { PostGridSkeleton } from "./blog-grid-skeleton";

export default async function Posts({
  categorySlug,
  page = 1,
  limit = 10,
  search
}: {
  categorySlug?: string;
  page?: number;
  limit?: number;
  search?: string;
}) {
  const displayPosts = await getAllPosts(categorySlug, page, limit ,search);

  return (
    <Suspense fallback={<PostGridSkeleton />}>
      <PostGrid displayPosts={displayPosts} />
    </Suspense>
  );
}
