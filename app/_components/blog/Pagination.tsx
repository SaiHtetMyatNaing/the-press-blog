"use client"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "../ui/pagination";
import { useSearchParams } from "next/navigation";

export default async function BlogPagination(
  {pages } : { pages : number}
) {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  
  const pageNumber = params.get('page')
  const category   = params.get('category')

  // Function to build URL based on parameters
  const buildUrl = (page: number) => {
    const newParams = new URLSearchParams()
    
    // Always add page parameter
    newParams.set('page', page.toString())
    
    // Only add category if it exists
    if (category) {
      newParams.set('category', category)
    }
    
    return `?${newParams.toString()}`
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        {/* <PaginationItem>
          <PaginationPrevious href={"#"} />
        </PaginationItem> */}

        {/* Page Links
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ell-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink href={buildUrl(p)} isActive={p === current}>
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )} */}

        {/* Next */}
        {/* <PaginationItem>
          <PaginationNext href={"#"} />
        </PaginationItem> */}
      </PaginationContent>
    </Pagination>
  );
}