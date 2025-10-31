export function PostCardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-11/12 animate-pulse" />
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-10/12 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
      </div>
      <div className="flex gap-2">
        <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
        <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
      </div>
    </div>
  );
}