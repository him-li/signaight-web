import {
  PersonsSearchActions,
  PersonsSearchContextProps,
  PersonsSearchContextTypes,
} from "./types";

export const initPersonsSearchState: PersonsSearchContextProps = {
  searchExisting: true,
};

export function PersonsSearchReducer(
  state: PersonsSearchContextProps,
  action: PersonsSearchActions,
): PersonsSearchContextProps {
  switch (action.type) {
    case PersonsSearchContextTypes.SET_SEARCH_EXISTING: {
      return {
        ...state,
        searchExisting: action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
}
