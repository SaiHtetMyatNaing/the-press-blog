import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Top Navigation */}
      <div className="border-b">
        <div className="container max-w-3xl mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" disabled className="cursor-default">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-800" />
          </Button>
        </div>
      </div>

      <div className="container max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <Card>
          <CardHeader className="pb-6 space-y-3">
            <Skeleton className="h-8 w-64 bg-gray-200 dark:bg-gray-800" />
            <Skeleton className="h-5 w-80 bg-gray-200 dark:bg-gray-800" />
          </CardHeader>

          <CardContent>
            <div className="space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-gray-800" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
                  <Skeleton className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
                  <Skeleton className="h-4 w-3/4 rounded-md bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-800" />
                <div className="space-y-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-800"
                    />
                  ))}
                  <Skeleton className="h-4 w-5/6 rounded-md bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>

              {/* Reading Time & Thumbnail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-800" />
                  <Skeleton className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28 bg-gray-200 dark:bg-gray-800" />
                  <Skeleton className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <Skeleton className="h-10 flex-1 rounded-md bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="h-10 flex-1 rounded-md bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}