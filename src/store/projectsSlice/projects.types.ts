import type { Project, ProjectQuery } from "@/types/project.interface";

export interface ProjectsState {
  projects: Project[];
  selectedProject: Project | null;
  addProjectModalOpen: boolean;
  loading: boolean;
  error: string | null;
  searchQuery: ProjectQuery;
  projectsListPageSize: number;
  projectsListTotal: number;
  projectsListTotalPages: number;
  isRecalculating: boolean;
  platform: string;
}
