import { IPagination } from "@/types/tables.interface";
import { ActionMap } from "../types";
import { Project, ProjectQuery } from "@/types/project.interface";

export type ProjectContextProps = {
  projects: Project[];
  loading: boolean;
  pagination: IPagination;
  searchQuery: {
    title__like: string;
    description__like: string;
    order_by: string;
  };
};

export enum ProjectContextTypes {
  SET_PROJECTS = "SET_PROJECTS",
  SET_LOADING = "SET_LOADING",
  SET_SEARCH_QUERY = "SET_SEARCH_QUERY",
}

export type ProjectContextPayload = {
  [ProjectContextTypes.SET_PROJECTS]: {
    data: { items: ProjectContextProps["projects"] } & IPagination;
    isAdd: boolean;
  };
  [ProjectContextTypes.SET_LOADING]: {
    data: ProjectContextProps["loading"];
  };
  [ProjectContextTypes.SET_SEARCH_QUERY]: {
    data: ProjectContextProps["searchQuery"];
  };
};

export type ProjectActions =
  ActionMap<ProjectContextPayload>[keyof ActionMap<ProjectContextPayload>];

export type IProjectSearchParams = {
  page: number;
  isAdd: boolean;
  withoutCache?: boolean;
  searchParams?: ProjectQuery;
};
