// Posts.tsx - server component
import { getAllPosts } from "@/server/dal/posts";
import PostGrid from "@/components/blog/blog-grid";

export default async function Posts({ categorySlug, page = 1 , limit =10 }: { categorySlug?: string; page?: number , limit?:number }) {
  const displayPosts = await getAllPosts(categorySlug, page, limit);
  return <PostGrid displayPosts={displayPosts} />;
}
