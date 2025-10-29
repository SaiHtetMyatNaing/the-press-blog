import Hero from "@/components/hero";
import PostGrid from "@/components/post-grid";
import Newsletter from "@/components/newsletter";
import { getAllPosts } from "@/server/dal/posts";
import { Suspense } from "react";
import { PostGridSkeleton } from "@/components/post-grid-skeleton";
export const experimental_ppr = true;

export default async function Home() {
  const displayPosts = await getAllPosts();
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Suspense fallback={<PostGridSkeleton />}>
        <PostGrid displayPosts={displayPosts} />
      </Suspense>
      <Newsletter />
    </main>
  );
}
