// app/404.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="bg-muted min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-serif font-bold text-foreground mb-6">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved. Explore our blog to find the latest insights
          on technology, finance, and culture.
        </p>
        <Link
          href="/blogs"
          className="inline-block bg-primary text-primary-foreground font-medium px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200 text-center"
        >
          Back to Blogs
        </Link>
      </div>
    </section>
  );
}