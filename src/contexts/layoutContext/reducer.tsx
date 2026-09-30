import { LayoutActions, LayoutContextProps, LayoutContextTypes } from "./types";

export const initLayoutState: LayoutContextProps = {
  layoutName: "",
};

export function LayoutReducer(
  state: LayoutContextProps,
  action: LayoutActions,
): LayoutContextProps {
  switch (action.type) {
    case LayoutContextTypes.SET_LAYOUT_NAME: {
      return {
        ...state,
        layoutName: action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
}
