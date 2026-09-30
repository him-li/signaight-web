import { AppState } from "@/store/store";
import { getPersonName } from "@/utils/getPersonName";
import { getPersonAvatar } from "@/utils/getPersonAvatar";
export const selectProfileSelectState = (state: AppState) =>
  state.profileSelect;

export const selectProfileSelectPrimaryId = (state: AppState) =>
  state.profileSelect.primaryId;
export const selectProfileSelectProfileSelected = (state: AppState) =>
  state.profileSelect.profileSelected;
export const selectProfileSelectSubjectData = (state: AppState) =>
  state.profileSelect.subjectData;
export const selectProfileSelectSubjectDataId = (state: AppState) =>
  state.profileSelect.subjectData?.id;
export const selectProfileSelectSubjectDataFullName = (state: AppState) =>
  getPersonName(
    state.profileSelect.subjectData?.personal_details?.name,
    "full_name",
  );
export const selectProfileSelectCandidates = (state: AppState) =>
  state.profileSelect.candidates;
export const selectIdentityExpanderCandidates = (state: AppState) =>
  state.profileSelect.identityExpanderCandidates;
export const selectProfileSelectFlowsSource = (state: AppState) =>
  state.profileSelect.flows[0];
export const selectProfileSelectProfilePhoto = (state: AppState) =>
  getPersonAvatar(
    state.profileSelect.subjectData?.personal_details?.visuals?.profile_photo,
  );
