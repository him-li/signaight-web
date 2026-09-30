import {
  MergePersonsSteps,
  PersonsMergeActions,
  PersonsMergeContextProps,
  PersonsMergeContextTypes,
} from "./types";

export const initPersonsMergeState: PersonsMergeContextProps = {
  currentStep: MergePersonsSteps.SELECT_PERSONS,
  personsToMerge: [],
};

export function PersonsMergeReducer(
  state: PersonsMergeContextProps,
  action: PersonsMergeActions,
): PersonsMergeContextProps {
  switch (action.type) {
    case PersonsMergeContextTypes.SET_CURRENT_STEP: {
      return {
        ...state,
        currentStep: action.payload.data,
      };
    }
    case PersonsMergeContextTypes.SET_PERSONS_TO_MERGE: {
      return {
        ...state,
        personsToMerge: action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
}
