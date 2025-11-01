"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const CATEGORIES = ["Tech", "Finance", "Lifestyle", "Other"]

// Optional: Custom animated button (or enhance shadcn Button)
const AnimatedButton = ({
  children,
  ...props
}: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      className="transform-gpu transition-all duration-150 ease-out active:scale-95 hover:scale-105 cursor-pointer"
      {...props}
    >
      {children}
    </Button>
  )
}

export default function CreatePostPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <div className="border-b bg-background">
        <div className="container max-w-3xl mx-auto px-4 py-4">
          <Button asChild variant="ghost" size="sm" className="cursor-pointer">
            <Link href="/profile">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Link>
          </Button>
        </div>
      </div>

      <div className="container max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <Card>
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold">Create New Article</CardTitle>
            <CardDescription>
              Fill in the details and publish your article.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Article Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  required
                  placeholder="Enter article title"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue="Tech">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  required
                  rows={3}
                  placeholder="Brief summary of your article"
                  className="resize-none"
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Article Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  required
                  rows={10}
                  placeholder="Write your article content here..."
                  className="resize-none font-mono text-sm"
                />
              </div>

              {/* Reading Time & Thumbnail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="readingTime">Reading Time (min)</Label>
                  <Input
                    id="readingTime"
                    name="readingTime"
                    type="number"
                    min="1"
                    defaultValue={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail URL</Label>
                  <Input
                    id="thumbnail"
                    name="thumbnail"
                    type="text"
                    defaultValue="/blog-article.jpg"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Animated Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <AnimatedButton type="submit" className="flex-1">
                  Publish Article
                </AnimatedButton>
                <AnimatedButton
                  type="button"
                  variant="outline"
                  asChild
                  className="flex-1"
                >
                  <Link href="/profile">Cancel</Link>
                </AnimatedButton>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}