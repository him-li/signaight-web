/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type FC,
  type PropsWithChildren,
} from "react";
import {
  RiskmatrixWidgetsReducer,
  initRiskmatrixWidgetsState,
} from "./reducer";
import { RiskmatrixWidgetsContextProps } from "./types";
import { FlagsStatisticsResponse } from "@/types/responses/flagsStatisticResponse";

const actionsList = {};

const RiskmatrixWidgetsStateContext =
  createContext<RiskmatrixWidgetsContextProps>({
    ...initRiskmatrixWidgetsState,
  });

const RiskmatrixWidgetsActionsContext = createContext(actionsList);

type RiskmatrixWidgetsProviderProps = { personsFlags: FlagsStatisticsResponse };

const RiskmatrixWidgetsProvider: FC<
  PropsWithChildren<RiskmatrixWidgetsProviderProps>
> = ({ children, personsFlags }) => {
  const [state, dispatch] = useReducer(
    RiskmatrixWidgetsReducer,
    initRiskmatrixWidgetsState,
  );

  const value = useMemo(
    () => ({ ...state, personsFlags }),
    [state, personsFlags],
  );

  const actions = useMemo(() => ({}), []);

  return (
    <RiskmatrixWidgetsActionsContext.Provider value={actions}>
      <RiskmatrixWidgetsStateContext.Provider value={value}>
        {children}
      </RiskmatrixWidgetsStateContext.Provider>
    </RiskmatrixWidgetsActionsContext.Provider>
  );
};

function useRiskmatrixWidgetsState() {
  const context = useContext(RiskmatrixWidgetsStateContext);
  if (context === undefined) {
    throw new Error(
      "useRiskmatrixWidgetsState must be used within a RiskmatrixWidgetsProvider",
    );
  }
  return context;
}
function useRiskmatrixWidgetsActions() {
  const context = useContext(RiskmatrixWidgetsActionsContext);
  if (context === undefined) {
    throw new Error(
      "useRiskmatrixWidgetsActions must be used within a RiskmatrixWidgetsProvider",
    );
  }
  return context;
}

export default RiskmatrixWidgetsProvider;

export { useRiskmatrixWidgetsState, useRiskmatrixWidgetsActions };
