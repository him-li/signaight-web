/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Table, type SortDescriptor, Skeleton } from "@heroui/react";
import columns from "./fields";
import type { Project } from "@/types/project.interface";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import { useTableState } from "@/contexts/tableContext/TableContext";
import { SEARCH_QURIES } from "@/constants/search";
import ProjectTitleSkeleton from "../skeletons/ProjectTitleSkeleton";
import { table } from "styles/styles";
const Title = dynamic(() => import("./fields/title"), {
  ssr: false,
  loading: () => <ProjectTitleSkeleton />,
});
const Description = dynamic(() => import("./fields/description"), {
  ssr: false,
  loading: () => <Skeleton className="h-10 w-30 rounded-lg" />,
});
const User = dynamic(() => import("./fields/user"), {
  ssr: false,
  loading: () => <Skeleton className="h-10 w-20 rounded-lg" />,
});
const CreatedDate = dynamic(() => import("./fields/createdDate"), {
  ssr: false,
  loading: () => <Skeleton className="h-10 w-20 rounded-lg" />,
});
const Actions = dynamic(() => import("./fields/actions"), {
  ssr: false,
  loading: () => <Skeleton className="h-10 w-30 rounded-lg" />,
});
const ProjectsListPagination = dynamic(() => import("./pagination"), {
  ssr: false,
  loading: () => <div />,
});

export default function CampaignsTable() {
  const { tableData: projects } = useTableState<Project>();
  const { setQueries } = useSearchParamsActions();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams!);
  const sortingOrder = params.get(SEARCH_QURIES.ORDER_BY);
  const sortDescriptor: SortDescriptor = {
    column: sortingOrder?.slice(1) as any,
    direction: sortingOrder?.startsWith("-") ? "descending" : "ascending",
  };

  const handleSort = (descriptor: SortDescriptor) => {
    if (!descriptor.column) return;
    const newOrderBy =
      descriptor.direction === "descending"
        ? `-${descriptor.column}`
        : `+${descriptor.column}`;
    setQueries([
      {
        key: SEARCH_QURIES.ORDER_BY,
        value: newOrderBy,
      },
    ]);
  };

  return (
    <Table aria-label="Campaign Table" className={table.table}>
      <Table.ScrollContainer>
        <Table.Content
          sortDescriptor={sortDescriptor}
          onSortChange={handleSort}
        >
          <Table.Header columns={columns} className="sticky top-0">
            {(column) => (
              <Table.Column
                id={column.key}
                key={column.key}
                // align={column.align}
                allowsSorting={column.isSortable}
                isRowHeader={column.isRowHeader}
              >
                {column.label}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body
            items={projects.filter((projects) => projects)}
            renderEmptyState={() => "No campaigns to display."}
          >
            {(item) => (
              <Table.Row key={item?.id} id={item?.id}>
                <Table.Cell>
                  <Title project={item} />
                </Table.Cell>
                <Table.Cell>
                  <Description description={item?.description} />
                </Table.Cell>
                <Table.Cell>{item?.person_count}</Table.Cell>
                <Table.Cell>
                  <User email={item?.user_email} />
                </Table.Cell>
                <Table.Cell>
                  <CreatedDate date={item?.created_at} />
                </Table.Cell>
                <Table.Cell>
                  <Actions item={item} />
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer>
        <ProjectsListPagination />
      </Table.Footer>
    </Table>
  );
}
