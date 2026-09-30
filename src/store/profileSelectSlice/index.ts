import {
  profileSelectSlice as slice,
  initialProfileSelectState as initialState,
} from "./profileSelect.slice";
import { selectProfileSelectState as selector } from "./profileSelect.selectors";
import { profileSelectActions } from "./profileSelect.actions";
import { ProfileSelectState as stateType } from "./profileSelect.types";

export const profileSelectSlice = slice;

export const initialProfileSelectState = initialState;

export const selectProfileSelectState = selector;

export type ProfileSelectState = stateType;

export const {
  fetchIdentityExpanderCandidates,
  fetchCandidates,
  fetchSearch,
  fetchSubject,
  updatePrimary,
  createCandidate,
} = profileSelectActions;

export const {
  setProfileSelectOpen,
  setProfileSelectClose,
  setFlows,
  moveNextFlow,
  getCurrentFlow,
  setPersons,
  moveToNextPerson,
  getCurrentPerson,
  resetState,
  setPrimary,
  openAlertConfirm,
  closeAlertConfirm,
  includeSubjectData,
} = profileSelectSlice.actions;
