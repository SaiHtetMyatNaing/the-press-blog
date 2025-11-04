"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface AuthorBioProps {
  authorId: string
  authorName: string
  postCount : number
}

const authorImages: Record<string, string> = {
  admin: "/professional-woman-headshot.png",
}

export default function AuthorBio({ authorId, authorName , postCount }: AuthorBioProps) {
  
  const authorImage = authorImages[authorId] || "/professional-headshot.png"

  return (
    <section className="bg-muted py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <img
            src={authorImage || "/placeholder.svg"}
            alt={authorName}
            className="w-24 h-24 rounded-sm object-cover shrink-0"
          />

          <div className="flex-1">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{authorName}</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Experienced writer and journalist covering technology, finance, and culture with insightful analysis and
              thought-provoking perspectives.
            </p>

            <div className="flex items-center gap-6 text-sm">
              <span className="text-foreground">
                <strong>{postCount}</strong> articles published
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
