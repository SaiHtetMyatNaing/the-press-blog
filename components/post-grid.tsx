"use client"

import { useState, useMemo } from "react"
import PostCard from "./post-card"
import { Search } from "lucide-react"

const SAMPLE_POSTS = [
  {
    id: "1",
    title: "The Future of AI in Web Development",
    excerpt: "Exploring how artificial intelligence is transforming the way we build web applications.",
    content: "AI is revolutionizing web development...",
    category: "Tech",
    thumbnail: "/artificial-intelligence-technology.png",
    readingTime: 8,
    authorId: "user1",
    authorName: "John Doe",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Understanding React Server Components",
    excerpt: "A deep dive into React Server Components and how they improve performance.",
    content: "React Server Components are a game changer...",
    category: "Tech",
    thumbnail: "/blog-article.jpg",
    readingTime: 10,
    authorId: "user1",
    authorName: "John Doe",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    title: "Stock Market Trends in 2024",
    excerpt: "Analyzing the key trends and predictions for the stock market this year.",
    content: "The stock market is showing interesting patterns...",
    category: "Finance",
    thumbnail: "/financial-markets-stock-trading.jpg",
    readingTime: 7,
    authorId: "user2",
    authorName: "Jane Smith",
    createdAt: new Date("2024-01-08"),
  },
  {
    id: "4",
    title: "Minimalist Living: A Guide to Simplicity",
    excerpt: "Learn how to embrace minimalism and find peace in simplicity.",
    content: "Minimalism is more than just decluttering...",
    category: "Lifestyle",
    thumbnail: "/minimalist-living.jpg",
    readingTime: 6,
    authorId: "user3",
    authorName: "Mike Johnson",
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "5",
    title: "Web Performance Optimization Tips",
    excerpt: "Essential techniques to make your website faster and more efficient.",
    content: "Performance is crucial for user experience...",
    category: "Tech",
    thumbnail: "/web-performance.jpg",
    readingTime: 9,
    authorId: "user1",
    authorName: "John Doe",
    createdAt: new Date("2024-01-03"),
  },
  {
    id: "6",
    title: "Personal Finance: Building Wealth",
    excerpt: "Strategies and tips for building long-term wealth and financial security.",
    content: "Building wealth requires discipline and planning...",
    category: "Finance",
    thumbnail: "/personal-finance.jpg",
    readingTime: 8,
    authorId: "user2",
    authorName: "Jane Smith",
    createdAt: new Date("2024-01-01"),
  },
]

export default function PostGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const displayPosts = useMemo(() => {
    let filtered = [...SAMPLE_POSTS].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.authorName.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [selectedCategory, searchQuery])

  const categories = useMemo(() => {
    const cats = new Set(SAMPLE_POSTS.map((post) => post.category))
    return ["All", ...Array.from(cats).sort()]
  }, [])

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-2">Latest Articles</h2>
          <div className="w-12 h-1 bg-primary rounded-full"></div>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
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
          </div>

          {/* Search bar on the right */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-sm border border-secondary bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Asymmetrical Grid Layout with uniform card heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
            <div key={post.id} className="h-full">
              <PostCard post={post} />
            </div>
          ))}
        </div>

        {displayPosts.length === 0 && (
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
