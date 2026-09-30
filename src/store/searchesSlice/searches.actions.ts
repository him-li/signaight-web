import { createAsyncThunk } from "@reduxjs/toolkit";
import EventsServices from "@/services/eventsServices";
import { AppState } from "../store";

export const getSearchesList = createAsyncThunk(
  "searches/getSearchesList",
  async (_, store) => {
    const token = (store.getState() as AppState).auth.token;
    const apiResList = await EventsServices.getSearches(token);
    return apiResList;
  },
);

export const searchesActions = {
  getSearchesList,
};
