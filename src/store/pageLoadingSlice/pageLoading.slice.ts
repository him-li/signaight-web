import { createSlice } from "@reduxjs/toolkit";
import { PageLoadingState } from "./pageLoading.types";

export const initialPageLoadingState: PageLoadingState = {
  pageLoading: false,
  modalLoading: false,
  spinnerOpen: false,
};

export const pageLoadingSlice = createSlice({
  name: "pageLoading",
  initialState: initialPageLoadingState,
  reducers: {
    setPageLoading: (state) => {
      state.pageLoading = false;
    },
    setPageReady: (state) => {
      state.pageLoading = false;
    },
    setModalLoading: (state) => {
      state.modalLoading = false;
    },
    setModalReady: (state) => {
      state.modalLoading = false;
    },
    openSpinner: (state) => {
      state.spinnerOpen = true;
    },
    closeSpinner: (state) => {
      state.spinnerOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addDefaultCase(() => {});
  },
});
