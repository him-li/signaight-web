"use client";
import {
  type PropsWithChildren,
  type FC,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  InitialPersonalDataReducer,
  initInitialPersonalDataState,
} from "./reducer";
import {
  InitialPersonalDataContextProps,
  InitialPersonalDataContextTypes,
} from "./types";
import type { PersonalDetails } from "@/types/person/personal_details/index.interface";

const initialActionsList = {};

const InitialDataStateContext = createContext<InitialPersonalDataContextProps>({
  ...initInitialPersonalDataState,
});

const InitialDataActionsContext = createContext(initialActionsList);

type InitialDataProviderProps = { initialPersonData: PersonalDetails | null };

const InitialPersonalDataProvider: FC<
  PropsWithChildren<InitialDataProviderProps>
> = ({ children, initialPersonData }) => {
  const [state, dispatch] = useReducer(
    InitialPersonalDataReducer,
    initInitialPersonalDataState,
  );

  useEffect(() => {
    dispatch({
      type: InitialPersonalDataContextTypes.SET_CURRENT_PERSON_INITIAL_DATA,
      payload: { data: initialPersonData },
    });
    dispatch({
      type: InitialPersonalDataContextTypes.SET_LOADING,
      payload: { data: false },
    });
  }, [initialPersonData]);

  const value = useMemo(() => state, [state]);
  const actions = useMemo(() => ({}), []);

  return (
    <InitialDataActionsContext.Provider value={actions}>
      <InitialDataStateContext.Provider value={value}>
        {children}
      </InitialDataStateContext.Provider>
    </InitialDataActionsContext.Provider>
  );
};

function useInitialPersonState() {
  const context = useContext(InitialDataStateContext);
  if (context === undefined) {
    throw new Error(
      "useInitialPersonState must be used within an InitialPersonalDataProvider",
    );
  }
  return context;
}

function useInitialPersonActions() {
  const context = useContext(InitialDataActionsContext);
  if (context === undefined) {
    throw new Error(
      "useInitialPersonActions must be used within an InitialPersonalDataProvider",
    );
  }
  return context;
}

export default InitialPersonalDataProvider;
export { useInitialPersonState, useInitialPersonActions };
