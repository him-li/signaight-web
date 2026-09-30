/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AppState } from "@/store/store";
import PersonsService from "@/services/personsService";
import {
  includeCurrentSubjectData,
  setcurrentSubjectAlerts,
  setcurrentSubjectEvaluation,
  setCurrentPersonWebSearch,
  setCurrentSubjectRedFlags,
} from ".";
import EvaluationServices from "@/services/evaluationService";
import AlertsServices from "@/services/alertsService";
import { toast } from "@heroui/react";
import { Person } from "@/types/person/index.interface";
import { IPagination } from "@/types/tables.interface";
import { IManyPersonsDeleteRequest } from "@/types/requests/manyPersonsDelete";
import { IPersonsRedFlags } from "@/types/responses/personsRedFlags";
import { ALL_PROJECTS } from "@/constants/projects";

export const fetchSubjects = createAsyncThunk(
  "subjects/fetchSubjects",
  async (any, { getState, dispatch }) => {
    const store = getState() as AppState;
    const projectId = store.projects.selectedProject?.id;
    const page = parseInt(sessionStorage.getItem("currentPage") ?? "1");
    const pageSize = store.subjects.subjectListPageSize;
    if (projectId) {
      const filters = store.subjects.searchQuery;
      let data = null;
      try {
        data = await PersonsService.getPersonsByProject({
          project_id: projectId,
          searchQuery: filters,
          token: store.auth.token,
          page,
          pageSize,
        })!;
      } catch (error: any) {
        toast.danger("Get persons error:", { description: error.message });
      }

      dispatch(getLeaderboardInfo());
      dispatch(getSubjectAnalysis());
      return data as {
        items: Person[];
      } & IPagination;
    }
  },
);

export const exportSubjects = createAsyncThunk(
  "subjects/exportSubjects",
  async (selectedUsers: string[], { getState }) => {
    const store = getState() as AppState;
    const projectId = store.projects.selectedProject?.id;
    if (projectId) {
      const filters = store.subjects.searchQuery;
      let data = null;
      try {
        data = await PersonsService.exportPersonsByProject(
          projectId,
          filters,
          store.auth.token,
          selectedUsers,
        );
      } catch (error: any) {
        toast.danger("Get persons error:", { description: error.message });
      }
      return data;
    }
  },
);

//TODO: where do we need this?
export const getSelectAll = createAsyncThunk(
  "subjects/getSelectAll",
  async (any, { getState }) => {
    const store = getState() as AppState;
    const projectId = store.projects.selectedProject?.id;
    if (projectId) {
      const res = await PersonsService.getBasicInfo(
        projectId,
        store.auth.token,
      );
      const data = { items: res, project: projectId } as any;
      return data;
    }
  },
);

export const getAllInfo = createAsyncThunk(
  "subjects/getAllInfo",
  async (any, { getState }) => {
    const store = getState() as AppState;
    const projectId = store.projects.selectedProject?.id;
    if (projectId) {
      const res = await PersonsService.getBasicInfo(
        projectId,
        store.auth.token,
      );
      return res;
    }
  },
);

export const getRankingInfo = createAsyncThunk(
  "subjects/getRankingInfo",
  async (any, store) => {
    const stateStore = store.getState() as AppState;
    const projectId = stateStore.projects.selectedProject?.id;
    if (projectId) {
      const res = await PersonsService.getRanking(
        projectId,
        stateStore.auth.token,
      );
      store.dispatch(getSubjectAnalysis());
      return res;
    }
  },
);

export const getSubjectById = createAsyncThunk(
  "subjects/getSubjectById",
  async (subjectId: any, store) => {
    const token = (store.getState() as AppState).auth.token;
    const data = await PersonsService.getPerson(subjectId, token);
    return data;
  },
);

export const getCurrentSubjectRedFlagstById = createAsyncThunk(
  "subjects/getCurrentSubjectRedFlagstById",
  async (subjectId: string, store) => {
    const token = (store.getState() as AppState).auth.token;
    const data = await PersonsService.getPersonRedFlags(subjectId, token);
    const first = data.items?.[0];

    if (first) {
      const redFlagsObj = { ...first } as Record<string, unknown>;
      delete (redFlagsObj as any)._id;
      delete (redFlagsObj as any).person;

      store.dispatch(
        setCurrentSubjectRedFlags(
          Object.values(redFlagsObj).filter(Boolean) as Omit<
            IPersonsRedFlags,
            "_id" | "person"
          >[],
        ),
      );
    } else {
      store.dispatch(setCurrentSubjectRedFlags([]));
    }

    return data.items;
  },
);

export const getLeaderboardInfo = createAsyncThunk(
  "subjects/getLeaderboardInfo",
  async (any, { getState }) => {
    const store = getState() as AppState;
    const token = store.auth.token;
    const projectId = store.projects.selectedProject?.id;
    const data = await PersonsService.getLeaderboardInfo(
      projectId ?? ALL_PROJECTS,
      token,
    );
    return data;
  },
);

//TODO: delete this when created with active search
export const addSubject = createAsyncThunk(
  "subjects/addSubject",
  async (
    { projectId, person, searchExisting }: any,
    { getState, rejectWithValue },
  ) => {
    const token = (getState() as AppState).auth.token;
    try {
      const data = await PersonsService.addPerson(
        projectId,
        person,
        searchExisting,
        token,
      );
      return data;
    } catch (error) {
      const e = error as AxiosError;
      toast.danger("Error", {
        description: e.response?.statusText || e.message,
      });
      return rejectWithValue(e.response?.data || e.message);
    }
  },
);

export const addSubjectFile = createAsyncThunk(
  "subjects/addSubjectFile",
  async (
    { projectId, fileToUpload, searchExisting }: any,
    { getState, rejectWithValue },
  ) => {
    const token = (getState() as AppState).auth.token;
    try {
      const data = await PersonsService.addPersonByCsv(
        projectId,
        fileToUpload,
        searchExisting,
        token,
      );
      toast.success("Success", {
        description: "Applicants added successfully",
      });
      return data;
    } catch (error) {
      const e = error as AxiosError;
      toast.danger("Error", {
        description: e.response?.statusText || e.message,
      });
      return rejectWithValue(e.response?.data || e.message);
    }
  },
);

export const updateSubject = createAsyncThunk(
  "subjects/updateSubject",
  async (
    { subjectId, subjectDetails }: any,
    { dispatch, getState, rejectWithValue },
  ) => {
    const token = (getState() as AppState).auth.token;
    try {
      const data = await PersonsService.updatePerson(
        subjectId,
        subjectDetails,
        token,
      );
      dispatch(includeCurrentSubjectData(data));
      return data;
    } catch (error) {
      const e = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  },
);

export const patchSubject = createAsyncThunk(
  "subjects/patchSubject",
  async (
    { subjectId, subjectDetails }: any,
    { dispatch, getState, rejectWithValue },
  ) => {
    const token = (getState() as AppState).auth.token;
    try {
      const data = await PersonsService.patchPerson(
        subjectId,
        subjectDetails,
        token,
      );
      dispatch(includeCurrentSubjectData({ ...data, _id: subjectId }));
      toast.success("Success", {
        description: "Applicant updated successfully",
      });
      return data;
    } catch (error) {
      const e = error as AxiosError;
      toast.danger("Error", {
        description: e.response?.statusText || e.message,
      });
      return rejectWithValue(e.response?.data || e.message);
    }
  },
);

export const patchSubjectComment = createAsyncThunk(
  "subjects/patchSubjectComment",
  async ({ subjectId, text }: any, store) => {
    const token = (store.getState() as AppState).auth.token;
    const data = await PersonsService.patchPersonComment(
      subjectId,
      text,
      token,
    );
    return data;
  },
);

//TODO: do we need this?
export const uploadProfilePicture = createAsyncThunk(
  "subjects/uploadProfilePicture",
  async ({ subjectId, fileToUpload }: any, store) => {
    const token = (store.getState() as AppState).auth.token;
    const data = await PersonsService.uploadProfilePicture(
      subjectId,
      fileToUpload,
      token,
    );
    return data;
  },
);

export const getCurrentPersonEvaluation = createAsyncThunk(
  "subjects/getCurrentPersonEvaluation",
  async (subjectId: any, store) => {
    const token = (store.getState() as AppState).auth.token;
    const data = await EvaluationServices.getEvaluationByPersonId(
      subjectId,
      token,
    );
    store.dispatch(setcurrentSubjectEvaluation(data.items[0]));
    return data;
  },
);

export const getCurrentPersonAlerts = createAsyncThunk(
  "subjects/getCurrentPersonAlerts",
  async (subjectId: any, store) => {
    const token = (store.getState() as AppState).auth.token;
    const data = await AlertsServices.getAlertsByPersonId(subjectId, token);
    store.dispatch(setcurrentSubjectAlerts(data.items[0]));
    return data;
  },
);

export const getCurrentPersonWebSearch = createAsyncThunk(
  "subjects/getCurrentPersonWebSearch",
  async (subjectId: string, store) => {
    const token = (store.getState() as AppState).auth.token;
    const data = await PersonsService.getPersonWebSearch(subjectId, token);
    store.dispatch(setCurrentPersonWebSearch(data));
    return data;
  },
);

export const deletePerson = createAsyncThunk(
  "subjects/deletePerson",
  async (subjectId: any, { getState, rejectWithValue }) => {
    const token = (getState() as AppState).auth.token;
    try {
      const data = await PersonsService.deletePersonFromProject(
        subjectId,
        token,
      );

      return data;
    } catch (error) {
      const e = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  },
);
export const deleteManyPersons = createAsyncThunk(
  "subjects/deletePerson",
  async (params: IManyPersonsDeleteRequest, { getState, rejectWithValue }) => {
    const token = (getState() as AppState).auth.token;
    try {
      const data = await PersonsService.deleteManyPersonsFromProject(
        params,
        token,
      );

      return data;
    } catch (error) {
      const e = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  },
);

export const getSubjectAnalysis = createAsyncThunk(
  "subjects/getSubjectAnalysis",
  async (any, store) => {
    const projectId = (store.getState() as AppState).projects.selectedProject
      ?.id;
    const token = (store.getState() as AppState).auth.token;
    if (projectId) {
      const data = await PersonsService.getSubjectAnalysis(projectId, token);
      return data;
    }
  },
);

export const subjectActions = {
  fetchSubjects,
  getSubjectById,
  getCurrentSubjectRedFlagstById,
  updateSubject,
  patchSubject,
  patchSubjectComment,
  addSubject,
  addSubjectFile,
  uploadProfilePicture,
  getCurrentPersonEvaluation,
  getCurrentPersonAlerts,
  getCurrentPersonWebSearch,
  getSelectAll,
  getAllInfo,
  getRankingInfo,
  deletePerson,
  getSubjectAnalysis,
  exportSubjects,
};
