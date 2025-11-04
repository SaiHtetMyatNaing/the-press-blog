'use client'

import { Share2, Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

interface SocialShareProps {
  title: string;
  url: string;
}

export default function SocialShare({ title, url }: SocialShareProps) {
  const shareUrl = encodeURIComponent(url);

  return (
    <div className="bg-muted rounded-sm p-6">
      <h3 className="font-serif font-bold text-foreground mb-4 flex items-center gap-2">
        <Share2 className="w-5 h-5" />
        Share
      </h3>

      <div className="space-y-3">
        {/* Twitter */}
        <Link
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-background rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
        >
          <Twitter className="w-4 h-4" />
          Twitter
        </Link>

        {/* LinkedIn */}
        <Link
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-background rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </Link>

        {/* Email */}
        <a
          href={`mailto:?subject=${encodeURIComponent(title)}&body=${shareUrl}`}
          className="flex items-center gap-3 p-3 bg-background rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
        >
          <Mail className="w-4 h-4" />
          Email
        </a>

        {/* Copy Link */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(url);
            alert("Link copied to clipboard!");
          }}
          className="w-full flex items-center gap-3 p-3 bg-background rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
        >
          <Share2 className="w-4 h-4" />
          Copy Link
        </button>
      </div>
    </div>
  );
}