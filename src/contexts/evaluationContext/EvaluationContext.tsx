"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type FC,
  type PropsWithChildren,
} from "react";
import { EvaluationReducer, initEvaluationState } from "./reducer";
import { EvaluationContextProps, EvaluationContextTypes } from "./types";
import { Person } from "@/types/person/index.interface";
import { useAppDispatch } from "@/store/store";
import {
  getCurrentPersonAlerts,
  getCurrentPersonEvaluation,
  getCurrentPersonWebSearch,
  getRankingInfo,
  includeCurrentSubjectData,
} from "@/store/subjectsSlice";

const actionsList = {};

const EvaluationStateContext = createContext<EvaluationContextProps>({
  ...initEvaluationState,
});

const EvaluationActionsContext = createContext(actionsList);

type EvaluationProviderProps = {
  currentPerson: Person | null;
  personId: string;
  // projectId: string;
};

const EvaluationProvider: FC<PropsWithChildren<EvaluationProviderProps>> = ({
  children,
  currentPerson,
  personId,
}) => {
  const [state, dispatch] = useReducer(EvaluationReducer, initEvaluationState);
  const dispatchEvent = useAppDispatch();

  useEffect(() => {
    dispatchEvent(includeCurrentSubjectData(null));
    dispatchEvent(getRankingInfo());
    dispatchEvent(
      includeCurrentSubjectData({ ...currentPerson, _id: personId }),
    );
    dispatch({
      type: EvaluationContextTypes.SET_PERSON,
      payload: { data: currentPerson },
    });
    dispatch({
      type: EvaluationContextTypes.SET_LOADING,
      payload: { data: false },
    });
    dispatchEvent(getCurrentPersonAlerts(personId));
    dispatchEvent(getCurrentPersonEvaluation(personId));
    dispatchEvent(getCurrentPersonWebSearch(personId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPerson]);

  const value = useMemo(() => state, [state]);

  const actions = useMemo(() => ({}), []);

  return (
    <EvaluationActionsContext.Provider value={actions}>
      <EvaluationStateContext.Provider value={value}>
        {children}
      </EvaluationStateContext.Provider>
    </EvaluationActionsContext.Provider>
  );
};

function useEvaluationState() {
  const context = useContext(EvaluationStateContext);
  if (context === undefined) {
    throw new Error(
      "useEvaluationState must be used within a EvaluationProvider",
    );
  }
  return context;
}
function useEvaluationActions() {
  const context = useContext(EvaluationActionsContext);
  if (context === undefined) {
    throw new Error(
      "useEvaluationActions must be used within a EvaluationProvider",
    );
  }
  return context;
}

export default EvaluationProvider;

export { useEvaluationState, useEvaluationActions };
