import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import {PostPreview } from "@/server/types/posts"

export default function PostCard({ post }: { post: PostPreview }) {
  return (
    <Link href={`/article/${post.id}`}>
      <article className="group h-full flex flex-col bg-card rounded-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-muted h-48 sm:h-56 md:h-64">
          <Image
            src={post.thumbnail ?? "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {post.category?.title && (
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-sm">
                {post.category.title}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="mb-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-3">
            {post.title}
          </h3>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 flex-1 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {post.author?.name ? (
                <p className="text-xs font-medium text-foreground">{post.author.name}</p>
              ) : (
                <p className="text-xs font-medium text-foreground">Unknown Author</p>
              )}
              {post.readingTime != null ? (
                <p className="text-xs text-muted-foreground">{post.readingTime} min read</p>
              ) : null}
            </div>
            <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  );
}
