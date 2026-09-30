"use client";
import dynamic from "next/dynamic";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Checkbox, Skeleton, Table, type SortDescriptor } from "@heroui/react";
import type { Person } from "@/types/person/index.interface";
import SignAIghtScore from "@/components/atoms/CommonFields/person/score";
import Profile from "@/components/atoms/CommonFields/person/profile";
import TableToolbar from "@/components/blocks/TableToolbar";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import {
  useTableActions,
  useTableState,
} from "@/contexts/tableContext/TableContext";
import { SEARCH_QURIES } from "@/constants/search";
import { useAppDispatch } from "@/store/store";
import { setIsAllSelected } from "@/store/subjectsSlice";
import Columns from "./fields";
import { table } from "styles/styles";
const Ranking = dynamic(() => import("./fields/ranking"), {
  loading: () => <Skeleton className="h-10" />,
  ssr: false,
});
const CompatibilityMenu = dynamic(
  () => import("@/components/atoms/CompatibilityMenu"),
  {
    loading: () => <Skeleton className="h-10" />,
    ssr: false,
  },
);
const Actions = dynamic(() => import("./fields/actions"), {
  loading: () => <div />,
  ssr: false,
});
const Alerts = dynamic(() => import("./fields/alerts"), {
  ssr: false,
  loading: () => <div />,
});
const SubjectListPagination = dynamic(() => import("./pagination"), {
  loading: () => <div />,
  ssr: false,
});
const NoPersonFallback = dynamic(
  () => import("@/components/atoms/NoPersonFallback"),
  {
    loading: () => <div />,
    ssr: false,
  },
);

export default function LeaderboardTable() {
  const {
    tableData: persons,
    selectedKeys,
    selectedAll,
    deselectedKeys,
    pagination,
  } = useTableState<Person>();
  const { setSelectedKeys } = useTableActions();
  const { setQueries } = useSearchParamsActions();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams!);
  const sortingOrder = params.get(SEARCH_QURIES.ORDER_BY);
  const sortDescriptor: SortDescriptor = {
    column: (Array.isArray(sortingOrder)
      ? sortingOrder[0]
      : sortingOrder
    )?.slice(1),
    direction: (Array.isArray(sortingOrder)
      ? sortingOrder[0]
      : sortingOrder
    )?.startsWith("-")
      ? "descending"
      : "ascending",
  };

  const handleSelect = useCallback(
    (keys: "all" | Set<string | number>) => {
      setSelectedKeys(keys, false);
      dispatch(setIsAllSelected(keys === "all"));
    },
    [dispatch, setSelectedKeys],
  );

  const handleSort = useCallback(
    (descriptor: SortDescriptor) => {
      if (!descriptor.column) return;
      const newOrderBy =
        descriptor.direction === "descending"
          ? `-${descriptor.column}`
          : `+${descriptor.column}`;
      setQueries([
        { key: SEARCH_QURIES.PAGE, value: "1" },
        { key: SEARCH_QURIES.ORDER_BY, value: newOrderBy },
      ]);
    },
    [setQueries],
  );

  const justPersons = useMemo(() => persons.filter((it) => it), [persons]);

  return (
    <Table aria-label="Campaign Leaderboard Table">
      <TableToolbar />
      <Table.ScrollContainer>
        <Table.Content
          selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          onSortChange={handleSort}
          selectedKeys={selectedKeys as Iterable<string>}
          onSelectionChange={handleSelect}
          className={table.table}
        >
          <Table.Header columns={Columns()} className="sticky top-0">
            {(column) => (
              <Table.Column
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
            items={justPersons.filter((person) => person)}
            renderEmptyState={() => (
              <NoPersonFallback personNaming="applicant" />
            )}
          >
            {(item) => (
              <Table.Row key={item?.id} id={item?.id}>
                <Table.Cell>
                  <Checkbox
                    aria-label={`Select ${item?.personal_details.name?.full_name?.full_name ?? item?.id}`}
                    slot="selection"
                  >
                    <Checkbox.Control className="rounded-full">
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                  </Checkbox>
                </Table.Cell>
                <Table.Cell>
                  <Ranking personId={item.id!} />
                </Table.Cell>
                <Table.Cell>
                  <Profile person={item} hideEmail hideLocation />
                </Table.Cell>
                <Table.Cell>
                  <SignAIghtScore
                    score={item?.signaight_score ?? 0}
                    showLabel={false}
                    platform="signaight"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Alerts count={item.alerts_count!} showLabel={false} />
                </Table.Cell>
                <Table.Cell>
                  <CompatibilityMenu subject={item} isResponsive={false} />
                </Table.Cell>
                <Table.Cell
                // align="right"
                >
                  <Actions person={item} />
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer className="py-2 px-2 grid grid-cols-12 gap-4 items-center">
        <span className="text-sm text-default-400 col-span-2">
          {`${selectedKeys === "all" || selectedAll ? persons.length - deselectedKeys.size : selectedKeys.size} of ${pagination.total} selected`}
        </span>
        <div className="col-span-8">
          <SubjectListPagination />
        </div>
      </Table.Footer>
    </Table>
  );
}
