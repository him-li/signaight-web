import type { FeatureCollection } from "geojson";
import { today, getLocalTimeZone } from "@internationalized/date";
import {
  GeoTraceActions,
  GeoTraceContextProps,
  GeoTraceContextTypes,
} from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultDate: any = {
  start: today(getLocalTimeZone()).add({ days: -3653 }),
  end: today(getLocalTimeZone()),
};

export const initGeoTraceState: GeoTraceContextProps = {
  geoTrace: {} as FeatureCollection,
  loading: true,
  dateRange: defaultDate,
  position: ["check_ins", "entities", "residence"],
};

export function GeoTraceReducer(
  state: GeoTraceContextProps,
  action: GeoTraceActions,
): GeoTraceContextProps {
  switch (action.type) {
    case GeoTraceContextTypes.SET_GEOTRACE: {
      return {
        ...state,
        geoTrace: action.payload.data,
      };
    }
    case GeoTraceContextTypes.SET_LOADING: {
      return {
        ...state,
        loading: action.payload.data,
      };
    }
    case GeoTraceContextTypes.SET_DATE_RANGE: {
      return {
        ...state,
        dateRange: action.payload.data,
      };
    }
    case GeoTraceContextTypes.SET_POSITION: {
      return {
        ...state,
        position: action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
}
