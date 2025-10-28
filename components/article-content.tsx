export default function ArticleContent({ content }: { content: string }) {
  return <div className="article-content prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
}
