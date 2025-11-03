"use client";

import { SelectCategory } from "@/server/types/categories";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BlogSearch from "./blog-search";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { useState } from "react";
import { Spinner } from "../spinner";

export default function CategoryFilter({
  selectedCategory, // ← This is now the SLUG from URL
  categories,
}: {
  selectedCategory?: string;
  categories: SelectCategory[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingCategory, setPendingCategory] = useState<string | null>(null);

  // Build URL with category slug
  const buildHref = (catSlug?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (catSlug) {
      params.set("category", catSlug);
    } else {
      params.delete("category");
    }
    return `/blogs?${params.toString()}`;
  };


  //to handle the loading stage
  const handleClick = (catSlug?: string) => {
    const target = catSlug ?? "";
    setPendingCategory(target);
    startTransition(() => {
      router.push(buildHref(catSlug));
    });
  };

  const clickScale =
    "transition-all duration-75 active:scale-95 hover:scale-[1.02]";

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-wrap gap-2">
        {/* "All" Button */}
        <Link
          href={buildHref()}
          onClick={(e) => {
            e.preventDefault()
            handleClick();
          }}
          replace={pathname === "/blogs"}
        >
          <Button
            variant={!selectedCategory ? "default" : "secondary"}
            className={cn(clickScale, "flex items-center gap-1.5")}
            disabled={isPending}
          >
            All
            {isPending && pendingCategory === "" && <Spinner />}
          </Button>
        </Link>

        {/* Category Buttons */}
        {categories.map((category) => {
          const isActive = selectedCategory === category.title;
          const isPendingThis = isPending && pendingCategory === category.title;

          return (
            <Link
              key={category.id}
              href={buildHref(category.title)}
              onClick={(e) => {
                e.preventDefault()
                handleClick(category.title);
              }}
              replace={pathname === "/blogs"}
            >
              <Button
                variant={isActive ? "default" : "secondary"}
                className={cn(clickScale, "flex items-center gap-1.5")}
                disabled={isPending}
              >
                {category.title}
                {isPendingThis && <Spinner />}
              </Button>
            </Link>
          );
        })}
      </div>

      <BlogSearch />
    </div>
  );
}