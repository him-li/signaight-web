/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { PropsWithChildren, useCallback, useMemo } from "react";
import { PersonsSearchReducer, initPersonsSearchState } from "./reducer";
import { PersonsSearchContextProps, PersonsSearchContextTypes } from "./types";
const actionsList = {
  setSearchExisting: (d: boolean) => {},
};

const PersonsSearchStateContext =
  React.createContext<PersonsSearchContextProps>({
    ...initPersonsSearchState,
  });

const PersonsSearchActionsContext = React.createContext(actionsList);

type PersonsSearchProviderProps = object;

const PersonsSearchProvider: React.FC<
  PropsWithChildren<PersonsSearchProviderProps>
> = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    PersonsSearchReducer,
    initPersonsSearchState,
  );

  const setSearchExisting = useCallback((data: boolean) => {
    dispatch({
      type: PersonsSearchContextTypes.SET_SEARCH_EXISTING,
      payload: {
        data,
      },
    });
  }, []);

  const value = useMemo(() => state, [state]);

  const actions = useMemo(() => ({ setSearchExisting }), [setSearchExisting]);

  return (
    <PersonsSearchActionsContext.Provider value={actions}>
      <PersonsSearchStateContext.Provider value={value}>
        {children}
      </PersonsSearchStateContext.Provider>
    </PersonsSearchActionsContext.Provider>
  );
};

function usePersonsSearchState() {
  const context = React.useContext(PersonsSearchStateContext);
  if (context === undefined) {
    throw new Error(
      "usePersonsSearchState must be used within a PersonsSearchProvider",
    );
  }
  return context;
}
function usePersonsSearchActions() {
  const context = React.useContext(PersonsSearchActionsContext);
  if (context === undefined) {
    throw new Error(
      "usePersonsSearchActions must be used within a PersonsSearchProvider",
    );
  }
  return context;
}

export default PersonsSearchProvider;

export { usePersonsSearchState, usePersonsSearchActions };
