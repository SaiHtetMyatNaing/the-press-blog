export default function CategoryFilterSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-20 h-8 rounded-sm bg-gray-300 animate-pulse"
        />
      ))}
    </div>
  );}