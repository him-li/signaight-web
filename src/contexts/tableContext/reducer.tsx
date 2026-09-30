import {
  TableActions,
  TableContextProps,
  TableContextTypes,
  TableItem,
} from "./types";

export const initTableState = {
  tableData: [],
  pagination: {
    page: 1,
    pages: 1,
    size: 10,
    total: 0,
  },
  selectedKeys: new Set([]),
  selectedAll: false,
  deselectedKeys: new Set([]),
};

export function TableReducer<T extends TableItem>(
  state: TableContextProps<T>,
  action: TableActions<T>,
): TableContextProps<T> {
  switch (action.type) {
    case TableContextTypes.SET_TABLE_DATA: {
      const { page, pages, size, total } = action.payload.data;
      let data = [...state.tableData];
      const startIndex = size * (page - 1);
      if (!action.payload.isAdd) {
        data = new Array(total).fill(undefined);
      }
      data.splice(
        startIndex,
        action.payload.data.items.length,
        ...action.payload.data.items,
      );

      return {
        ...state,
        tableData: data,
        pagination: { page, pages, size, total },
      };
    }
    case TableContextTypes.SET_SELECTED_KEYS: {
      const { data } = action.payload;
      return {
        ...state,
        selectedKeys: data,
      };
    }
    case TableContextTypes.SET_SELECTED_ALL: {
      const { data } = action.payload;
      return {
        ...state,
        selectedAll: data,
      };
    }
    case TableContextTypes.SET_DESELECTED_KEYS: {
      const { data } = action.payload;
      return {
        ...state,
        deselectedKeys: data,
      };
    }

    default: {
      return state;
    }
  }
}
