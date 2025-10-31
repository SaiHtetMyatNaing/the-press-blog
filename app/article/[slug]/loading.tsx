// app/articles/[id]/loading.tsx
export default function ArticleLoading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="inline-flex items-center gap-2 text-sm">
          <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-8 space-y-6">
          {/* Category + Read Time */}
          <div className="flex items-center gap-3">
            <div className="h-6 w-20 bg-primary/20 rounded-sm animate-pulse" />
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          </div>

          {/* Title */}
          <div className="space-y-3">
            <div className="h-12 sm:h-14 lg:h-16 bg-gray-300 dark:bg-gray-700 rounded-lg w-full animate-pulse" />
            <div className="h-12 sm:h-14 lg:h-16 bg-gray-300 dark:bg-gray-700 rounded-lg w-11/12 animate-pulse" />
            <div className="h-12 sm:h-14 lg:h-16 bg-gray-300 dark:bg-gray-700 rounded-lg w-10/12 animate-pulse" />
          </div>

          {/* Author + Date */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground">
            <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            <span className="hidden sm:inline">•</span>
            <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>

        {/* Featured Image (Conditional) */}
        <div className="mb-12 rounded-sm overflow-hidden">
          <div className="w-full h-96 bg-gray-300 dark:bg-gray-700 animate-pulse" />
        </div>

        {/* Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Paragraphs */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-11/12 animate-pulse" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-10/12 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents */}
              <div className="space-y-3">
                <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                <div className="space-y-2 pl-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-11/12 animate-pulse"
                    />
                  ))}
                </div>
              </div>

              {/* Social Share */}
              <div className="space-y-3">
                <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Author Bio */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t">
        <div className="flex gap-6">
          <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-11/12 animate-pulse" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-10/12 animate-pulse" />
            </div>
            <div className="h-5 w-24 bg-primary/20 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-11/12 animate-pulse" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-10/12 animate-pulse" />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="h-9 sm:h-10 bg-gray-300 dark:bg-gray-700 rounded-lg w-64 mx-auto animate-pulse" />
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-80 mx-auto animate-pulse" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 h-12 bg-background border border-input rounded-sm animate-pulse relative">
              <div className="absolute left-4 top-3.5 h-5 w-5 bg-gray-400 dark:bg-gray-600 rounded animate-pulse" />
            </div>
            <div className="h-12 w-full sm:w-32 bg-primary/10 rounded-sm animate-pulse" />
          </div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto animate-pulse" />
        </div>
      </section>
    </main>
  );
}