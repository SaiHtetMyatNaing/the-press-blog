import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function Loading() {
  return (
    <main className="min-h-screen">
      <div className="container max-w-5xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        {/* Header Skeleton */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <div className="space-y-3">
              <Skeleton className="h-12 w-64 bg-gray-200 dark:bg-gray-800" />
              <Skeleton className="h-5 w-48 bg-gray-200 dark:bg-gray-800" />
            </div>
            <Skeleton className="h-10 w-36 rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6 space-y-2">
                  <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-800" />
                  <Skeleton className="h-8 w-16 bg-gray-200 dark:bg-gray-800" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Articles Section Skeleton */}
        <div>
          <Skeleton className="h-8 w-48 mb-6 bg-gray-200 dark:bg-gray-800" />

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-6 w-full max-w-lg bg-gray-200 dark:bg-gray-800" />
                      <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800" />
                      <div className="flex flex-wrap items-center gap-3">
                        <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-800" />
                        <Separator orientation="vertical" className="h-4" />
                        <Skeleton className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-800" />
                        <Separator orientation="vertical" className="h-4" />
                        <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-800" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-9 w-16 rounded-md bg-gray-200 dark:bg-gray-800" />
                      <Skeleton className="h-9 w-16 rounded-md bg-gray-200 dark:bg-gray-800" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}