import {
  AnalysisActions,
  AnalysisContextProps,
  AnalysisContextTypes,
} from "./types";
import { SEARCH_COUNT } from "@/constants/search";
import { sortingStrings } from "@/constants";
import { PersonQuery } from "@/types/person/index.interface";

export const initAnalysisState: AnalysisContextProps = {
  users: [],
  loading: false,
  searchQuery: {
    f_name__like: "",
    l_name__like: "",
    email_address__like: "",
    location__like: "",
    order_by: [
      sortingStrings.search_state_status_asc,
      sortingStrings.f_name_asc,
    ],
    status: "",
    compatibility: "",
    is_favorite: "",
    is_attention: "",
  },
  pagination: { page: 0, size: SEARCH_COUNT, pages: 0, total: 0 },
  searchField: "f_name__like",
  searchValue: "",
};

const keys = ["f_name__like", "l_name__like", "email_address__like"];

export function AnalysisReducer(
  state: AnalysisContextProps,
  action: AnalysisActions,
): AnalysisContextProps {
  switch (action.type) {
    case AnalysisContextTypes.SET_USERS: {
      const { page, pages, size, total } = action.payload.data;
      let data = [...state.users];
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
        users: data,
        pagination: { page, pages, size, total },
      };
    }
    case AnalysisContextTypes.SET_LOADING: {
      return {
        ...state,
        loading: action.payload.data,
      };
    }
    case AnalysisContextTypes.SET_SEARCH_QUERY: {
      return {
        ...state,
        searchQuery: action.payload.data,
      };
    }
    case AnalysisContextTypes.SET_SEARCH_VALUE: {
      return {
        ...state,
        searchValue: action.payload.data,
      };
    }
    case AnalysisContextTypes.SET_SEARCH_FIELD: {
      const searchData = Object.entries(state.searchQuery);
      const newSearch = searchData.reduce((acc, [k, v]) => {
        if (k !== action.payload.data && keys.includes(k) && v) {
          return { ...acc, [action.payload.data]: v };
        }
        return { ...acc, [k]: v };
      }, {} as PersonQuery);
      return {
        ...state,
        searchField: action.payload.data,
        searchQuery: newSearch,
      };
    }

    default: {
      return state;
    }
  }
}
