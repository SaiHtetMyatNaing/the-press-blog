import { getAllCategories } from "@/server/dal/categories";
import CategoryFilter from "@/components/blog/blog-filtered";
import { Suspense } from "react";
import CategoryFilterSkeleton from "./blog-category-filtered-skeleton";
import BlogSearch from "./blog-search";

export default async function Categories({
  selectedCategory,
}: {
  selectedCategory?: string;
}) {
  const categories = await getAllCategories();
   
  const uniqueCategories = Array.from(
    new Map(categories.map(cat => [cat.title, cat])).values()
  );

  return (
    <Suspense  fallback={<CategoryFilterSkeleton />}>
      <CategoryFilter
        categories={uniqueCategories}
        selectedCategory={selectedCategory}
      />;
    </Suspense>
  );
}
