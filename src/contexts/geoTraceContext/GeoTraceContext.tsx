"use client";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { GeoTraceReducer, initGeoTraceState } from "./reducer";
import { GeoTraceContextProps, GeoTraceContextTypes } from "./types";
import { useAppSelector } from "@/store/store";
import { toast } from "@heroui/react";
import { RangeValue } from "@heroui/react";
import { selectCurrentSubjectGeoTrace } from "@/store/subjectsSlice/subjects.selectors";

const actionsList = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDateRange: (d: RangeValue<any>) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setPosition: (d: GeoTraceContextProps["position"]) => {},
};

const GeoTraceStateContext = React.createContext<GeoTraceContextProps>({
  ...initGeoTraceState,
});

const GeoTraceActionsContext = React.createContext(actionsList);

type GeoTraceProviderProps = object;

const GeoTraceProvider: React.FC<PropsWithChildren<GeoTraceProviderProps>> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(
    GeoTraceReducer,
    initGeoTraceState,
  );

  const geoTrace = useAppSelector(selectCurrentSubjectGeoTrace);

  const setDateRange = useCallback(async (dates: RangeValue<any>) => {
    try {
      dispatch({
        type: GeoTraceContextTypes.SET_DATE_RANGE,
        payload: { data: dates },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.danger("Something went wrong. Please try again.");
    }
  }, []);

  const setPosition = useCallback(
    async (data: GeoTraceContextProps["position"]) => {
      dispatch({
        type: GeoTraceContextTypes.SET_POSITION,
        payload: { data },
      });
    },
    [],
  );

  useEffect(() => {
    dispatch({
      type: GeoTraceContextTypes.SET_GEOTRACE,
      payload: { data: geoTrace },
    });
  }, [geoTrace]);

  const value = useMemo(() => state, [state]);

  const actions = useMemo(
    () => ({ setDateRange, setPosition }),
    [setDateRange, setPosition],
  );

  return (
    <GeoTraceActionsContext.Provider value={actions}>
      <GeoTraceStateContext.Provider value={value}>
        {children}
      </GeoTraceStateContext.Provider>
    </GeoTraceActionsContext.Provider>
  );
};

function useGeoTraceState() {
  const context = React.useContext(GeoTraceStateContext);
  if (context === undefined) {
    throw new Error("useGeoTraceState must be used within a GeoTraceProvider");
  }
  return context;
}
function useGeoTraceActions() {
  const context = React.useContext(GeoTraceActionsContext);
  if (context === undefined) {
    throw new Error(
      "useGeoTraceActions must be used within a GeoTraceProvider",
    );
  }
  return context;
}

export default GeoTraceProvider;

export { useGeoTraceState, useGeoTraceActions };
