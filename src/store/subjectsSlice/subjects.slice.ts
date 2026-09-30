import type { ProjectSelectedSubjects, SubjectsState } from "./subjects.types";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSubjects,
  getSelectAll,
  getLeaderboardInfo,
  uploadProfilePicture,
  getRankingInfo,
  getAllInfo,
  getSubjectAnalysis,
  exportSubjects,
} from "./subjects.actions";
import { searchPersonsQuery } from "@/constants/search";
import { initialSubjectsState } from "./initState";

export const subjectsSlice = createSlice({
  name: "subjects",
  initialState: initialSubjectsState,
  reducers: {
    setIsAllSelected: (state, action) => {
      const { payload } = action;
      state.isAllSelected = payload;
    },
    includeSearchQuery: (state, action) => {
      const { payload } = action;
      state.searchQuery = { ...state.searchQuery, ...payload };
    },
    resetSearchQuery: (state: SubjectsState) => {
      delete state.searchQuery.status__in;
      delete state.searchQuery.compatibility__in;
      state.searchQuery = searchPersonsQuery;
    },
    includeSelectedSubject: (state, action) => {
      const project_id = action.payload.project_id;
      const subject = JSON.parse(action.payload.subject);

      const foundProject = state.allProjectsSelectedSubjects.findIndex(
        (project: ProjectSelectedSubjects) => project.project_id == project_id,
      );
      if (foundProject === -1) {
        const projectObj = {
          project_id: project_id,
          subjects: [subject],
        };
        state.allProjectsSelectedSubjects.push(projectObj);
        state.currentSelectedSubjects.push(subject);
      } else {
        state.allProjectsSelectedSubjects[foundProject].subjects.push(subject);
        state.currentSelectedSubjects =
          state.allProjectsSelectedSubjects[foundProject].subjects;
      }
    },
    resetProjectSelectedSubjects: (state, action) => {
      const project_id = action.payload;
      const filteredProjects = state.allProjectsSelectedSubjects.filter(
        (project: ProjectSelectedSubjects) => project.project_id !== project_id,
      );
      state.allProjectsSelectedSubjects = filteredProjects;
      state.currentSelectedSubjects = [];
    },
    replicateFromProject: (state, action) => {
      const project_id = action.payload;
      const projectSelectedSubjects = state.allProjectsSelectedSubjects.find(
        (project: ProjectSelectedSubjects) => project.project_id == project_id,
      )?.subjects;

      if (projectSelectedSubjects)
        state.currentSelectedSubjects = projectSelectedSubjects;
      else state.currentSelectedSubjects = [];
    },
    includeCurrentSubjectData: (state, action) => {
      const next = action.payload;
      state.currentSubjectData = next;
    },
    resetCurrentSubjectData: (state) => {
      state.currentSubjectData = null;
    },
    setcurrentSubjectEvaluation: (state, action) => {
      state.currentSubjectEvaluation = action.payload;
    },
    setcurrentSubjectAlerts: (state, action) => {
      state.currentSubjectAlerts = action.payload;
    },
    setCurrentPersonWebSearch: (state, action) => {
      state.webSearch = action.payload;
    },
    setCurrentSubjectRedFlags: (state, action) => {
      state.currentSubjectRedFlags = action.payload;
    },
    changeEvaluationDashPage: (state, action) => {
      state.evaluationDashPage = action.payload;
    },
    //TODO: what is this
    setSubjectAnalysis: (state, action) => {
      state.subjectAnalysis = action.payload;
    },
    activateCardView: (state) => {
      state.cardView = true;
    },
    deactivateCardView: (state) => {
      state.cardView = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.subjectsLoading = true;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.subjectsLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.subjects = action.payload!.items;
        state.subjectListPage = action.payload!.page;
        state.subjectListPageSize = action.payload!.size;
        state.subjectListTotal = action.payload!.total;
        state.subjectListTotalPages = action.payload!.pages;
        state.subjectsLoading = false;
      })
      .addCase(exportSubjects.pending, (state) => {
        state.exporting = true;
      })
      .addCase(exportSubjects.rejected, (state, action) => {
        state.exporting = false;
        state.exportingError = action.error.message!;
      })
      .addCase(exportSubjects.fulfilled, (state) => {
        state.exporting = false;
      })
      .addCase(getSelectAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSelectAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(getSelectAll.fulfilled, (state: SubjectsState, action) => {
        const project_id = action.payload.project;
        const newSubjects = action.payload.items;

        const foundProjectIndex = state.allProjectsSelectedSubjects.findIndex(
          (project) => project.project_id === project_id,
        );

        if (foundProjectIndex === -1) {
          state.allProjectsSelectedSubjects.push({
            project_id: project_id,
            subjects: newSubjects,
          });
        } else {
          state.allProjectsSelectedSubjects[foundProjectIndex].subjects =
            newSubjects;
        }

        state.currentSelectedSubjects = newSubjects;
        state.loading = false;
      })
      .addCase(getLeaderboardInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLeaderboardInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(getLeaderboardInfo.fulfilled, (state, action) => {
        state.totalRisks = action.payload?.risks;
        state.totalAnalyzed = action.payload?.analyzed;
        state.totalPersons = action.payload?.total_subjects;
        state.totalRedFlags = action.payload?.red_flags;
        state.loading = false;
      })
      .addCase(uploadProfilePicture.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(uploadProfilePicture.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getAllInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.projectSubjectsBasicInfo = action.payload;
      })
      .addCase(getAllInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(getAllInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRankingInfo.fulfilled, (state, action) => {
        state.subjectRanking = action.payload;
        state.loading = false;
      })
      .addCase(getRankingInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRankingInfo.rejected, (state, action) => {
        state.error = action.error.message!;
        state.loading = false;
      })
      .addCase(getSubjectAnalysis.fulfilled, (state, action) => {
        state.subjectAnalysis = action.payload;
        state.loading = false;
      })
      .addCase(getSubjectAnalysis.rejected, (state, action) => {
        state.error = action.error.message!;
        state.loading = false;
      });
  },
});
