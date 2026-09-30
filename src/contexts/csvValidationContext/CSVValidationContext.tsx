/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { PropsWithChildren, useCallback, useMemo } from "react";
import { CSVValidationReducer, initCSVValidationState } from "./reducer";
import { CSVValidationContextProps, CSVValidationContextTypes } from "./types";
const actionsList = {
  setCsvValidationErrors: (
    d: CSVValidationContextProps["csvValidationErrors"],
    isAdd: boolean,
  ) => {},
};

const CSVValidationStateContext =
  React.createContext<CSVValidationContextProps>({
    ...initCSVValidationState,
  });

const CSVValidationActionsContext = React.createContext(actionsList);

type CSVValidationProviderProps = object;

const CSVValidationProvider: React.FC<
  PropsWithChildren<CSVValidationProviderProps>
> = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    CSVValidationReducer,
    initCSVValidationState,
  );

  const setCsvValidationErrors = useCallback(
    (
      data: CSVValidationContextProps["csvValidationErrors"],
      isAdd: boolean,
    ) => {
      dispatch({
        type: CSVValidationContextTypes.SET_CSV_VALIDATION_ERRORS,
        payload: {
          data,
          isAdd,
        },
      });
    },
    [],
  );

  const value = useMemo(() => state, [state]);

  const actions = useMemo(
    () => ({ setCsvValidationErrors }),
    [setCsvValidationErrors],
  );

  return (
    <CSVValidationActionsContext.Provider value={actions}>
      <CSVValidationStateContext.Provider value={value}>
        {children}
      </CSVValidationStateContext.Provider>
    </CSVValidationActionsContext.Provider>
  );
};

function useCSVValidationState() {
  const context = React.useContext(CSVValidationStateContext);
  if (context === undefined) {
    throw new Error(
      "useCSVValidationState must be used within a CSVValidationProvider",
    );
  }
  return context;
}
function useCSVValidationActions() {
  const context = React.useContext(CSVValidationActionsContext);
  if (context === undefined) {
    throw new Error(
      "useCSVValidationActions must be used within a CSVValidationProvider",
    );
  }
  return context;
}

export default CSVValidationProvider;

export { useCSVValidationState, useCSVValidationActions };
