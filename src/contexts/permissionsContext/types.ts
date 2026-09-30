import { ActionMap } from "../types";

export type PermissionsContextProps = {
  allWatchlistAllow: boolean;
};

export enum PermissionsContextTypes {
  SET_ALL_WATCHLIST_ALLOW = "SET_ALL_WATCHLIST_ALLOW",
}

export type PermissionsContextPayload = {
  [PermissionsContextTypes.SET_ALL_WATCHLIST_ALLOW]: {
    data: PermissionsContextProps["allWatchlistAllow"];
  };
};

export type PermissionsActions =
  ActionMap<PermissionsContextPayload>[keyof ActionMap<PermissionsContextPayload>];
