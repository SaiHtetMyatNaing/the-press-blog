"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Edit2, Trash2, Plus } from "lucide-react"

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
]

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [userPosts, setUserPosts] = useState<typeof SAMPLE_POSTS>([])

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const filtered = SAMPLE_POSTS.filter((post) => post.authorId === user.id)
    setUserPosts(filtered)
  }, [user, router])

  if (!user) {
    return null
  }

  const handleDelete = (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      console.log("Deleting post:", postId)
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
              <div>
                <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-2">{user.name}</h1>
                <p className="text-muted-foreground text-lg">{user.email}</p>
              </div>
              <Link
                href="/profile/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors font-medium"
              >
                <Plus className="w-5 h-5" />
                New Article
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card p-6 rounded-sm border border-border">
                <p className="text-muted-foreground text-sm mb-1">Total Articles</p>
                <p className="text-3xl font-bold text-foreground">{userPosts.length}</p>
              </div>
              <div className="bg-card p-6 rounded-sm border border-border">
                <p className="text-muted-foreground text-sm mb-1">Member Since</p>
                <p className="text-lg font-semibold text-foreground">
                  {new Date(Date.now()).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="bg-card p-6 rounded-sm border border-border">
                <p className="text-muted-foreground text-sm mb-1">Categories</p>
                <p className="text-lg font-semibold text-foreground">
                  {new Set(userPosts.map((p) => p.category)).size}
                </p>
              </div>
            </div>
          </div>

          {/* Articles Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-6">Your Articles</h2>

            {userPosts.length === 0 ? (
              <div className="bg-card p-12 rounded-sm border border-border text-center">
                <p className="text-muted-foreground text-lg mb-4">You haven't published any articles yet.</p>
                <Link
                  href="/profile/create"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Article
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-card p-6 rounded-sm border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <Link href={`/article/${post.id}`}>
                          <h3 className="text-xl font-serif font-bold text-foreground hover:text-primary transition-colors mb-2">
                            {post.title}
                          </h3>
                        </Link>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="inline-block px-2 py-1 bg-secondary rounded text-xs font-medium">
                            {post.category}
                          </span>
                          <span>•</span>
                          <span>{post.readingTime} min read</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/profile/edit/${post.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-sm hover:bg-secondary/80 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Edit</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-sm hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
