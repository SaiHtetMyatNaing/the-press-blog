import Image from 'next/image';
import Link from 'next/link';
import { faker } from '@faker-js/faker';

export default function Hero() {
  const heroImage = faker.image.urlLoremFlickr({ category: 'blog,technology', width: 900, height: 1600 });

  return (
    <section className="bg-muted py-16 sm:py-24 lg:py-32 min-h-[600px] lg:min-h-[700px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Half: Text and Buttons */}
          <div className="max-w-3xl flex flex-col justify-center h-full px-4 lg:px-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
              Insights on Technology, Finance & Culture
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              Thoughtfully curated articles exploring the intersection of innovation, business, and modern life. Join
              thousands of readers discovering ideas that matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/blogs"
                className="inline-block bg-primary text-primary-foreground font-medium px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200 text-center"
              >
                Explore Blogs
              </Link>
              <Link
                href="/subscribe"
                className="inline-block bg-secondary text-secondary-foreground font-medium px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors duration-200 text-center"
              >
                Subscribe Now
              </Link>
            </div>
          </div>
          {/* Right Half: Image */}
          <div className="relative h-96 sm:h-[500px] lg:h-full hidden lg:block">
            <Image
              src={heroImage}
              alt="Blog hero image"
              fill
              className="object-cover rounded-lg shadow-lg"
              sizes="(max-width: 1024px) 0vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}