import { ActionMap } from "../types";

export type SearchParamsContextProps = {
  currentPage: number;
  currentItem?: string;
};

export enum SearchParamsContextTypes {
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  SET_CURRENT_ITEM = "SET_CURRENT_ITEM",
}

export type SearchParamsContextPayload = {
  [SearchParamsContextTypes.SET_CURRENT_PAGE]: {
    data: SearchParamsContextProps["currentPage"];
  };
  [SearchParamsContextTypes.SET_CURRENT_ITEM]: {
    data: SearchParamsContextProps["currentItem"];
  };
};

export type SearchParamsActions =
  ActionMap<SearchParamsContextPayload>[keyof ActionMap<SearchParamsContextPayload>];
