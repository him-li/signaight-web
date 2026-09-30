import { ActionMap } from "../types";
import { FlagsStatisticsResponse } from "@/types/responses/flagsStatisticResponse";

export type RiskmatrixWidgetsContextProps = {
  personsFlags: FlagsStatisticsResponse;
  loading: boolean;
};

export enum RiskmatrixWidgetsContextTypes {
  SET_FLAGS_STATISTIC = "SET_FLAGS_STATISTIC",
  SET_LOADING = "SET_LOADING",
}

export type RiskmatrixWidgetsContextPayload = {
  [RiskmatrixWidgetsContextTypes.SET_FLAGS_STATISTIC]: {
    data: RiskmatrixWidgetsContextProps["personsFlags"];
  };
  [RiskmatrixWidgetsContextTypes.SET_LOADING]: {
    data: RiskmatrixWidgetsContextProps["loading"];
  };
};

export type RiskmatrixWidgetsActions =
  ActionMap<RiskmatrixWidgetsContextPayload>[keyof ActionMap<RiskmatrixWidgetsContextPayload>];
