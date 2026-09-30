import { Person, PersonQuery } from "@/types/person/index.interface";
import { ActionMap } from "../types";
import { IPagination } from "@/types/tables.interface";

export type AnalysisContextProps = {
  users: Person[];
  loading: boolean;
  searchQuery: PersonQuery;
  pagination: IPagination;
  searchField: "f_name__like" | "l_name__like" | "email_address__like";
  searchValue: string;
};

export enum AnalysisContextTypes {
  SET_USERS = "SET_USERS",
  SET_LOADING = "SET_LOADING",
  SET_SEARCH_QUERY = "SET_SEARCH_QUERY",
  SET_SEARCH_FIELD = "SET_SEARCH_FIELD",
  SET_SEARCH_VALUE = "SET_SEARCH_VALUE",
}

export type AnalysisContextPayload = {
  [AnalysisContextTypes.SET_USERS]: {
    data: { items: AnalysisContextProps["users"] } & IPagination;
    isAdd: boolean;
    projectId: string;
  };
  [AnalysisContextTypes.SET_LOADING]: {
    data: AnalysisContextProps["loading"];
  };
  [AnalysisContextTypes.SET_SEARCH_QUERY]: {
    data: AnalysisContextProps["searchQuery"];
  };
  [AnalysisContextTypes.SET_SEARCH_FIELD]: {
    data: AnalysisContextProps["searchField"];
  };
  [AnalysisContextTypes.SET_SEARCH_VALUE]: {
    data: AnalysisContextProps["searchValue"];
  };
};

export type AnalysisActions =
  ActionMap<AnalysisContextPayload>[keyof ActionMap<AnalysisContextPayload>];

export type ISearchParams = {
  page: number;
  isAdd: boolean;
  searchField?: AnalysisContextProps["searchField"];
  searchValue?: string;
};
