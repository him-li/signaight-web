import {
  searchesSlice as slice,
  initialEventsState as initialState,
} from "./searches.slice";
import { selectSearchesState as selector } from "./searches.selectors";
import { searchesActions } from "./searches.actions";
import { EventsState as stateType } from "./searches.types";

export const searchesSlice = slice;

export const initialEventsState = initialState;

export const selectSearchesState = selector;

export type EventsState = stateType;

export const { getSearchesList } = searchesActions;

export const { includeSelectedSearches, resetSelectedSearches } =
  searchesSlice.actions;
