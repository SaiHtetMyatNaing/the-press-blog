import Posts from "@/components/blog/Posts";
import Hero from "@/components/hero";
import Newsletter from "@/components/newsletter";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />

      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">Recent Posts</h2>
            <p className="text-muted-foreground text-lg">
              Check out our latest articles and updates
            </p>
          </div>
          <Link
            href="/blogs"
            className="text-primary hover:underline font-medium"
          >
            View all posts →
          </Link>
        </div>
        <Posts categorySlug="" page={1} limit={6} />
      </section>

      <Newsletter />
    </main>
  );
}
