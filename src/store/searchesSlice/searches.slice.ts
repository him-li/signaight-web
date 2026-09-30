import { EventsState } from "./searches.types";
import { createSlice } from "@reduxjs/toolkit";
import { getSearchesList } from "./searches.actions";

export const initialEventsState: EventsState = {
  loading: false,
  error: null,
  searchesList: {},
  selectedSearches: "",
};

export const searchesSlice = createSlice({
  name: "searches",
  initialState: initialEventsState,
  reducers: {
    includeSelectedSearches: (state, action) => {
      state.selectedSearches = action.payload;
    },
    resetSelectedSearches: (state) => {
      state.selectedSearches = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchesList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSearchesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(getSearchesList.fulfilled, (state, action) => {
        state.loading = false;
        state.searchesList = action.payload;
      });
  },
});
