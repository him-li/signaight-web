import {
  PersonalDataActions,
  PersonalDataContextProps,
  PersonalDataContextTypes,
  InitialPersonalDataActions,
  InitialPersonalDataContextProps,
  InitialPersonalDataContextTypes,
} from "./types";

export const initPersonalDataState: PersonalDataContextProps = {
  currentSubjectData: null,
  loading: true,
};

export const initInitialPersonalDataState: InitialPersonalDataContextProps = {
  initialPersonalData: null,
  loading: true,
};

export function PersonalDataReducer(
  state: PersonalDataContextProps,
  action: PersonalDataActions,
): PersonalDataContextProps {
  switch (action.type) {
    case PersonalDataContextTypes.SET_CURRENT_SUBJECT_DATA: {
      return {
        ...state,
        currentSubjectData: action.payload.data,
      };
    }
    case PersonalDataContextTypes.SET_LOADING: {
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

export function InitialPersonalDataReducer(
  state: InitialPersonalDataContextProps,
  action: InitialPersonalDataActions,
): InitialPersonalDataContextProps {
  switch (action.type) {
    case InitialPersonalDataContextTypes.SET_CURRENT_PERSON_INITIAL_DATA: {
      return {
        ...state,
        initialPersonalData: action.payload.data,
      };
    }
    case InitialPersonalDataContextTypes.SET_LOADING: {
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
