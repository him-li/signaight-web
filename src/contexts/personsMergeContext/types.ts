/* eslint-disable @typescript-eslint/no-explicit-any */
import { Person } from "@/types/person/index.interface";
import { ActionMap } from "../types";

export type IPersonsMergeError = Papa.ParseError & { data: any };

export enum MergePersonsSteps {
  SELECT_PERSONS = 0,
  MERGE_STRATEGY = 1,
  REVIEW_MERGE = 2,
}

export type PersonsMergeContextProps = {
  currentStep: MergePersonsSteps;
  personsToMerge: Person[];
};

export enum PersonsMergeContextTypes {
  SET_CURRENT_STEP = "SET_CURRENT_STEP",
  SET_PERSONS_TO_MERGE = "SET_PERSONS_TO_MERGE",
}

export type PersonsMergeContextPayload = {
  [PersonsMergeContextTypes.SET_CURRENT_STEP]: {
    data: PersonsMergeContextProps["currentStep"];
  };
  [PersonsMergeContextTypes.SET_PERSONS_TO_MERGE]: {
    data: PersonsMergeContextProps["personsToMerge"];
  };
};

export type PersonsMergeActions =
  ActionMap<PersonsMergeContextPayload>[keyof ActionMap<PersonsMergeContextPayload>];
