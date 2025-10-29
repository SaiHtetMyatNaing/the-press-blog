export function PostGridSkeleton() {
  return (
    <section className="bg-background mb-14 ">
      <div className="max-w-7xl mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="w-full h-48 bg-muted rounded animate-pulse" />
              <div className="h-4 w-20 bg-muted rounded animate-pulse" />
              <div className="h-6 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}