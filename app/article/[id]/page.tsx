import { notFound } from "next/navigation"
import Link from "next/link"
import ArticleContent from "@/components/article-content"
import TableOfContents from "@/components/table-of-contents"
import SocialShare from "@/components/social-share"
import AuthorBio from "@/components/author-bio"
import RelatedPosts from "@/components/related-posts"
import Newsletter from "@/components/newsletter"

const SAMPLE_POSTS = [
  {
    id: "1",
    title: "The Future of AI in Web Development",
    excerpt: "Exploring how artificial intelligence is transforming the way we build web applications.",
    content:
      "AI is revolutionizing web development in unprecedented ways. Machine learning models are now being integrated directly into web applications, enabling smarter user experiences and more efficient data processing. From predictive analytics to natural language processing, AI is transforming how we build and interact with web applications.",
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
    content:
      "React Server Components are a game changer for modern web development. They allow you to render components on the server, reducing the amount of JavaScript sent to the client. This results in faster page loads and better performance overall.",
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
    content:
      "The stock market is showing interesting patterns as we move through 2024. Economic indicators suggest a period of growth, though volatility remains a concern for investors.",
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
    content:
      "Minimalism is more than just decluttering your space. It's a philosophy about living with intention and focusing on what truly matters.",
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
    content:
      "Performance is crucial for user experience. Slow websites lead to higher bounce rates and lower conversion rates.",
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
    content:
      "Building wealth requires discipline and planning. Start by understanding your financial goals and creating a roadmap to achieve them.",
    category: "Finance",
    thumbnail: "/personal-finance.jpg",
    readingTime: 8,
    authorId: "user2",
    authorName: "Jane Smith",
    createdAt: new Date("2024-01-01"),
  },
]

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params since they're now a Promise in Next.js 15
  const { id } = await params
  
  // Find the article directly on the server
  const article = SAMPLE_POSTS.find((p) => p.id === id)

  // If article not found, trigger 404
  if (!article) {
    notFound()
  }

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "main-content", title: "Main Content" },
    { id: "conclusion", title: "Conclusion" },
  ]

  return (
    <main className="min-h-screen bg-background">

      {/* Back to All Blogs Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back to All Blogs
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-sm">
              {article.category}
            </span>
            <span className="text-sm text-muted-foreground">{article.readingTime} min read</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground">
            <span>
              By <strong className="text-foreground">{article.authorName}</strong>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>
              {new Date(article.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-12 rounded-sm overflow-hidden">
          <img src={article.thumbnail || "/placeholder.svg"} alt={article.title} className="w-full h-96 object-cover" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <ArticleContent content={article.content} />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <TableOfContents sections={sections} />
              <SocialShare title={article.title} />
            </div>
          </aside>
        </div>
      </article>

      {/* Author Bio */}
      <AuthorBio authorId={article.authorId} authorName={article.authorName} />

      {/* Related Posts */}
      <RelatedPosts currentId={article.id} />

      {/* Newsletter */}
      <Newsletter />


    </main>
  )
}