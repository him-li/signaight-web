"use client";
import { useCallback } from "react";
import { useAppDispatch } from "@/store/store";
import dynamic from "next/dynamic";
import { Checkbox, Table } from "@heroui/react";
import { setIsAllSelected } from "@/store/subjectsSlice";
import type { Person } from "@/types/person/index.interface";
import Columns from "./fields";
import SignAIghtScore from "@/components/atoms/CommonFields/person/score";
import Profile from "@/components/atoms/CommonFields/person/profile";
import LastUpdate from "@/components/atoms/CommonFields/person/lastUpdate";
import TableToolbar from "@/components/blocks/TableToolbar";
import TableBottom from "@/components/blocks/TableBottom";
import {
  useTableActions,
  useTableState,
} from "@/contexts/tableContext/TableContext";
import { table } from "styles/styles";
const Pagination = dynamic(() => import("./pagination"), {
  ssr: false,
  loading: () => <div />,
});
const View = dynamic(() => import("./fields/view"), {
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
  const {
    tableData: persons,
    selectedKeys,
    deselectedKeys,
    selectedAll,
  } = useTableState<Person>();
  const { setSelectedKeys } = useTableActions();
  const dispatch = useAppDispatch();

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
                // align={column.align}
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
                <Table.Cell>
                  <Checkbox aria-label={`Select ${item?.id}`} slot="selection">
                    <Checkbox.Control className="rounded-full">
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                  </Checkbox>
                </Table.Cell>
                <Table.Cell>
                  <Profile person={item} />
                </Table.Cell>
                <Table.Cell>
                  <SignAIghtScore
                    score={item?.risk_score}
                    showLabel={false}
                    isSignAIght={true}
                    platform="signaight"
                  />
                </Table.Cell>
                <Table.Cell>{item?.red_flags_count}</Table.Cell>
                <Table.Cell
                // align="left"
                >
                  <LastUpdate lastupdate={item?.last_update} />
                </Table.Cell>
                <Table.Cell
                // align="right"
                >
                  <View person={item} />
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer>
        <TableBottom>
          <Pagination />
        </TableBottom>
      </Table.Footer>
    </Table>
  );
}
