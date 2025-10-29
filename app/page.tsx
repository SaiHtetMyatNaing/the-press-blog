
import Hero from "@/components/hero"
import PostGrid from "@/components/post-grid"
import Newsletter from "@/components/newsletter"
import { getAllPosts } from "@/server/dal/posts"

export default async function Home() {
  const displayPosts = await getAllPosts()
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      {displayPosts && <PostGrid displayPosts={displayPosts}/>}
      <Newsletter />
    </main>
  )
}
