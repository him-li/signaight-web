import type { ActiveSearch } from "@/types/search.interface";
import type { ActiveSearchState } from "./activeSearch.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  fetchActiveSearches,
  fetchActiveSearchById,
  createActiveSearch,
  updateActiveSearch,
} from "./activeSearch.actions";

export const initialActiveSearchState: ActiveSearchState = {
  activeSearches: [],
  activeSearch: null,
  activeSearchPage: 1,
  activeSearchPageSize: 5,
  activeSearchTotal: 0,
  activeSearchTotalPages: 0,
  loading: false,
  error: null,
};

export const activeSearchSlice = createSlice({
  name: "activeSearch",
  initialState: initialActiveSearchState,
  reducers: {
    clearActiveSearches: (state) => {
      state.activeSearches = [];
    },
    clearActiveSearch: (state) => {
      state.activeSearch = null;
    },
    updateSearchResults: (state, action: PayloadAction<ActiveSearch>) => {
      state.activeSearch = action.payload;
    },
    moveToNextPage: (state) => {
      state.activeSearchPage++;
    },
    moveToPrevPage: (state) => {
      state.activeSearchPage--;
    },
    moveToPage: (state, action: PayloadAction<number>) => {
      state.activeSearchPage = action.payload;
    },
    resetPage: (state) => {
      state.activeSearchPage = 1;
    },
    changePageSize: (state, action: PayloadAction<number>) => {
      state.activeSearchPageSize = action.payload;
    },
    resetPageSize: (state) => {
      state.activeSearchPageSize = 5;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveSearches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchActiveSearches.fulfilled,
        (state, action: PayloadAction<ActiveSearch[]>) => {
          state.loading = false;
          state.activeSearches = action.payload;
        },
      )
      .addCase(fetchActiveSearches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchActiveSearchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchActiveSearchById.fulfilled,
        (state, action: PayloadAction<ActiveSearch>) => {
          state.loading = false;
          state.activeSearch = action.payload;
        },
      )
      .addCase(fetchActiveSearchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createActiveSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createActiveSearch.fulfilled,
        (state, action: PayloadAction<ActiveSearch>) => {
          state.loading = false;
          state.activeSearches.push(action.payload);
        },
      )
      .addCase(createActiveSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateActiveSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateActiveSearch.fulfilled,
        (state, action: PayloadAction<ActiveSearch>) => {
          state.loading = false;
          const index = state.activeSearches.findIndex(
            (as) => as.id === action.payload.id,
          );
          if (index !== -1) {
            state.activeSearches[index] = action.payload;
          }
        },
      )
      .addCase(updateActiveSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
