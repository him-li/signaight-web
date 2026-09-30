import { PersonActions, PersonContextProps, PersonContextTypes } from "./types";
import { SEARCH_PERSONS_COUNT, searchPersonsQuery } from "@/constants/search";

export const initPersonState: PersonContextProps = {
  persons: [],
  loading: true,
  pagination: { page: 1, size: SEARCH_PERSONS_COUNT, pages: 0, total: 0 },
  searchQuery: searchPersonsQuery,
};

export function PersonReducer(
  state: PersonContextProps,
  action: PersonActions,
): PersonContextProps {
  switch (action.type) {
    case PersonContextTypes.SET_PERSONS: {
      const { page, pages, size, total } = action.payload.data;
      let data = [...state.persons];
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
        persons: data,
        pagination: { page: state.pagination.page, pages, size, total },
      };
    }
    case PersonContextTypes.UPDATE_PERSONS: {
      const person = action.payload.data;
      const newListOfPersons = state.persons.map((p) =>
        p?.id === person?.id ? person : p,
      );

      return {
        ...state,
        persons: newListOfPersons,
      };
    }
    case PersonContextTypes.SET_PAGE_NUMBER: {
      const page = action.payload.data;

      return {
        ...state,
        pagination: { ...state.pagination, page: +page },
      };
    }
    case PersonContextTypes.SET_SEARCH_QUERY: {
      const searchQuery = action.payload.data;

      return {
        ...state,
        searchQuery,
      };
    }
    case PersonContextTypes.SET_LOADING: {
      return {
        ...state,
        loading: action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
}
