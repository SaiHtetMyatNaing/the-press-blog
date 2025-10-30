import Posts from "@/components/blog/Posts";
import Hero from "@/components/hero";
import Newsletter from "@/components/newsletter";

export default async function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
              <Posts categorySlug='' page={1} limit={6} />
      <Newsletter />
    </main>
  );
}
