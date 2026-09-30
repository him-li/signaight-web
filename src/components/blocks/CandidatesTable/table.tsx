/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import dynamic from "next/dynamic";
import { useCallback } from "react";
import {
  Avatar,
  Checkbox,
  Table,
  type SortDescriptor,
  Skeleton,
  AvatarFallback,
} from "@heroui/react";
import { useAppDispatch } from "@/store/store";
import {
  changeEvaluationDashPage,
  setIsAllSelected,
} from "@/store/subjectsSlice";
import type { Person } from "@/types/person/index.interface";
import Columns from "./fields";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import { useSearchParams } from "next/navigation";
import {
  useTableActions,
  useTableState,
} from "@/contexts/tableContext/TableContext";
import { SEARCH_QURIES } from "@/constants/search";
import SocialConnectionsFiveListSkeleton from "../skeletons/SocialConnectionsFiveListSkeleton";
import { getPersonName } from "@/utils/getPersonName";
import { getPersonAvatar } from "@/utils/getPersonAvatar";
import { table } from "styles/styles";
import { Icons } from "@/components/atoms/Icons";
import TableToolbar from "@/components/blocks/TableToolbar";
import TableBottom from "@/components/blocks/TableBottom";
const Status = dynamic(
  () => import("@/components/atoms/CommonFields/person/status"),
  {
    loading: () => <div />,
    ssr: false,
  },
);
const Email = dynamic(
  () => import("@/components/atoms/CommonFields/person/email"),
  {
    loading: () => <Skeleton className="rounded-lg h-8 w-55" />,
    ssr: false,
  },
);
const SignAIghtScore = dynamic(
  () => import("@/components/atoms/CommonFields/person/score"),
  {
    loading: () => <Skeleton className="rounded-lg h-4 w-4" />,
    ssr: false,
  },
);
const Actions = dynamic(() => import("./fields/actions"), {
  loading: () => <Skeleton className="rounded-lg h-10 w-16" />,
  ssr: false,
});
const SocialConnections = dynamic(
  () => import("@/components/atoms/SocialConnections"),
  {
    loading: () => <SocialConnectionsFiveListSkeleton />,
    ssr: false,
  },
);
const SocialLinks = dynamic(() => import("@/components/atoms/SocialLinks"), {
  loading: () => <SocialConnectionsFiveListSkeleton />,
  ssr: false,
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

export default function ApplicantsTable() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams!);
  const {
    tableData: persons,
    selectedKeys,
    deselectedKeys,
    selectedAll,
  } = useTableState<Person>();
  const { setSelectedKeys } = useTableActions();
  const dispatch = useAppDispatch();
  const { setQueries } = useSearchParamsActions();
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
      dispatch(changeEvaluationDashPage("PERSONAL DATA"));
    },
    [dispatch, setQueries],
  );

  return (
    <Table aria-label="Campaign Table" className={table.table}>
      <TableToolbar />
      <Table.ScrollContainer>
        <Table.Content
          selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          onSortChange={handleSort}
          selectedKeys={selectedKeys as Iterable<string>}
          onSelectionChange={handleSelect}
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
            items={persons.filter((person) => person)}
            renderEmptyState={() => (
              <NoPersonFallback personNaming="applicant" />
            )}
          >
            {(item) => {
              const avatar = getPersonAvatar(
                item?.personal_details?.visuals?.profile_photo,
              );
              return (
                <Table.Row key={item?.id} id={item?.id}>
                  <Table.Cell className="flex flex-row h-full items-center-safe space-x-2">
                    <Checkbox
                      aria-label={`Select ${item?.id}`}
                      slot="selection"
                    >
                      <Checkbox.Control className="rounded-full">
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                    </Checkbox>
                    <Avatar>
                      <Avatar.Image src={avatar} />
                      <AvatarFallback>
                        <Icons.Person />
                      </AvatarFallback>
                    </Avatar>
                  </Table.Cell>
                  <Table.Cell>
                    {getPersonName(item?.personal_details?.name, "f_name")}
                  </Table.Cell>
                  <Table.Cell>
                    {getPersonName(item?.personal_details?.name, "l_name")}
                  </Table.Cell>
                  <Table.Cell>
                    <Email email={item?.personal_details?.email} />
                  </Table.Cell>
                  <Table.Cell>
                    <SignAIghtScore
                      score={item?.signaight_score ?? 0}
                      showLabel={false}
                      platform="signaight"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <SocialConnections person={item}>
                      <SocialLinks person={item} />
                    </SocialConnections>
                  </Table.Cell>
                  <Table.Cell>
                    {item?.recruiting_source === "internet"
                      ? "Internet"
                      : "Application"}
                  </Table.Cell>
                  <Table.Cell>
                    <Status searchState={item?.search_state} />
                  </Table.Cell>
                  <Table.Cell>
                    <Actions person={item} />
                  </Table.Cell>
                </Table.Row>
              );
            }}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer>
        <TableBottom>
          <SubjectListPagination />
        </TableBottom>
      </Table.Footer>
    </Table>
  );
}
