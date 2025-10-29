import CategoryFilterSkeleton from "@/components/blog/blog-category-filtered-skeleton";
import CategoryFilter from "@/components/blog/blog-filtered";
import PostGrid from "@/components/blog/blog-grid";
import { PostGridSkeleton } from "@/components/blog/blog-grid-skeleton";
import { getAllCategories } from "@/server/dal/categories";
import { getAllPosts } from "@/server/dal/posts";
import { Suspense } from "react";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const categorySlug = params?.category;
  const page = params?.page ? parseInt(params.page, 10) : 1;
  const categories = await getAllCategories();
  const displayPosts = await getAllPosts(categorySlug, page, 10);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <header className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
          Latest Articles
        </h1>
        <div className="w-16 h-1 bg-primary rounded-full" />
      </header>
      <Suspense fallback={<CategoryFilterSkeleton/>}>
        <CategoryFilter
          selectedCategory={categorySlug}
          categories={categories}
        />
      </Suspense>

      <Suspense fallback={<PostGridSkeleton />}>
        <PostGrid displayPosts={displayPosts} />
      </Suspense>
    </div>
  );
}
