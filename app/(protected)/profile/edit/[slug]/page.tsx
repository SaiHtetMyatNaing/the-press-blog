import PostEditForm from "@/app/_components/postEditForm";
import { getAllCategories } from "@/server/dal/categories";
import { getPostBySlug } from "@/server/dal/posts";
import { notFound } from "next/navigation";

export default async function Page({ 
  params 
}: { 
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const categories = await getAllCategories();

  if (!post) {
    notFound();
  }
  

  return <PostEditForm post={post} categories={categories} postId={post.id} />;
}