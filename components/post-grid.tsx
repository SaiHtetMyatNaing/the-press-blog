import { getAllPostsResult, Post } from "@/server/types/posts"
import PostCard from "./post-card"

export default async function PostGrid({displayPosts} : {displayPosts : getAllPostsResult}) {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-2">Latest Articles</h2>
          <div className="w-12 h-1 bg-primary rounded-full"></div>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div> */}

          {/* Search bar on the right
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-sm border border-secondary bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div> */}
        </div>

        {/* Asymmetrical Grid Layout with uniform card heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts && displayPosts.posts.map((post) => (
            <div key={post.id} className="h-full">
              <PostCard post={post} />
            </div>
          ))}
        </div>

        {!displayPosts &&  (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No articles found. Try adjusting your filters or search query.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
