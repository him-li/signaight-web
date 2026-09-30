/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { redirect, useSearchParams } from "next/navigation";
import React, { PropsWithChildren, useEffect, useMemo } from "react";
import { PermissionsReducer, initPermissionsState } from "./reducer";
import { PermissionsContextProps, PermissionsContextTypes } from "./types";
import { ALL_PROJECTS } from "@/constants/projects";
import { ROUTES } from "@/constants/routes";
import { SEARCH_QURIES } from "@/constants/search";
const actionsList = {};

const PermissionsStateContext = React.createContext<PermissionsContextProps>({
  ...initPermissionsState,
});

const PermissionsActionsContext = React.createContext(actionsList);

type PermissionsProviderProps = {
  allWatchlistAllow: boolean;
};

const PermissionsProvider: React.FC<
  PropsWithChildren<PermissionsProviderProps>
> = ({ children, allWatchlistAllow }) => {
  const searchParams = useSearchParams();
  const [state, dispatch] = React.useReducer(
    PermissionsReducer,
    initPermissionsState,
  );

  useEffect(() => {
    const getData = async () => {
      const params = new URLSearchParams(searchParams!);
      const item = params.get(SEARCH_QURIES.ITEM);
      if (item === ALL_PROJECTS && !allWatchlistAllow) {
        return redirect(ROUTES.SCREENING);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allWatchlistAllow]);

  const value = useMemo(
    () => ({
      allWatchlistAllow,
    }),
    [allWatchlistAllow],
  );

  const actions = useMemo(() => ({}), []);

  return (
    <PermissionsActionsContext.Provider value={actions}>
      <PermissionsStateContext.Provider value={value}>
        {children}
      </PermissionsStateContext.Provider>
    </PermissionsActionsContext.Provider>
  );
};

function usePermissionsState() {
  const context = React.useContext(PermissionsStateContext);
  if (context === undefined) {
    throw new Error(
      "usePermissionsState must be used within a PermissionsProvider",
    );
  }
  return context;
}
function usePermissionsActions() {
  const context = React.useContext(PermissionsActionsContext);
  if (context === undefined) {
    throw new Error(
      "usePermissionsActions must be used within a PermissionsProvider",
    );
  }
  return context;
}

export default PermissionsProvider;

export { usePermissionsState, usePermissionsActions };
