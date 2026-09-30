"use client";
import Pagination from "@/components/atoms/Pagination";
import {
  useSearchParamsActions,
  useSearchParamsState,
} from "@/contexts/searchParamsContext/SearchParamsContext";
import { useProjectState } from "@/contexts/projectContext/ProjectContext";

export default function ProjectsListPagination() {
  const {
    projects,
    pagination: { size },
  } = useProjectState();
  const projectsListTotal = projects.length;
  const { currentPage } = useSearchParamsState();
  const { moveToPage } = useSearchParamsActions();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPageChange = (page: any) => {
    moveToPage(page);
  };

  return (
    <Pagination
      total={projectsListTotal}
      currentPage={currentPage}
      pageSize={size}
      onPageChange={onPageChange}
    />
  );
}
