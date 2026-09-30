import {
  PermissionsActions,
  PermissionsContextProps,
  PermissionsContextTypes,
} from "./types";

export const initPermissionsState: PermissionsContextProps = {
  allWatchlistAllow: true,
};

export function PermissionsReducer(
  state: PermissionsContextProps,
  action: PermissionsActions,
): PermissionsContextProps {
  switch (action.type) {
    case PermissionsContextTypes.SET_ALL_WATCHLIST_ALLOW: {
      return {
        ...state,
        allWatchlistAllow: action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
}
