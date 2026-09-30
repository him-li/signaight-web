import { ActionMap } from "../types";
import { IPagination } from "@/types/tables.interface";

export type TableContextProps<T> = {
  tableData: T[];
  pagination: IPagination;
  selectedKeys: "all" | Set<string | number>;
  selectedAll: boolean;
  deselectedKeys: Set<string | number>;
};

export enum TableContextTypes {
  SET_TABLE_DATA = "SET_TABLE_DATA",
  SET_SELECTED_KEYS = "SET_SELECTED_KEYS",
  SET_SELECTED_ALL = "SET_SELECTED_ALL",
  SET_DESELECTED_KEYS = "SET_DESELECTED_KEYS",
}

export type TableContextPayload<T extends TableItem> = {
  [TableContextTypes.SET_TABLE_DATA]: {
    data: ITableData<T>;
    isAdd: boolean;
  };
  [TableContextTypes.SET_SELECTED_KEYS]: {
    data: "all" | Set<string | number>;
  };
  [TableContextTypes.SET_SELECTED_ALL]: {
    data: boolean;
  };
  [TableContextTypes.SET_DESELECTED_KEYS]: {
    data: Set<string | number>;
  };
};

export type TableActions<T extends TableItem> = ActionMap<
  TableContextPayload<T>
>[keyof ActionMap<TableContextPayload<T>>];

export type TableItem = { id?: string };

export type ITableData<T extends TableItem> = {
  items: T[];
} & IPagination;
