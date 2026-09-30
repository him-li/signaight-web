import { createSlice } from "@reduxjs/toolkit";
import { FlowsState } from "./flows.types";
import { getFlowsList, runFlows } from "./flows.actions";

export const initialFlowsState: FlowsState = {
  loading: false,
  error: null,
  flowsList: {},
  flowRunning: false,
  selectedFlows: [],
};

export const flowsSlice = createSlice({
  name: "flows",
  initialState: initialFlowsState,
  reducers: {
    includeSelectedFlow: (state, action) => {
      state.selectedFlows = [...state.selectedFlows, action.payload];
    },
    excludeSelectedFlow: (state, action) => {
      state.selectedFlows = state.selectedFlows.filter(
        (flow) => flow !== action.payload,
      );
    },
    resetSelectedFlows: (state) => {
      state.selectedFlows = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFlowsList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFlowsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(getFlowsList.fulfilled, (state, action) => {
        state.loading = false;
        state.flowsList = action.payload;
      })
      .addCase(runFlows.pending, (state) => {
        state.loading = true;
        state.flowRunning = true;
      })
      .addCase(runFlows.rejected, (state, action) => {
        state.loading = false;
        state.flowRunning = false;
        state.error = action.error.message!;
      })
      .addCase(runFlows.fulfilled, (state) => {
        state.loading = false;
        state.flowRunning = false;
      });
  },
});
