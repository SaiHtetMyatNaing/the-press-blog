import Hero from "@/components/hero";
import Newsletter from "@/components/newsletter";

export default async function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      
      <Newsletter />
    </main>
  );
}
