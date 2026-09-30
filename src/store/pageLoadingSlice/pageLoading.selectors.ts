import { AppState } from "@/store/store";

export const selectPageLoadingState = (state: AppState) => state.pageLoading;
