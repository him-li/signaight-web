import { createAsyncThunk } from "@reduxjs/toolkit";
import CandidatesServices from "@/services/candidatesService";
import EventsServices from "@/services/eventsServices";
import PersonsService from "@/services/personsService";
import { AppState } from "@/store/store";

export const fetchSearch = createAsyncThunk(
  "profileSelect/fetchSearch",
  async (searchId: string, store) => {
    const token = (store.getState() as AppState).auth.token;
    const data = await EventsServices.getSearch(searchId, token);
    return data;
  },
);

export const fetchCandidates = createAsyncThunk(
  "profileSelect/fetchCandidates",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ({ personId, source, resource, searchId, primary }: any, store) => {
    const token = (store.getState() as AppState).auth.token;
    const data = await CandidatesServices.getCandidates(
      personId,
      source,
      resource,
      searchId,
      primary,
      token,
    );
    return data.items;
  },
);

export const fetchIdentityExpanderCandidates = createAsyncThunk(
  "profileSelect/fetchIdentityExpanderCandidates",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ({ personId, source, searchId }: any, store) => {
    const token = (store.getState() as AppState).auth.token;
    const data = await CandidatesServices.getCandidates(
      personId,
      source,
      "grayfox",
      searchId,
      false,
      token,
    );
    return data.items;
  },
);

export const fetchSubject = createAsyncThunk(
  "profileSelect/fetchSubject",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (personId: any, store) => {
    const token = (store.getState() as AppState).auth.token;
    const data = await PersonsService.getPerson(personId, token);
    return data;
  },
);

export const updatePrimary = createAsyncThunk(
  "profileSelect/updatePrimary",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ({ personId, candidateId, searchId }: any, store) => {
    const token = (store.getState() as AppState).auth.token;
    return await CandidatesServices.updateCandidatePrimary(
      personId,
      candidateId,
      searchId,
      token,
    );
  },
);

export const createCandidate = createAsyncThunk(
  "profileSelect/CreateCandidate",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ({ personId, candidate }: any, store) => {
    const token = (store.getState() as AppState).auth.token;
    return await CandidatesServices.addCandidate(personId, candidate, token);
  },
);

export const profileSelectActions = {
  fetchSearch,
  fetchCandidates,
  fetchIdentityExpanderCandidates,
  fetchSubject,
  updatePrimary,
  createCandidate,
};
