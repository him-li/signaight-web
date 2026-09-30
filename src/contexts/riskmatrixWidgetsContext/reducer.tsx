import { FlagsStatisticsResponse } from "@/types/responses/flagsStatisticResponse";
import {
  RiskmatrixWidgetsActions,
  RiskmatrixWidgetsContextProps,
  RiskmatrixWidgetsContextTypes,
} from "./types";

export const initRiskmatrixWidgetsState: RiskmatrixWidgetsContextProps = {
  personsFlags: {} as FlagsStatisticsResponse,
  loading: true,
};

export function RiskmatrixWidgetsReducer(
  state: RiskmatrixWidgetsContextProps,
  action: RiskmatrixWidgetsActions,
): RiskmatrixWidgetsContextProps {
  switch (action.type) {
    case RiskmatrixWidgetsContextTypes.SET_FLAGS_STATISTIC: {
      const data = action.payload.data;

      return {
        ...state,
        personsFlags: data,
      };
    }
    case RiskmatrixWidgetsContextTypes.SET_LOADING: {
      return {
        ...state,
        loading: action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
}
