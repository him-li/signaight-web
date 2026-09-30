/* eslint-disable @typescript-eslint/no-unused-expressions */
import { AppState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";
import { getPersonAvatar } from "@/utils/getPersonAvatar";

export const selectSubjectsState = (state: AppState) => state.subjects;

export const selectCurrentSubjectData = (state: AppState) =>
  state.subjects.currentSubjectData;
export const selectCurrentSubjectProfilePhotoData = (state: AppState) =>
  state.subjects.currentSubjectData?.personal_details?.visuals?.profile_photo;
export const selectCurrentSelectedSubjectsData = (state: AppState) =>
  state.subjects.currentSelectedSubjects;
export const selectSearchQueryData = (state: AppState) =>
  state.subjects.searchQuery;
export const selectSearchQueryScoreGteData = (state: AppState) =>
  state.subjects.searchQuery.signaight_score__gte;
export const selectSearchQueryScoreLtData = (state: AppState) =>
  state.subjects.searchQuery.signaight_score__lt;
export const selectSearchQueryScoreLteData = (state: AppState) =>
  state.subjects.searchQuery.signaight_score__lte;
export const selectCurrentSubjectAlerts = (state: AppState) =>
  state.subjects.currentSubjectAlerts;
export const selectCurrentSubjectGeoTrace = (state: AppState) =>
  state.subjects.currentSubjectData?.geo_trace;
export const selectCurrentSubjectEvaluation = (state: AppState) =>
  state.subjects.currentSubjectEvaluation;
export const selectEvaluationDashPage = (state: AppState) =>
  state.subjects.evaluationDashPage;
export const selectLoadingSubjectData = (state: AppState) =>
  state.subjects.loading;
export const selectLoadingSubjectsData = (state: AppState) =>
  state.subjects.subjectsLoading;
export const selectProjectSubjectsBasicInfo = (state: AppState) =>
  state.subjects.projectSubjectsBasicInfo;

export const selectCurrentSubjectDataImg = createSelector(
  (state: AppState) => state.subjects.currentSubjectData,
  (currentSubjectData) =>
    getPersonAvatar(
      currentSubjectData?.personal_details?.visuals?.profile_photo,
    ),
);

export const selectCurrentSubjectDataLocation = (state: AppState) =>
  state.subjects.currentSubjectData?.personal_details?.location;
export const selectCurrentSubjectDataEmail = createSelector(
  (state: AppState) =>
    state.subjects.currentSubjectData?.personal_details?.email,
  (email) =>
    email?.email_address?.[0] ??
    email?.linkedin_email_address ??
    email?.fb_email_address ??
    email?.xing_business_email ??
    email?.xing_private_email ??
    email?.apple_email ??
    "",
);

export const selectCurrentSubjectDataEmailList = createSelector(
  (state: AppState) =>
    state.subjects.currentSubjectData?.personal_details?.email,
  (email) => {
    const emailList = [];
    email?.email_address?.[0]
      ? emailList.push({ type: "primary", value: email?.email_address?.[0] })
      : "";
    email?.linkedin_email_address
      ? emailList.push({
          type: "linkedin",
          value: email?.linkedin_email_address,
        })
      : "";
    email?.fb_email_address
      ? emailList.push({ type: "facebook", value: email?.fb_email_address })
      : "";
    email?.xing_business_email
      ? emailList.push({
          type: "xing_business",
          value: email?.xing_business_email,
        })
      : "";
    email?.xing_private_email
      ? emailList.push({
          type: "xing_business",
          value: email?.xing_private_email,
        })
      : "";
    email?.apple_email
      ? emailList.push({ type: "apple", value: email?.apple_email })
      : "";
    return emailList;
  },
);

export const selectCurrentSubjectDataLanguages = createSelector(
  (state: AppState) => state.subjects.currentSubjectData,
  (currentSubjectData) =>
    currentSubjectData?.personal_details?.languages?.languages ??
    currentSubjectData?.personal_details?.languages?.li_languages ??
    currentSubjectData?.personal_details?.languages?.fb_languages ??
    [],
);

export const selectCurrentSubjectDataFbProfile = createSelector(
  (state: AppState) => state.subjects.currentSubjectData,
  (currentSubjectData) =>
    currentSubjectData?.personal_details?.visuals?.profile_photo
      ?.facebook_profile_picture ||
    currentSubjectData?.network_signature?.user_id?.facebook_user_id,
);

export const selectCurrentSubjectDataIgProfile = createSelector(
  (state: AppState) => state.subjects.currentSubjectData,
  (currentSubjectData) =>
    currentSubjectData?.personal_details?.visuals?.profile_photo
      ?.instagram_profile_picture ||
    currentSubjectData?.network_signature?.user_id?.instagram_user_id,
);

export const selectCurrentSubjectDataLiProfile = createSelector(
  (state: AppState) => state.subjects.currentSubjectData,
  (currentSubjectData) =>
    currentSubjectData?.personal_details?.visuals?.profile_photo
      ?.linkedin_profile_picture,
);

export const selectCurrentSubjectDataTwProfile = createSelector(
  (state: AppState) => state.subjects.currentSubjectData,
  (currentSubjectData) =>
    currentSubjectData?.personal_details?.visuals?.profile_photo
      ?.twitter_profile_picture,
);

export const selectCurrentSubjectDataXingProfile = createSelector(
  (state: AppState) => state.subjects.currentSubjectData,
  (currentSubjectData) =>
    currentSubjectData?.personal_details?.visuals?.profile_photo
      ?.xing_profile_picture,
);

export const selectCurrentSubjectDataBirthdate = createSelector(
  (state: AppState) => state.subjects.currentSubjectData,
  (currentSubjectData) =>
    currentSubjectData?.personal_details?.birth_year_birthday?.birthday
      ?.birthday ??
    currentSubjectData?.personal_details?.birth_year_birthday?.birthday
      ?.linkedin_birthday ??
    currentSubjectData?.personal_details?.birth_year_birthday?.birthday
      ?.fb_birthday ??
    currentSubjectData?.personal_details?.birth_year_birthday?.birthday
      ?.fb_birth_date ??
    currentSubjectData?.personal_details?.birth_year_birthday?.birthday
      ?.fb_birth_year ??
    currentSubjectData?.personal_details?.birth_year_birthday?.birthday
      ?.goodreads_birth_date ??
    currentSubjectData?.personal_details?.birth_year_birthday?.birthday
      ?.deezer_birth_date,
);

export const selectCurrentSubjectDataMaritalStatus = createSelector(
  (state: AppState) => state.subjects.currentSubjectData,
  (currentSubjectData) =>
    currentSubjectData?.biographic_details?.marital_status_relatives
      ?.marital_status ??
    currentSubjectData?.biographic_details?.marital_status_relatives
      ?.fb_marital_status,
);

export const selectCurrentProjectRankingData = (state: AppState) =>
  state.subjects.subjectRanking;

export const selectCurrentSubjectAnalysis = createSelector(
  (state: AppState) => state.subjects.subjectAnalysis,
  (subjectAnalysis) => ({
    searchingStatus: {
      search_running: subjectAnalysis?.search_running,
      search_done: subjectAnalysis?.search_done,
      search_error: subjectAnalysis?.search_error,
      search_timeout: subjectAnalysis?.search_timeout,
      total: subjectAnalysis?.total,
    },
    scoreRange: {
      total: subjectAnalysis?.total,
      score_0_10: subjectAnalysis?.score_0_10,
      score_10_20: subjectAnalysis?.score_10_20,
      score_20_30: subjectAnalysis?.score_20_30,
      score_30_40: subjectAnalysis?.score_30_40,
      score_40_50: subjectAnalysis?.score_40_50,
      score_50_60: subjectAnalysis?.score_50_60,
      score_60_70: subjectAnalysis?.score_60_70,
      score_70_80: subjectAnalysis?.score_70_80,
      score_80_90: subjectAnalysis?.score_80_90,
      score_90_100: subjectAnalysis?.score_90_100,
    },
    compatibilities: {
      "High Compatibility": subjectAnalysis?.high_compatibility,
      "Medium Compatibility": subjectAnalysis?.medium_compatibility,
      "Low Compatibility": subjectAnalysis?.low_compatibility,
      Disqualified: subjectAnalysis?.disqualified,
    },
  }),
);

export const selectSubjectsSearchQueryOrderData = (state: AppState) =>
  state.subjects.searchQuery?.order_by;
export const selectDisplayMode = (state: AppState) => state.subjects.cardView;
export const selectExporting = (state: AppState) => state.subjects.exporting;
export const selectExportError = (state: AppState) =>
  state.subjects.exportingError;
export const selectIsAllSelected = (state: AppState) =>
  state.subjects.isAllSelected;
export const selectWebSearch = (state: AppState) => state.subjects.webSearch;
export const selectCurrentSubjectRedFlags = (state: AppState) =>
  state.subjects.currentSubjectRedFlags;
