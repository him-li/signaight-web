import { createSlice } from "@reduxjs/toolkit";
import { ProfileSelectState } from "./profileSelect.types";
import {
  fetchCandidates,
  fetchIdentityExpanderCandidates,
  fetchSearch,
  fetchSubject,
  updatePrimary,
} from "./profileSelect.actions";

export const initialProfileSelectState: ProfileSelectState = {
  profileSelected: false,
  loading: false,
  error: null,
  flows: [],
  currentFlow: 0,
  persons: [],
  currentPerson: 0,
  candidates: [],
  identityExpanderCandidates: [],
  currentSearch: "",
  primaryId: "",
  subjectData: null,
  confirmAlertOpen: false,
};

export const profileSelectSlice = createSlice({
  name: "profileSelect",
  initialState: initialProfileSelectState,
  reducers: {
    setProfileSelectOpen: (state) => {
      state.profileSelected = true;
    },
    setProfileSelectClose: (state) => {
      state.profileSelected = false;
    },
    setFlows: (state, action) => {
      state.flows = action.payload;
    },
    moveNextFlow: (state) => {
      if (state.currentFlow === state.flows.length - 1) {
        state.currentFlow = 0;
      } else {
        state.currentFlow += 1;
      }
    },
    getCurrentFlow: (state) => {
      return state.flows[state.currentFlow];
    },
    setPersons: (state, action) => {
      state.persons = action.payload;
    },
    moveToNextPerson: (state) => {
      if (state.currentPerson === state.persons.length - 1) {
        state.profileSelected = false;
        state.loading = false;
        state.error = null;
        state.flows = [];
        state.currentFlow = 0;
        state.persons = [];
        state.currentPerson = 0;
        state.candidates = [];
        state.subjectData = null;
      } else {
        state.currentPerson += 1;
        state.currentFlow = 0;
      }
    },
    getCurrentPerson: (state) => {
      return state.persons[state.currentPerson];
    },
    resetState: (state) => {
      state.profileSelected = false;
      state.loading = false;
      state.error = null;
      state.flows = [];
      state.currentFlow = 0;
      state.persons = [];
      state.currentPerson = 0;
      state.candidates = [];
      state.subjectData = null;
    },
    setPrimary: (state, action) => {
      state.primaryId = action.payload;
    },
    openAlertConfirm: (state) => {
      state.confirmAlertOpen = true;
    },
    closeAlertConfirm: (state) => {
      state.confirmAlertOpen = false;
    },
    includeSubjectData: (state, action) => {
      state.subjectData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdentityExpanderCandidates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIdentityExpanderCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchIdentityExpanderCandidates.fulfilled, (state, action) => {
        state.identityExpanderCandidates = action.payload;
        state.loading = false;
      })
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.candidates = action.payload;
        state.loading = false;
      })
      .addCase(fetchSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.flows = action.payload.flows_list;
        state.persons = action.payload.persons_list;
        state.currentSearch = action.payload.id;
        state.loading = false;
        state.currentFlow = 0;
        state.currentPerson = 0;
        state.profileSelected = true;
      })
      .addCase(fetchSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchSubject.fulfilled, (state, action) => {
        state.subjectData = action.payload;
        state.loading = false;
      })
      .addCase(updatePrimary.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePrimary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(updatePrimary.fulfilled, (state) => {
        state.loading = false;
        state.confirmAlertOpen = false;
      });
  },
});
