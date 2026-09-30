"use client";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { LayoutReducer, initLayoutState } from "./reducer";
import {
  LayoutContextProps,
  LayoutContextTypes,
  LayoutProviderProps,
} from "./types";
import { createLayoutCookie } from "@/app/actions";
import { layouts } from "@/constants/layouts";
import { setLayoutName } from "@/utils/layout";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const actionsList = { changeLayout: (_n: string) => {} };

const LayoutStateContext = React.createContext<LayoutContextProps>({
  ...initLayoutState,
});

const LayoutActionsContext = React.createContext(actionsList);

const LayoutProvider: React.FC<PropsWithChildren<LayoutProviderProps>> = ({
  children,
  layoutName,
}) => {
  const [state, dispatch] = React.useReducer(LayoutReducer, initLayoutState);

  useEffect(() => {
    dispatch({
      type: LayoutContextTypes.SET_LAYOUT_NAME,
      payload: { data: layoutName },
    });
    setLayoutName(layoutName);
  }, [layoutName]);

  const changeLayout = useCallback((data: string) => {
    const layout = layouts.find((layout) => layout.key === data);
    const homepage = layout?.homeUrl || "/";
    createLayoutCookie(data).then(() => {
      location.href = homepage;
    });
  }, []);

  const value = useMemo(() => state, [state]);

  const actions = useMemo(() => ({ changeLayout }), [changeLayout]);

  return (
    <LayoutActionsContext.Provider value={actions}>
      <LayoutStateContext.Provider value={value}>
        {children}
      </LayoutStateContext.Provider>
    </LayoutActionsContext.Provider>
  );
};

function useLayoutState() {
  const context = React.useContext(LayoutStateContext);
  if (context === undefined) {
    throw new Error("useLayoutState must be used within a LayoutProvider");
  }
  return context;
}
function useLayoutActions() {
  const context = React.useContext(LayoutActionsContext);
  if (context === undefined) {
    throw new Error("useLayoutActions must be used within a LayoutProvider");
  }
  return context;
}

export default LayoutProvider;

export { useLayoutState, useLayoutActions };
