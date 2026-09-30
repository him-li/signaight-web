import {
  pageLoadingSlice as slice,
  initialPageLoadingState as initialState,
} from "./pageLoading.slice";
import { selectPageLoadingState as selector } from "./pageLoading.selectors";
import { PageLoadingState as stateType } from "./pageLoading.types";

export const pageLoadingSlice = slice;

export const initialPageLoadingState = initialState;

export const selectPageLoadingState = selector;

export type PageLoadingState = stateType;

export const {
  setPageLoading,
  setPageReady,
  setModalLoading,
  setModalReady,
  openSpinner,
  closeSpinner,
} = pageLoadingSlice.actions;
