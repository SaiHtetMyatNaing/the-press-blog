"use client"

import Link from "next/link"
import { Edit2, Trash2, Plus } from "lucide-react"
import { SAMPLE_POSTS } from "@/lib/posts"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  const userPosts = SAMPLE_POSTS.filter(
    (post) => post.authorId === 'cmhewfszu0000tyt4vjrivzwl'
  )

  const handleDelete = (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      console.log("Deleting post:", postId)
      // Add real delete logic here later
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">My Profile</h1>
              <p className="text-muted-foreground mt-1">Manage your articles and content</p>
            </div>
            <Button asChild>
              <Link href="/profile/create">
                <Plus className="w-4 h-4 mr-2" />
                New Article
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">Total Articles</p>
                <p className="text-3xl font-bold mt-1">{userPosts.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                <p className="text-lg font-semibold mt-1">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-lg font-semibold mt-1">
                  {new Set(userPosts.map((p) => p.category)).size}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Articles Section */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Your Articles</h2>

          {userPosts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-lg text-muted-foreground mb-4">
                  You haven't published any articles yet.
                </p>
                <Button asChild>
                  <Link href="/profile/create">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Article
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {userPosts.map((post) => (
                <Card key={post.id} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <Link href={`/article/${post.id}`}>
                          <h3 className="text-xl font-semibold hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          <Separator orientation="vertical" className="h-4" />
                          <Badge variant="secondary">{post.category}</Badge>
                          <Separator orientation="vertical" className="h-4" />
                          <span>{post.readingTime} min read</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="secondary">
                          <Link href={`/profile/edit/${post.id}`}>
                            <Edit2 className="w-4 h-4 mr-1" />
                            <span className="hidden sm:inline">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 