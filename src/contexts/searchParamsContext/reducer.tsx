import {
  SearchParamsActions,
  SearchParamsContextProps,
  SearchParamsContextTypes,
} from "./types";

export const initSearchParamsState: SearchParamsContextProps = {
  currentPage: 1,
  currentItem: undefined,
};

export function SearchParamsReducer(
  state: SearchParamsContextProps,
  action: SearchParamsActions,
): SearchParamsContextProps {
  switch (action.type) {
    case SearchParamsContextTypes.SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload.data,
      };
    }
    case SearchParamsContextTypes.SET_CURRENT_ITEM: {
      return {
        ...state,
        currentItem: action.payload.data,
      };
    }
    default: {
      return state;
    }
  }
}
