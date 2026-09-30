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
  const {
    persons,
    pagination: { size },
  } = usePersonState();
  const subjectListTotal = persons?.length || 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPageChange = (page: any) => {
    moveToPage(page);
  };

  if (!subjectListTotal) {
    return null;
  }

  return (
    <Pagination
      total={subjectListTotal}
      currentPage={currentPage}
      pageSize={size}
      onPageChange={onPageChange}
    />
  );
}
