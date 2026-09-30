import {
  activeSearchSlice as slice,
  initialActiveSearchState as initialState,
} from "./activeSearch.slice";
import { activeSearchActions } from "./activeSearch.actions";
import type { ActiveSearchState as stateType } from "./activeSearch.types";

export const activeSearchSlice = slice;
export const initialactiveSearchsState = initialState;

export type activeSearchsState = stateType;

export const {
  fetchActiveSearches,
  fetchActiveSearchById,
  createActiveSearch,
  updateActiveSearch,
} = activeSearchActions;

export const {
  clearActiveSearch,
  clearActiveSearches,
  moveToNextPage,
  moveToPrevPage,
  moveToPage,
  resetPage,
  resetPageSize,
  updateSearchResults,
} = activeSearchSlice.actions;
