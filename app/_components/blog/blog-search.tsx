"use client";
import { Search, X, Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

// For the searching state , it is AI generated
const BlogSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // What user is typing
  const [query, setQuery] = useState("");

  // Get current search from URL once
  const urlSearch = searchParams.get("search") ?? "";

  // Debounced function to update URL
  const debouncedSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term.trim()) {
      params.set("search", term);
      params.set("page", "1");
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  // When user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  // Clear everything
  const handleClear = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    router.replace(`${pathname}?${params.toString()}`);
  };

  // Is spinner visible?
  // → Show if: user typed something AND URL hasn't caught up
  const isSearching = query.trim() !== urlSearch;

  return (
    <form className="relative w-full sm:w-64" onSubmit={(e) => e.preventDefault()}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={handleChange}
        className="w-full pl-10 pr-10 py-2 rounded-sm border border-secondary bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />

      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
        {isSearching && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
};

export default BlogSearch;