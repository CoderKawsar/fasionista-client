import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export const CustomPagination = ({ pageNo, limit, total, route }) => {
  const router = useRouter();

  const options = [5, 10, 20, 50];
  const currentPage = pageNo;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex items-center justify-between mt-16">
      <Pagination>
        <PaginationContent>
          {currentPage !== 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`/${route}?pageNo=${currentPage - 1}&limit=${limit}`}
              />
            </PaginationItem>
          )}
          {currentPage >= 3 && (
            <PaginationItem>
              <PaginationLink href={`/${route}?pageNo=${1}&limit=${limit}`}>
                1
              </PaginationLink>
            </PaginationItem>
          )}
          {currentPage >= 4 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink
                href={`/${route}?pageNo=${currentPage - 1}&limit=${limit}`}
              >
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink
              href={`/${route}?pageNo=${currentPage}&limit=${limit}`}
              isActive
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          {currentPage + 1 <= totalPages && (
            <PaginationItem>
              <PaginationLink
                href={
                  currentPage + 1 <= totalPages
                    ? `/${route}?pageNo=${currentPage + 1}&limit=${limit}`
                    : "#"
                }
              >
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {currentPage + 2 <= totalPages && (
            <PaginationItem>
              <PaginationLink
                href={
                  currentPage + 2 <= totalPages
                    ? `/${route}?pageNo=${currentPage + 2}&limit=${limit}`
                    : "#"
                }
              >
                {currentPage + 2}
              </PaginationLink>
            </PaginationItem>
          )}
          {currentPage + 3 < totalPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {currentPage + 2 < totalPages && (
            <PaginationItem>
              <PaginationLink
                href={`/${route}?pageNo=${totalPages}&limit=${limit}`}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          {currentPage !== totalPages && (
            <PaginationItem>
              <PaginationNext
                href={`/${route}?pageNo=${currentPage + 1}&limit=${limit}`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
      <Select
        defaultValue={limit}
        onValueChange={(value) => {
          router.push(`/${route}?pageNo=1&limit=${value}`);
        }}
      >
        <SelectTrigger className="w-[140px] rounded">
          <SelectValue placeholder="Items Per Page" />
        </SelectTrigger>
        <SelectContent className="bg-[#ffffff]">
          <SelectGroup>
            <SelectLabel>Items Per Page</SelectLabel>
            {options.map((option) => (
              <SelectItem
                className="hover:!bg-black hover:!text-white data-[state=checked]:bg-black data-[state=checked]:text-white data-[state=checked]:font-bold"
                key={option}
                value={option}
              >
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
