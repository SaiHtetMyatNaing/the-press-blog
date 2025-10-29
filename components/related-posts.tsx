import { getRelatedPosts } from "@/server/dal/posts";
import PostCard from "./blog/blog-card";


export default async function RelatedPosts({ currentId  ,categoryId}: { currentId: string , categoryId : string}) {
  const related = await getRelatedPosts(currentId , categoryId);

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-2">Related Articles</h2>
          <div className="w-12 h-1 bg-primary rounded-full"></div>
        </div>

        {related.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {related && related.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No related articles available yet.</p>
        )}
      </div>
    </section>
  )
}
