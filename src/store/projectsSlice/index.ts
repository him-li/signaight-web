"use client";
import {
  projectsSlice as slice,
  initialProjectsState as initialState,
} from "./projects.slice";
import {
  selectProjectsState as selector,
  selectCurrentProjectIdData,
} from "./projects.selectors";
import { projectsActions } from "./projects.actions";
import { ProjectsState as stateType } from "./projects.types";

export const projectsSlice = slice;

export const initialProjectsState = initialState;

export const selectProjectsState = selector;

export const selectCurrentProjectId = selectCurrentProjectIdData;

export type ProjectsState = stateType;

export const {
  addProject,
  getProjectById,
  fetchProjects,
  updateProject,
  deleteProject,
} = projectsActions;

export const {
  clearProjects,
  getAllProjects,
  sortProjects,
  includeSelectedProject,
  editSelectedProject,
  resetSelectedProject,
  openAddProject,
  closeAddProject,
  includeSearchQuery,
  resetSearchQuery,
  changePageSize,
  resetPageSize,
  setRecalculationStatus,
  setPlatform,
} = projectsSlice.actions;
