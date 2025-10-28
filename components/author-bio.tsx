"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

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
]

interface AuthorBioProps {
  authorId: string
  authorName: string
}

const authorImages: Record<string, string> = {
  admin: "/professional-woman-headshot.png",
}

export default function AuthorBio({ authorId, authorName }: AuthorBioProps) {
  const authorPosts = SAMPLE_POSTS.filter((post) => post.authorId === authorId)
  const authorImage = authorImages[authorId] || "/professional-headshot.png"

  return (
    <section className="bg-muted py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <img
            src={authorImage || "/placeholder.svg"}
            alt={authorName}
            className="w-24 h-24 rounded-sm object-cover flex-shrink-0"
          />

          <div className="flex-1">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{authorName}</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Experienced writer and journalist covering technology, finance, and culture with insightful analysis and
              thought-provoking perspectives.
            </p>

            <div className="flex items-center gap-6 text-sm">
              <span className="text-foreground">
                <strong>{authorPosts.length}</strong> articles published
              </span>
              <Link href="#" className="flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium">
                View all articles
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
