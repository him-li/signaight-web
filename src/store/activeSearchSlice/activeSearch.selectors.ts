import { AppState } from "@/store/store";
export const selectActiveSearches = (state: AppState) =>
  state.activeSearch.activeSearches;
export const selectActiveSearch = (state: AppState) =>
  state.activeSearch.activeSearch;
export const selectActiveSearchError = (state: AppState) =>
  state.activeSearch.error;
export const selectActiveSearchLoading = (state: AppState) =>
  state.activeSearch.loading;
