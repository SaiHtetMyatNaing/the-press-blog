import Categories from "@/components/blog/Categories";
import Posts from "@/components/blog/Posts";


export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const categorySlug = params?.category;
  const search = params?.search;
  const page = params?.page ? parseInt(params.page, 10) : 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-20">
      <header className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
          Latest Articles
        </h1>
        <div className="w-16 h-1 bg-primary rounded-full" />
      </header>
      <Categories selectedCategory={categorySlug} />
      <Posts
        categorySlug={categorySlug}
        page={page}
        limit={12}
        search={search}
      />
    </div>
  );
}
