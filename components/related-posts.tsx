"use client"

import PostCard from "./post-card"

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

export default function RelatedPosts({ currentId }: { currentId: string }) {
  const related = SAMPLE_POSTS.filter((post) => post.id !== currentId).slice(0, 3)

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-2">Related Articles</h2>
          <div className="w-12 h-1 bg-primary rounded-full"></div>
        </div>

        {related.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No related articles available yet.</p>
        )}
      </div>
    </section>
  )
}
