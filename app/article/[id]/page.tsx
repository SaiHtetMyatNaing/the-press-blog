import { notFound } from "next/navigation";
import Link from "next/link";
import ArticleContent from "@/components/article-content";
import TableOfContents from "@/components/table-of-contents";
import SocialShare from "@/components/social-share";
import AuthorBio from "@/components/author-bio";
import RelatedPosts from "@/components/related-posts";
import Newsletter from "@/components/newsletter";
import { getPostById, getPostCountByAuthorId } from "@/server/dal/posts";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params since they're now a Promise in Next.js 15
  const { id } = await params;

  // Find the article directly on the server
  const article = await getPostById(id);
  const postCount = await getPostCountByAuthorId(article.authorId);
  // If article not found, trigger 404
  if (!article) {
    notFound();
  }

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "main-content", title: "Main Content" },
    { id: "conclusion", title: "Conclusion" },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Back to All Blogs Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to All Blogs
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-sm">
              {article.category.title}
            </span>
            <span className="text-sm text-muted-foreground">
              {article.readingTime} min read
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground">
            <span>
              By{" "}
              <strong className="text-foreground">{article.author.name}</strong>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>
              {new Date(article.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Featured Image - Only render if thumbnail exists */}
        {article.thumbnail && (
          <div className="mb-12 rounded-sm overflow-hidden">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <ArticleContent content={article.content} />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <TableOfContents sections={sections} />
              <SocialShare
                title="My Article Title"
                url={`https://localhost.com/article/${article.slug}`}
              />
            </div>
          </aside>
        </div>
      </article>

      {/* Author Bio */}
      <AuthorBio
        authorId={article.authorId}
        authorName={article.author.name || "unknown"}
        postCount={postCount}
      />

      {/* Related Posts */}
      <RelatedPosts currentId={article.id}  categoryId={article.categoryId}/>

      {/* Newsletter */}
      <Newsletter />
    </main>
  );
}
