import { getAllPostsResult, Post } from "@/server/types/posts";
import PostCard from "./blog-card";
import Link from "next/link";
import BlogSearch from "./blog-search";

export default async function PostGrid({
  displayPosts,
}: {
  displayPosts: getAllPostsResult;
}) {
  return (
    <section className="bg-background mb-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        </div>

        {/* Asymmetrical Grid Layout with uniform card heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts &&
            displayPosts.posts.map((post) => (
              <div key={post.id} className="h-full">
                <PostCard post={post} />
              </div>
            ))}
        </div>

        {displayPosts.posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            {/* Optional: Add a subtle illustration or icon */}
            <div className="mb-6 w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-2">
              No articles found
            </h3>

            <p className="text-muted-foreground max-w-md mb-8">
              We couldn't find any articles matching your current filters or
              search. Try adjusting your query or exploring different topics.
            </p>

            {/* Optional CTA: Encourage exploration */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link  href="/blogs" className="px-5 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium">
                Clear Filters
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
