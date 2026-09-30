/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionMap } from "../types";

export type ICsvValidationError = Papa.ParseError & { data: any };

export type CSVValidationContextProps = {
  csvValidationErrors: ICsvValidationError[];
};

export enum CSVValidationContextTypes {
  SET_CSV_VALIDATION_ERRORS = "SET_CSV_VALIDATION_ERRORS",
}

export type CSVValidationContextPayload = {
  [CSVValidationContextTypes.SET_CSV_VALIDATION_ERRORS]: {
    data: CSVValidationContextProps["csvValidationErrors"];
    isAdd: boolean;
  };
};

export type CSVValidationActions =
  ActionMap<CSVValidationContextPayload>[keyof ActionMap<CSVValidationContextPayload>];
