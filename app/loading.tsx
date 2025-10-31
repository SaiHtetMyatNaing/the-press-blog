// app/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* ===== HERO SKELETON ===== */}
      <section className="bg-muted py-16 sm:py-24 lg:py-32 min-h-[600px] lg:min-h-[700px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-8 lg:gap-0">
            {/* Left: Text */}
            <div className="flex flex-col justify-center h-full space-y-6 px-4 lg:px-8">
              <div className="space-y-3">
                <div className="h-10 sm:h-12 lg:h-14 bg-gray-200 dark:bg-gray-700 rounded-lg w-11/12 animate-pulse" />
                <div className="h-10 sm:h-12 lg:h-14 bg-gray-200 dark:bg-gray-700 rounded-lg w-10/12 animate-pulse" />
                <div className="h-10 sm:h-12 lg:h-14 bg-gray-200 dark:bg-gray-700 rounded-lg w-8/12 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-11/12 animate-pulse" />
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-10/12 animate-pulse" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="h-12 w-36 bg-primary/10 rounded-lg animate-pulse" />
                <div className="h-12 w-36 bg-secondary/10 rounded-lg animate-pulse" />
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative hidden lg:block h-full">
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== POST GRID SKELETON ===== */}
      <section className="bg-background py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                {/* Image */}
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                {/* Title */}
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-11/12 animate-pulse" />
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-9/12 animate-pulse" />
                </div>
                {/* Excerpt */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12 animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10/12 animate-pulse" />
                </div>
                {/* Meta */}
                <div className="flex gap-2">
                  <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                  <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER SKELETON ===== */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="h-9 sm:h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mx-auto animate-pulse" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-80 mx-auto animate-pulse" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative h-12 bg-background border border-input rounded-sm animate-pulse">
              <div className="absolute left-4 top-3.5 h-5 w-5 bg-gray-400 dark:bg-gray-600 rounded animate-pulse" />
            </div>
            <div className="h-12 w-full sm:w-32 bg-primary/10 rounded-sm animate-pulse" />
          </div>

          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto animate-pulse" />
        </div>
      </section>
    </div>
  );
}