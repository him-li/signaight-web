/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useSearchParams } from "next/navigation";
import { TableReducer, initTableState } from "./reducer";
import { TableContextProps, TableContextTypes, TableItem } from "./types";
import { IPagination } from "@/types/tables.interface";
import { SEARCH_QURIES } from "@/constants/search";

const actionsList = {
  setSelectedKeys: (
    selectedKeys: "all" | Set<string | number>,
    isAdd: boolean,
  ) => {},
};

const TableStateContext = React.createContext<TableContextProps<TableItem>>(
  initTableState as TableContextProps<TableItem>,
);

const TableActionsContext = React.createContext(actionsList);

type TableProviderProps<T extends TableItem> = {
  data: T[];
  pagination: IPagination;
};

function TableProvider<T extends TableItem>({
  children,
  data,
  pagination,
}: PropsWithChildren<TableProviderProps<T>>) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams!);
  const [state, dispatch] = React.useReducer(TableReducer<T>, initTableState);

  const item = params.get(SEARCH_QURIES.ITEM);

  useEffect(() => {
    setSelectedKeys(new Set([]), false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    dispatch({
      type: TableContextTypes.SET_TABLE_DATA,
      payload: {
        data: {
          items: data,
          ...pagination,
        },
        isAdd: false,
      },
    });
  }, [data, pagination]);

  const setSelectedKeys = useCallback(
    (data: "all" | Set<string | number>, isAdd: boolean) => {
      const deselectedBefore = state.tableData
        .filter((it) => it)
        .filter((it) => !state.deselectedKeys.has(it.id!));
      if (
        data !== "all" &&
        data.size === 0 &&
        deselectedBefore.length !== 1 &&
        !isAdd
      ) {
        dispatch({
          type: TableContextTypes.SET_SELECTED_ALL,
          payload: {
            data: false,
          },
        });
        dispatch({
          type: TableContextTypes.SET_DESELECTED_KEYS,
          payload: {
            data: new Set([]),
          },
        });
        dispatch({
          type: TableContextTypes.SET_SELECTED_KEYS,
          payload: {
            data: new Set([]),
          },
        });
        return;
      }
      if (data === "all") {
        dispatch({
          type: TableContextTypes.SET_SELECTED_ALL,
          payload: {
            data: true,
          },
        });
        dispatch({
          type: TableContextTypes.SET_DESELECTED_KEYS,
          payload: {
            data: new Set([]),
          },
        });
        dispatch({
          type: TableContextTypes.SET_SELECTED_KEYS,
          payload: {
            data: "all",
          },
        });
      } else {
        if (state.selectedAll) {
          const deselected = state.deselectedKeys;
          const deleted = state.tableData.filter(
            (it) => it && !data.has(it.id!),
          );
          dispatch({
            type: TableContextTypes.SET_SELECTED_KEYS,
            payload: {
              data,
            },
          });
          deleted.forEach((it) => deselected.add(it.id!));
          dispatch({
            type: TableContextTypes.SET_DESELECTED_KEYS,
            payload: {
              data: deselected,
            },
          });
        } else {
          dispatch({
            type: TableContextTypes.SET_SELECTED_KEYS,
            payload: {
              data,
            },
          });
        }
      }
    },
    [state.deselectedKeys, state.selectedAll, state.tableData],
  );

  useEffect(() => {
    if (state.selectedAll) {
      const selectedIds = new Set() as Set<string | number>;
      const newIds = state.tableData
        .filter((it) => it && !state.deselectedKeys.has(it.id!))
        .map((item, i) => item.id as string);
      newIds.forEach((id) => selectedIds.add(id));
      setSelectedKeys(selectedIds, true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.tableData]);

  const value = useMemo(() => state, [state]);

  const actions = useMemo(() => ({ setSelectedKeys }), [setSelectedKeys]);

  return (
    <TableActionsContext.Provider value={actions}>
      <TableStateContext.Provider value={value}>
        {children}
      </TableStateContext.Provider>
    </TableActionsContext.Provider>
  );
}

function useTableState<T extends TableItem>() {
  const context = React.useContext<TableContextProps<T>>(
    TableStateContext as unknown as React.Context<TableContextProps<T>>,
  );
  if (context === undefined) {
    throw new Error("useTableState must be used within a TableProvider");
  }
  return context;
}
function useTableActions() {
  const context = React.useContext(TableActionsContext);
  if (context === undefined) {
    throw new Error("useTableActions must be used within a TableProvider");
  }
  return context;
}

export default TableProvider;

export { useTableState, useTableActions };
