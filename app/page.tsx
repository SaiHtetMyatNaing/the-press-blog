// app/page.tsx
import { Metadata } from "next";
import Posts from "@/app/_components/blog/Posts";
import Hero from "@/app/_components/hero";
import Newsletter from "@/app/_components/newsletter";
import Link from "next/link";

// PAGE-SPECIFIC METADATA (overrides layout)
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    description:
      "Thoughtfully curated articles exploring innovation, business, and modern life. Join thousands of readers discovering ideas that matter.",

    openGraph: {
      url: "/",
      title: "Insights on Technology, Finance & Culture",
      description: "Curated ideas on tech, finance, and culture.",
      images: [
        {
          url: "/og-image.png",   
          width: 1200,
          height: 630,
          alt: "The Press - Modern Editorial Blog",
        },
      ],
    },

    twitter: {
      title: "Insights on Technology, Finance & Culture",
      description: "Curated insights on innovation, business, and life.",
      images: ["/og-image.jpg"],
    },

    alternates: {
      canonical: "/",
    },
  };
};

export default function Home() {
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
          <Link href="/blogs" className="text-primary hover:underline font-medium">
            View all posts
          </Link>
        </div>
        <Posts categorySlug="" page={1} limit={6} />
      </section>

      <Newsletter />
    </main>
  );
}