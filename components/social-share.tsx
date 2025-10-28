"use client"

import { Share2, Twitter, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function SocialShare({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  return (
    <div className="bg-muted rounded-sm p-6">
      <h3 className="font-serif font-bold text-foreground mb-4 flex items-center gap-2">
        <Share2 className="w-5 h-5" />
        Share
      </h3>

      <div className="space-y-3">
        <Link
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-background rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
        >
          <Twitter className="w-4 h-4" />
          Twitter
        </Link>

        <Link
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-background rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </Link>

        <a
          href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`}
          className="flex items-center gap-3 p-3 bg-background rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
        >
          <Mail className="w-4 h-4" />
          Email
        </a>

        <button
          onClick={handleCopy}
          className="w-full flex items-center gap-3 p-3 bg-background rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
        >
          <Share2 className="w-4 h-4" />
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  )
}
