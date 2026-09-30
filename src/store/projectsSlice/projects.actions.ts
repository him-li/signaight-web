import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ProjectsServices from "@/services/projectsService";
import { editSelectedProject } from "@/store/projectsSlice";
import { toast } from "@heroui/react";
import type { AppState } from "@/store/store";
import type { Project, ProjectPNR } from "@/types/project.interface";
import { getLayoutName } from "@/utils/layout";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (any, { getState }) => {
    const store = getState() as AppState;
    const token = store.auth.token;
    const filters = store.projects.searchQuery;
    const page = parseInt(sessionStorage.getItem("currentPage") ?? "1");
    const pageSize = store.projects.projectsListPageSize;
    const platform = getLayoutName()!;
    const data = await ProjectsServices.getProjects({
      token,
      searchQuery: filters,
      page,
      pageSize,
      platform,
    });
    return data;
  },
);

export const getProjectById = createAsyncThunk(
  "projects/getProjectById",
  async (projectId: string, store) => {
    const token = (store.getState() as AppState).auth.token;
    const data = await ProjectsServices.getProject(projectId, token);
    return data;
  },
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (
    {
      title,
      description,
      platform,
      pnr_data,
    }: {
      title: string;
      description?: string;
      platform: string;
      pnr_data?: ProjectPNR;
    },
    { getState, rejectWithValue },
  ) => {
    const token = (getState() as AppState).auth.token;
    try {
      const data = await ProjectsServices.addProject(
        title,
        description,
        platform,
        pnr_data,
        token,
      );
      toast.success("Success", {
        description: "Project added successfully",
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

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id: string, { getState, rejectWithValue }) => {
    const token = (getState() as AppState).auth.token;
    try {
      const data = await ProjectsServices.deleteProject(id, token);
      return data;
    } catch (error) {
      const e = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  },
);

export const updateProject = createAsyncThunk(
  "subjects/updateProject",
  async (
    { id, project }: { id: string; project: Project },
    { getState, rejectWithValue, dispatch },
  ) => {
    const token = (getState() as AppState).auth.token;
    try {
      const data = await ProjectsServices.updateProject(id, project, token);
      dispatch(editSelectedProject(data));
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

export const projectsActions = {
  fetchProjects,
  getProjectById,
  addProject,
  deleteProject,
  updateProject,
};
