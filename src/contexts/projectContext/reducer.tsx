import {
  ProjectActions,
  ProjectContextProps,
  ProjectContextTypes,
} from "./types";
import { SEARCH_COUNT, searchProjectsQuery } from "@/constants/search";

export const initProjectState: ProjectContextProps = {
  projects: [],
  loading: true,
  pagination: { page: 0, size: SEARCH_COUNT, pages: 0, total: 0 },
  searchQuery: searchProjectsQuery,
};

export function ProjectReducer(
  state: ProjectContextProps,
  action: ProjectActions,
): ProjectContextProps {
  switch (action.type) {
    case ProjectContextTypes.SET_PROJECTS: {
      const { page, pages, size, total } = action.payload.data;
      let data = [...state.projects];
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
        projects: data,
        pagination: { page, pages, size, total },
      };
    }
    case ProjectContextTypes.SET_LOADING: {
      return {
        ...state,
        loading: action.payload.data,
      };
    }
    case ProjectContextTypes.SET_SEARCH_QUERY: {
      return {
        ...state,
        searchQuery: action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
}
