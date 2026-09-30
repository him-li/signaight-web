"use client";
import React, { PropsWithChildren, useEffect, useMemo } from "react";
import { PersonalDataReducer, initPersonalDataState } from "./reducer";
import { PersonalDataContextProps, PersonalDataContextTypes } from "./types";
import { Person } from "@/types/person/index.interface";

const actionsList = {};

const PersonalDataStateContext = React.createContext<PersonalDataContextProps>({
  ...initPersonalDataState,
});

const PersonalDataActionsContext = React.createContext(actionsList);

type PersonalDataProviderProps = { currentSubjectData: Person | null };

const PersonalDataProvider: React.FC<
  PropsWithChildren<PersonalDataProviderProps>
> = ({ children, currentSubjectData }) => {
  const [state, dispatch] = React.useReducer(
    PersonalDataReducer,
    initPersonalDataState,
  );

  useEffect(() => {
    dispatch({
      type: PersonalDataContextTypes.SET_CURRENT_SUBJECT_DATA,
      payload: { data: currentSubjectData },
    });
    dispatch({
      type: PersonalDataContextTypes.SET_LOADING,
      payload: { data: false },
    });
  }, [currentSubjectData]);

  const value = useMemo(() => state, [state]);

  const actions = useMemo(() => ({}), []);

  return (
    <PersonalDataActionsContext.Provider value={actions}>
      <PersonalDataStateContext.Provider value={value}>
        {children}
      </PersonalDataStateContext.Provider>
    </PersonalDataActionsContext.Provider>
  );
};

function usePersonalDataState() {
  const context = React.useContext(PersonalDataStateContext);
  if (context === undefined) {
    throw new Error(
      "usePersonalDataState must be used within a PersonalDataProvider",
    );
  }
  return context;
}
function usePersonalDataActions() {
  const context = React.useContext(PersonalDataActionsContext);
  if (context === undefined) {
    throw new Error(
      "usePersonalDataActions must be used within a PersonalDataProvider",
    );
  }
  return context;
}

export default PersonalDataProvider;

export { usePersonalDataState, usePersonalDataActions };
