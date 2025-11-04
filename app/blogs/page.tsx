// app/blogs/page.tsx
import { Metadata } from "next";
import Categories from "@/app/_components/blog/Categories";
import Posts from "@/app/_components/blog/Posts";

type Props = {
  searchParams: Promise<{
    category?: string;
    page?: string;
    search?: string;
  }>;
};

export const generateMetadata = async ({ searchParams }: Props): Promise<Metadata> => {
  const params = await searchParams;
  const category = params?.category;
  const search = params?.search;
  const page = params?.page ? parseInt(params.page, 10) : 1;

  // Base values
  let title = "All Articles";
  let description = "Browse our full collection of thoughtful articles on technology, finance, culture, and modern life.";
  let canonical = "/blogs";

  // Dynamic based on filters
  if (search) {
    title = `${search}  `;
    description = `Search results for "${search}". Discover articles on tech, finance, and culture.`;
    canonical = `/blogs?search=${encodeURIComponent(search)}`;
  } else if (category) {
    title = `${category.charAt(0).toUpperCase() + category.slice(1)} Articles`;
    description = `Explore in-depth articles about ${category}. Thoughtful insights on innovation and modern life.`;
    canonical = `/blogs?category=${category}`;
  } else if (page > 1) {
    title = `Page ${page} - All Articles`;
    description = `Page ${page} of our latest articles on technology, finance, and culture.`;
    canonical = `/blogs?page=${page}`;
  }

  return {
    title,
    description,

    openGraph: {
      url: canonical,
      title: `The Press | ${title} `,
      description,
      images: [
        {
          url: "/og-image.png", // metadataBase → full URL
          width: 1200,
          height: 630,
          alt: "The Press - Latest Articles",
        },
      ],
    },

    twitter: {
      title: `${title} | The Press`,
      description,
      images: ["/og-image.png"],
    },

    alternates: {
      canonical,
    },

    // Optional: Prevent indexing deep pagination or empty search
    robots: page > 5 || (search && search.length < 3)
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
};

export default async function PostsPage({ searchParams }: Props) {
  const params = await searchParams;
  const categorySlug = params?.category;
  const search = params?.search;
  const page = params?.page ? parseInt(params.page, 10) : 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-20">
      <header className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
          {search ? `Search: "${search}"` : categorySlug ? `${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}` : "Latest Articles"}
        </h1>
        <div className="w-16 h-1 bg-primary rounded-full" />
      </header>
      <Categories selectedCategory={categorySlug} />
      <Posts
        categorySlug={categorySlug}
        page={page}
        limit={12}
        search={search}
      />
    </div>
  );
}