import { PostGridSkeleton } from "@/components/blog/blog-grid-skeleton";
import Posts from "@/components/blog/Posts";
import Hero from "@/components/hero";
import Newsletter from "@/components/newsletter";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
            <Suspense fallback={<PostGridSkeleton />}>
              <Posts categorySlug='' page={1} limit={6} />
            </Suspense>
      <Newsletter />
    </main>
  );
}
