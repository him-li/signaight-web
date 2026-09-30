"use client";
import { useCallback } from "react";
import { useAppDispatch } from "@/store/store";
import dynamic from "next/dynamic";
import { Table, Checkbox } from "@heroui/react";
import { setIsAllSelected } from "@/store/subjectsSlice";
import type { Person } from "@/types/person/index.interface";
import Columns from "./fields";
import Profile from "@/components/atoms/CommonFields/person/profile";
import LastUpdate from "@/components/atoms/CommonFields/person/lastUpdate";
import SearchStatus from "@/components/atoms/CommonFields/person/status";
import TableToolbar from "@/components/blocks/TableToolbar";
import {
  useTableActions,
  useTableState,
} from "@/contexts/tableContext/TableContext";
import SocialConnectionsFiveListSkeleton from "../../skeletons/SocialConnectionsFiveListSkeleton";
import { table } from "styles/styles";
import SubjectListPagination from "./pagination";
const TableBottom = dynamic(() => import("../../TableBottom"), {
  loading: () => null,
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
const Actions = dynamic(() => import("./fields/actions"), {
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

export default function SubjectTable() {
  const dispatch = useAppDispatch();
  const { tableData: persons, selectedKeys } = useTableState<Person>();
  const { setSelectedKeys } = useTableActions();

  const handleSelect = useCallback(
    (keys: "all" | Set<string | number>) => {
      setSelectedKeys(keys, false);
      dispatch(setIsAllSelected(keys === "all"));
    },
    [dispatch, setSelectedKeys],
  );

  return (
    <Table aria-label="Subject Table" className={table.table}>
      <TableToolbar />
      <Table.ScrollContainer>
        <Table.Content
          selectionMode="multiple"
          selectedKeys={selectedKeys as Iterable<string>}
          onSelectionChange={handleSelect}
        >
          <Table.Header columns={Columns()} className="sticky top-0">
            {(column) => (
              <Table.Column
                key={column.key}
                //  align={column.align}
                isRowHeader={column.isRowHeader}
              >
                {column.label}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body
            items={persons.filter((person) => person)}
            renderEmptyState={() => <NoPersonFallback personNaming="subject" />}
          >
            {(item) => (
              <Table.Row key={item?.id} id={item?.id}>
                <Table.Cell className="pr-0">
                  <Checkbox aria-label={`Select ${item?.id}`} slot="selection">
                    <Checkbox.Control className="rounded-full">
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                  </Checkbox>
                </Table.Cell>
                <Table.Cell>
                  <Profile person={item} />
                </Table.Cell>
                <Table.Cell
                // align="left"
                >
                  <LastUpdate lastupdate={item?.last_update} />
                </Table.Cell>
                <Table.Cell>
                  <SearchStatus searchState={item?.search_state} />
                </Table.Cell>
                <Table.Cell>
                  <SocialConnections person={item}>
                    <SocialLinks person={item} />
                  </SocialConnections>
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
      <Table.Footer>
        <TableBottom>
          <SubjectListPagination />
        </TableBottom>
      </Table.Footer>
    </Table>
  );
}
