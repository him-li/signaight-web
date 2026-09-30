import { createSlice } from "@reduxjs/toolkit";
import { ProjectsState } from "./projects.types";
import { fetchProjects, addProject } from "./projects.actions";
import { sortingStrings } from "@/constants";

export const initialProjectsState: ProjectsState = {
  projects: [],
  selectedProject: null,
  addProjectModalOpen: false,
  loading: false,
  error: null,
  searchQuery: {
    title__like: "",
    description__like: "",
    order_by: sortingStrings.created_at_asc,
  },
  projectsListPageSize: 5,
  projectsListTotal: 0,
  projectsListTotalPages: 0,
  isRecalculating: false,
  platform: "",
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState: initialProjectsState,
  reducers: {
    clearProjects: (state) => {
      state.projects = [];
    },
    getAllProjects: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      state.projects;
    },
    sortProjects: (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sortByKey = (key: string) => (a: any, b: any) =>
        a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;

      if (action.payload === "title") {
        const sorted = state.projects.sort(sortByKey("title"));
        state.projects = sorted;
      } else if (action.payload === "created_at") {
        const sorted = state.projects.sort(sortByKey("created_at"));
        state.projects = sorted;
      } else if (action.payload === "updated_at") {
        const sorted = state.projects.sort(sortByKey("updated_at"));
        state.projects = sorted;
      }
    },
    includeSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    editSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    resetSelectedProject: (state) => {
      state.selectedProject = null;
    },
    openAddProject: (state) => {
      state.addProjectModalOpen = true;
    },
    closeAddProject: (state) => {
      state.addProjectModalOpen = false;
    },
    includeSearchQuery: (state, action) => {
      const { payload } = action;
      state.searchQuery = { ...state.searchQuery, ...payload };
    },
    resetSearchQuery: (state) => {
      state.searchQuery = {
        ...state.searchQuery,
        title__like: "",
        description__like: "",
      };
    },
    changePageSize: (state, action) => {
      state.projectsListPageSize = action.payload;
    },
    resetPageSize: (state) => {
      state.projectsListPageSize = 5;
    },
    setRecalculationStatus: (state, action) => {
      state.isRecalculating = action.payload;
    },
    setPlatform: (state, action) => {
      state.platform = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload?.items ?? [];
        state.projectsListPageSize = action.payload?.size ?? 0;
        state.projectsListTotal = action.payload?.total ?? 0;
        state.projectsListTotalPages = action.payload?.pages ?? 0;
        state.loading = false;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.selectedProject = action.payload;
      });
  },
});
