import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { getPostCount } from "@/server/dal/posts";

const POSTS_PER_PAGE = 12;

interface BlogPaginationProps {
  searchParams?: Promise<{ page?: string }>;
}

export default async function BlogPagination({ searchParams }: BlogPaginationProps) {
  const params = await searchParams
  const currentPage = await Number(params?.page) || 1;
  const totalPosts = await getPostCount();
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  
  // Don't render pagination if only 1 page or no posts
  if (totalPages <= 1) return null;

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            href={hasPrevious ? `?page=${currentPage - 1}` : "#"}
            aria-disabled={!hasPrevious}
            className={!hasPrevious ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink 
              href={`?page=${page}`}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <PaginationNext 
            href={hasNext ? `?page=${currentPage + 1}` : "#"}
            aria-disabled={!hasNext}
            className={!hasNext ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}