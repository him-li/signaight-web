"use client";
import Pagination from "@/components/atoms/Pagination";
import {
  useSearchParamsActions,
  useSearchParamsState,
} from "@/contexts/searchParamsContext/SearchParamsContext";
import { usePersonState } from "@/contexts/personContext/PersonContext";

export default function SubjectListPagination() {
  const { moveToPage } = useSearchParamsActions();
  const { currentPage } = useSearchParamsState();
  const { pagination, persons } = usePersonState();
  const { size: pageSize } = pagination;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPageChange = (page: any) => {
    moveToPage(page);
  };

  return (
    <Pagination
      total={persons.length}
      currentPage={currentPage}
      pageSize={pageSize}
      onPageChange={onPageChange}
    />
  );
}
