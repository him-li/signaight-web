import { ActionMap } from "../types";

export type LayoutContextProps = {
  layoutName: string;
};

export enum LayoutContextTypes {
  SET_LAYOUT_NAME = "SET_LAYOUT_NAME",
}

export type LayoutContextPayload = {
  [LayoutContextTypes.SET_LAYOUT_NAME]: {
    data: LayoutContextProps["layoutName"];
  };
};

export type LayoutActions =
  ActionMap<LayoutContextPayload>[keyof ActionMap<LayoutContextPayload>];

export type LayoutProviderProps = {
  layoutName: string;
};
