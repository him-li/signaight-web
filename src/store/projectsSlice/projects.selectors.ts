import { AppState } from "@/store/store";
import type { Project } from "@/types/project.interface";
import { createSelector } from "@reduxjs/toolkit";

export const selectProjectsState = (state: AppState) => state.projects;

export const selectCurrentProjectIdData = createSelector(
  (state: AppState) => state.projects.selectedProject,
  (selectedProject: Project | null) => selectedProject?.id,
);
export const selectProjectList = (state: AppState): Project[] =>
  state.projects.projects;
export const selectSelectedProject = (state: AppState) =>
  state.projects.selectedProject;
export const selectLoadingProjectsList = (state: AppState) =>
  state.projects.loading;
export const selectSearchQuery = (state: AppState) => state.projects.searchQuery;
export const selectIsRecalculatingStastus = (state: AppState) =>
  state.projects.isRecalculating;
