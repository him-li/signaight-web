import type { Person } from "@/types/person/index.interface";
import type { PersonalDetails } from "@/types/person/personal_details/index.interface";
import { ActionMap } from "../types";

export type PersonalDataContextProps = {
  currentSubjectData: Person | null;
  loading: boolean;
};

export type InitialPersonalDataContextProps = {
  initialPersonalData: PersonalDetails | null;
  loading: boolean;
};

export enum PersonalDataContextTypes {
  SET_CURRENT_SUBJECT_DATA = "SET_CURRENT_SUBJECT_DATA",
  SET_LOADING = "SET_LOADING",
}

export enum InitialPersonalDataContextTypes {
  SET_CURRENT_PERSON_INITIAL_DATA = "SET_CURRENT_PERSON_INITIAL_DATA",
  SET_LOADING = "SET_LOADING",
}

export type PersonalDataContextPayload = {
  [PersonalDataContextTypes.SET_CURRENT_SUBJECT_DATA]: {
    data: PersonalDataContextProps["currentSubjectData"];
  };
  [PersonalDataContextTypes.SET_LOADING]: {
    data: PersonalDataContextProps["loading"];
  };
};

export type InitialPersonalDataContextPayload = {
  [InitialPersonalDataContextTypes.SET_CURRENT_PERSON_INITIAL_DATA]: {
    data: InitialPersonalDataContextProps["initialPersonalData"];
  };
  [InitialPersonalDataContextTypes.SET_LOADING]: {
    data: InitialPersonalDataContextProps["loading"];
  };
};

export type PersonalDataActions =
  ActionMap<PersonalDataContextPayload>[keyof ActionMap<PersonalDataContextPayload>];

export type InitialPersonalDataActions =
  ActionMap<InitialPersonalDataContextPayload>[keyof ActionMap<InitialPersonalDataContextPayload>];
