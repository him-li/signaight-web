import { Person } from "@/types/person/index.interface";
import { ActionMap } from "../types";

export type EvaluationContextProps = {
  currentPerson: Person | null;
  loading: boolean;
};

export enum EvaluationContextTypes {
  SET_PERSON = "SET_PERSON",
  SET_LOADING = "SET_LOADING",
}

export type EvaluationContextPayload = {
  [EvaluationContextTypes.SET_PERSON]: {
    data: EvaluationContextProps["currentPerson"];
  };
  [EvaluationContextTypes.SET_LOADING]: {
    data: EvaluationContextProps["loading"];
  };
};

export type EvaluationActions =
  ActionMap<EvaluationContextPayload>[keyof ActionMap<EvaluationContextPayload>];
