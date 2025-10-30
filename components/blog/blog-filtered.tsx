"use client";

import { SelectCategory } from "@/server/types/categories";
import { useRouter, useSearchParams } from "next/navigation";
import BlogSearch from "./blog-search";


export default function CategoryFilter({ selectedCategory , categories }: { selectedCategory?: string , categories : SelectCategory[]}) {
  const router = useRouter();
  const searchParams = useSearchParams();


  function selectCategory(category: string | undefined) {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.set("page", "1"); // reset page on filter change
    router.push(`/blogs?${params.toString()}`);
  }

  return (
    <div className="flex justify-between items cetner ">
   <div className="flex flex-wrap gap-2">
      <button
        onClick={() => selectCategory(undefined)}
        className={`px-4 py-2 rounded-sm text-sm cursor-pointer font-medium transition-colors ${
          !selectedCategory
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-foreground hover:bg-secondary/80"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => selectCategory(category.title)}
          className={`px-4 py-2 rounded-sm text-sm cursor-pointer font-medium transition-colors ${
            selectedCategory === category.title
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-foreground hover:bg-secondary/80"
          }`}
        >
          {category.title}
        </button>
      ))}
    </div>
    <BlogSearch/>
    </div>
  );
}
