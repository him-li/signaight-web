import { type RangeValue } from "@heroui/react";
import type { FeatureCollection } from "geojson";

import { ActionMap } from "../types";

export type GeoTraceContextProps = {
  geoTrace: FeatureCollection;
  loading: boolean;
  dateRange: RangeValue<any>;
  position: ("residence" | "check_ins" | "entities")[];
};

export enum GeoTraceContextTypes {
  SET_GEOTRACE = "SET_GEOTRACE",
  SET_LOADING = "SET_LOADING",
  SET_DATE_RANGE = "SET_DATE_RANGE",
  SET_POSITION = "SET_POSITION",
}

export type GeoTraceContextPayload = {
  [GeoTraceContextTypes.SET_GEOTRACE]: {
    data: GeoTraceContextProps["geoTrace"];
  };
  [GeoTraceContextTypes.SET_LOADING]: {
    data: GeoTraceContextProps["loading"];
  };
  [GeoTraceContextTypes.SET_DATE_RANGE]: {
    data: GeoTraceContextProps["dateRange"];
  };
  [GeoTraceContextTypes.SET_POSITION]: {
    data: GeoTraceContextProps["position"];
  };
};

export type GeoTraceActions =
  ActionMap<GeoTraceContextPayload>[keyof ActionMap<GeoTraceContextPayload>];
