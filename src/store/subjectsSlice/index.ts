"use client";
import { subjectsSlice as slice } from "./subjects.slice";
import {
  selectSubjectsState as selector,
  selectCurrentSubjectDataImg,
  selectCurrentSubjectDataLanguages,
  selectCurrentSubjectDataFbProfile,
  selectCurrentSubjectDataIgProfile,
  selectCurrentSubjectDataLiProfile,
  selectCurrentSubjectDataTwProfile,
  selectCurrentSubjectDataXingProfile,
  selectCurrentSubjectDataBirthdate,
  selectCurrentSubjectDataMaritalStatus,
  selectCurrentProjectRankingData,
  selectSubjectsSearchQueryOrderData,
  selectCurrentSubjectData,
  selectCurrentSubjectDataEmail,
  selectCurrentSubjectDataEmailList,
  selectCurrentSubjectDataLocation,
} from "./subjects.selectors";
import { subjectActions } from "./subjects.actions";
import { SubjectsState as stateType } from "./subjects.types";

export const subjectsSlice = slice;

export const selectSubjectsState = selector;

export const selectCurrentSubject = selectCurrentSubjectData;
export const selectCurrentSubjectImg = selectCurrentSubjectDataImg;
export const selectCurrentSubjectLanguages = selectCurrentSubjectDataLanguages;
export const selectCurrentSubjectFbProfile = selectCurrentSubjectDataFbProfile;
export const selectCurrentSubjectIgProfile = selectCurrentSubjectDataIgProfile;
export const selectCurrentSubjectLiProfile = selectCurrentSubjectDataLiProfile;
export const selectCurrentSubjectTwProfile = selectCurrentSubjectDataTwProfile;
export const selectCurrentSubjectXingProfile =
  selectCurrentSubjectDataXingProfile;
export const selectCurrentSubjectBirthdate = selectCurrentSubjectDataBirthdate;
export const selectCurrentSubjectMaritalStatus =
  selectCurrentSubjectDataMaritalStatus;
export const selectCurrentProjectRanking = selectCurrentProjectRankingData;
export const selectSubjectsSearchQueryOrder =
  selectSubjectsSearchQueryOrderData;
export const selectCurrentSubjectEmail = selectCurrentSubjectDataEmail;
export const selectCurrentSubjectEmailList = selectCurrentSubjectDataEmailList;
export const selectCurrentSubjectLocation = selectCurrentSubjectDataLocation;

export type subjectsState = stateType;

export const {
  addSubject,
  addSubjectFile,
  fetchSubjects,
  getSubjectById,
  getCurrentSubjectRedFlagstById,
  updateSubject,
  patchSubject,
  patchSubjectComment,
  uploadProfilePicture,
  getCurrentPersonEvaluation,
  getCurrentPersonAlerts,
  getCurrentPersonWebSearch,
  getAllInfo,
  getSelectAll,
  getRankingInfo,
  deletePerson,
  getSubjectAnalysis,
} = subjectActions;

export const {
  setIsAllSelected,
  includeSearchQuery,
  resetSearchQuery,
  includeSelectedSubject,
  resetProjectSelectedSubjects,
  replicateFromProject,
  includeCurrentSubjectData,
  resetCurrentSubjectData,
  setcurrentSubjectEvaluation,
  setcurrentSubjectAlerts,
  setCurrentPersonWebSearch,
  changeEvaluationDashPage,
  activateCardView,
  deactivateCardView,
  setSubjectAnalysis,
  setCurrentSubjectRedFlags,
} = subjectsSlice.actions;
