"use client";

import { SelectCategory } from "@/server/types/categories";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BlogSearch from "./blog-search";
import { cn } from "@/lib/utils";   // shadcn's cn() helper

export default function CategoryFilter({
  selectedCategory,
  categories,
}: {
  selectedCategory?: string;
  categories: SelectCategory[];
}) {
  const searchParams = useSearchParams();
  const pathName = usePathname()
  /** Build the href for a given category (or "All") */
  const buildHref = (cat?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat) params.set("category", cat);
    else params.delete("category");
    return `/blogs?${params.toString()}`;
  };

  // Scale animation (same as before)
  const clickScale =
    "transition-all duration-75 active:scale-95 hover:scale-[1.02]";

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-wrap gap-2">
        {/* "All" link */}
        <Link href={buildHref()} >
          <Button
            variant={!selectedCategory ? "default" : "secondary"}
            className={cn(clickScale, "cursor-pointer")}
          >
            All
          </Button>
        </Link>

        {/* Category links */}
        {categories.map((category) => (
          <Link
            key={category.id}
            href={buildHref(category.title)}
            >
            <Button
              variant={
                selectedCategory === category.title ? "default" : "secondary"
              }
              className={cn(clickScale, "cursor-pointer")}
            >
            {category.title}
            </Button>
          </Link>
        ))}
      </div>

      <BlogSearch />
    </div>
  );
}