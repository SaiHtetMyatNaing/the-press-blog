"use client"

import Hero from "@/components/hero"
import PostGrid from "@/components/post-grid"
import Newsletter from "@/components/newsletter"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <PostGrid />
      <Newsletter />
    </main>
  )
}
