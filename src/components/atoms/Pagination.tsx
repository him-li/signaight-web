import {
  Pagination as NextPagination,
  Button,
  Dropdown,
  Label,
} from "@heroui/react";
import { modal } from "styles/styles";
interface PaginationProps {
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  hideInput?: boolean;
}

export default function Pagination({
  total,
  pageSize,
  currentPage,
  onPageChange,
  hideInput = false,
}: PaginationProps) {
  const pagesCount = Math.ceil(total / pageSize);
  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div className="flex w-full justify-center items-center">
      {pagesCount > 1 && (
        <NextPagination>
          <NextPagination.Content className="mx-auto border bg-default-hover rounded-2xl">
            <NextPagination.Item>
              <NextPagination.Previous
                isDisabled={currentPage === 1}
                onPress={() => onPageChange(Math.max(1, currentPage - 1))}
              >
                <NextPagination.PreviousIcon />
              </NextPagination.Previous>
            </NextPagination.Item>
            <NextPagination.Item>
              <NextPagination.Link
                isActive={currentPage === 1}
                onPress={() => onPageChange(1)}
              >
                1
              </NextPagination.Link>
            </NextPagination.Item>
            {currentPage > 3 && (
              <NextPagination.Item>
                <NextPagination.Ellipsis />
              </NextPagination.Item>
            )}
            {[currentPage - 1, currentPage, currentPage + 1]
              .filter((p) => p > 1 && p < pagesCount)
              .map((p) => (
                <NextPagination.Item key={p}>
                  <NextPagination.Link
                    isActive={currentPage === p}
                    onPress={() => onPageChange(p)}
                    className="data-active:bg-accent data-active:text-background"
                  >
                    {p}
                  </NextPagination.Link>
                </NextPagination.Item>
              ))}
            {currentPage < pagesCount - 2 && (
              <NextPagination.Item>
                <NextPagination.Ellipsis />
              </NextPagination.Item>
            )}
            <NextPagination.Item>
              <NextPagination.Link
                isActive={currentPage === pagesCount}
                onPress={() => onPageChange(pagesCount)}
              >
                {pagesCount}
              </NextPagination.Link>
            </NextPagination.Item>
            <NextPagination.Item>
              <NextPagination.Next
                isDisabled={currentPage === pagesCount}
                onPress={() =>
                  onPageChange(Math.min(pagesCount, currentPage + 1))
                }
              >
                <NextPagination.NextIcon />
              </NextPagination.Next>
            </NextPagination.Item>
          </NextPagination.Content>
        </NextPagination>
      )}
      <Dropdown className={hideInput || pagesCount < 1 ? "hidden" : ""}>
        <Button variant="tertiary">
          Go To Page{" " + (currentPage === 0 ? 1 : currentPage)}
        </Button>
        <Dropdown.Popover className={modal.base} placement="top">
          <Dropdown.Menu selectionMode="single">
            {pages.map((page) => (
              <Dropdown.Item
                id={page}
                key={page}
                textValue={page.toString()}
                onPress={() => onPageChange(page)}
              >
                <Dropdown.ItemIndicator />
                <Label>{page}</Label>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  );
}
