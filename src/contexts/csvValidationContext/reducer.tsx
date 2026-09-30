import {
  CSVValidationActions,
  CSVValidationContextProps,
  CSVValidationContextTypes,
} from "./types";

export const initCSVValidationState: CSVValidationContextProps = {
  csvValidationErrors: [],
};

export function CSVValidationReducer(
  state: CSVValidationContextProps,
  action: CSVValidationActions,
): CSVValidationContextProps {
  switch (action.type) {
    case CSVValidationContextTypes.SET_CSV_VALIDATION_ERRORS: {
      if (action.payload.isAdd) {
        return {
          ...state,
          csvValidationErrors: state.csvValidationErrors.concat(
            action.payload.data,
          ),
        };
      }
      return {
        ...state,
        csvValidationErrors: action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
}
