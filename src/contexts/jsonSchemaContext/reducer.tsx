import {
  JsonSchemaActions,
  JsonSchemaContextProps,
  JsonSchemaContextTypes,
} from "./types";

export const initJsonSchemaState: JsonSchemaContextProps = {
  schema: undefined,
  uischema: undefined,
};

export function JsonSchemaReducer(
  state: JsonSchemaContextProps,
  action: JsonSchemaActions,
): JsonSchemaContextProps {
  switch (action.type) {
    case JsonSchemaContextTypes.SET_CURRENT_SCHEMA: {
      return {
        ...state,
        schema: action.payload.data,
      };
    }
    case JsonSchemaContextTypes.SET_CURRENT_UI_SCHEMA: {
      return {
        ...state,
        uischema: action.payload.data,
      };
    }
    default: {
      return state;
    }
  }
}
