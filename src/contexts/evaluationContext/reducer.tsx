import {
  EvaluationActions,
  EvaluationContextProps,
  EvaluationContextTypes,
} from "./types";

export const initEvaluationState: EvaluationContextProps = {
  currentPerson: null,
  loading: true,
};

export function EvaluationReducer(
  state: EvaluationContextProps,
  action: EvaluationActions,
): EvaluationContextProps {
  switch (action.type) {
    case EvaluationContextTypes.SET_PERSON: {
      return {
        ...state,
        currentPerson: action.payload.data,
      };
    }
    case EvaluationContextTypes.SET_LOADING: {
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
