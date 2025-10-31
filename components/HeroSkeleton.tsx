export function HeroSkeleton() {
  return (
    <section className="bg-muted py-16 sm:py-24 lg:py-32 min-h-[600px] lg:min-h-[700px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-8">
          <div className="flex flex-col justify-center h-full space-y-6 px-4 lg:px-8">
            <div className="space-y-3">
              <div className="h-10 sm:h-12 lg:h-14 bg-gray-300 dark:bg-gray-700 rounded-md w-11/12 animate-pulse" />
              <div className="h-10 sm:h-12 lg:h-14 bg-gray-300 dark:bg-gray-700 rounded-md w-10/12 animate-pulse" />
              <div className="h-10 sm:h-12 lg:h-14 bg-gray-300 dark:bg-gray-700 rounded-md w-8/12 animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse" />
              <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse" />
              <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-11/12 animate-pulse" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="h-12 w-36 bg-primary/20 rounded-lg animate-pulse" />
              <div className="h-12 w-36 bg-secondary/20 rounded-lg animate-pulse" />
            </div>
          </div>
          <div className="hidden lg:block relative h-full">
            <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}