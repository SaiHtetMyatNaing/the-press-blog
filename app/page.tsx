import Posts from "@/components/blog/Posts";
import Hero from "@/components/hero";
import Newsletter from "@/components/newsletter";

export default async function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Latest Posts</h2>
          <p className="text-muted-foreground text-lg">
            Insights, tutorials, and updates from our blog
          </p>
        </div>
        <Posts categorySlug='' page={1} limit={6} />
      </section>
      
      <Newsletter />
    </main>
  );
} 