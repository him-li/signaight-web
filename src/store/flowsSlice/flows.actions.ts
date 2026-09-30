/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import FlowsServices from "@/services/flowsServices";
import { AppState } from "../store";
import { Person } from "@/types/person/index.interface";

export const getFlowsList = createAsyncThunk(
  "flows/getFlowsList",
  async (_, store) => {
    const token = (store.getState() as AppState).auth.token;
    const apiResList = await FlowsServices.getFlows(token);
    return apiResList;
  },
);

export const runFlows = createAsyncThunk(
  "flows/runFlows",
  async ({ selectedFlows, persons_id }: any, store) => {
    const token = (store.getState() as AppState).auth.token;
    await FlowsServices.useFlow(selectedFlows, persons_id, token);
  },
);

export const runEnrichFlows = createAsyncThunk(
  "flows/runEnrichFlows",
  async ({ person }: { person: Person }, store) => {
    const token = (store.getState() as AppState).auth.token;
    const person_id = [person.id];
    await FlowsServices.useEnrichFlow(person_id, token);
  },
);

export const flowsActions = {
  getFlowsList,
  runFlows,
};
