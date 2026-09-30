import {
  flowsSlice as slice,
  initialFlowsState as initialState,
} from "./flows.slice";
import { selectFlowsState as selector } from "./flows.selectors";
import { flowsActions } from "./flows.actions";
import { FlowsState as stateType } from "./flows.types";

export const flowsSlice = slice;

export const initialFlowsState = initialState;

export const selectFlowsState = selector;

export type FlowsState = stateType;

export const { getFlowsList, runFlows } = flowsActions;

export const { includeSelectedFlow, excludeSelectedFlow, resetSelectedFlows } =
  flowsSlice.actions;
