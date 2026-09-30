import { Person, PersonQuery } from "@/types/person/index.interface";
import { ActionMap } from "../types";
import { IPagination } from "@/types/tables.interface";

export type PersonContextProps = {
  persons: Person[];
  loading: boolean;
  pagination: IPagination;
  searchQuery: PersonQuery;
};

export enum PersonContextTypes {
  SET_PERSONS = "SET_PERSONS",
  SET_LOADING = "SET_LOADING",
  SET_SEARCH_QUERY = "SET_SEARCH_QUERY",
  SET_PAGE_NUMBER = "SET_PAGE_NUMBER",
  UPDATE_PERSONS = "UPDATE_PERSONS",
}

export type PersonContextPayload = {
  [PersonContextTypes.SET_PERSONS]: {
    data: { items: PersonContextProps["persons"] } & IPagination;
    isAdd: boolean;
  };
  [PersonContextTypes.UPDATE_PERSONS]: {
    data: Person;
  };
  [PersonContextTypes.SET_LOADING]: {
    data: PersonContextProps["loading"];
  };
  [PersonContextTypes.SET_SEARCH_QUERY]: {
    data: PersonContextProps["searchQuery"];
  };
  [PersonContextTypes.SET_PAGE_NUMBER]: {
    data: string | number;
  };
};

export type PersonActions =
  ActionMap<PersonContextPayload>[keyof ActionMap<PersonContextPayload>];

export type IPersonSearchParams = {
  page: number;
  isAdd: boolean;
  withoutCache?: boolean;
};

export type ICreatePersonRequest = {
  person: Partial<Person>;
  searchExisting: boolean;
};
