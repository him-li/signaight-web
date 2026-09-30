/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionMap } from "../types";

export type IPersonsSearchError = Papa.ParseError & { data: any };

export type PersonsSearchContextProps = {
  searchExisting: boolean;
};

export enum PersonsSearchContextTypes {
  SET_SEARCH_EXISTING = "SET_SEARCH_EXISTING",
}

export type PersonsSearchContextPayload = {
  [PersonsSearchContextTypes.SET_SEARCH_EXISTING]: {
    data: PersonsSearchContextProps["searchExisting"];
  };
};

export type PersonsSearchActions =
  ActionMap<PersonsSearchContextPayload>[keyof ActionMap<PersonsSearchContextPayload>];
