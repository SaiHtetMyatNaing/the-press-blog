// Categories.tsx - server component
import { getAllCategories } from "@/server/dal/categories";
import CategoryFilter from "@/components/blog/blog-filtered";

export default async function Categories({ selectedCategory }: { selectedCategory?: string }) {
  const categories = await getAllCategories();
  return <CategoryFilter categories={categories} selectedCategory={selectedCategory} />;
}
