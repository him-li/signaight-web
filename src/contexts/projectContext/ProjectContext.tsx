/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type FC,
  type PropsWithChildren,
} from "react";
import { ProjectReducer, initProjectState } from "./reducer";
import {
  IProjectSearchParams,
  ProjectContextProps,
  ProjectContextTypes,
} from "./types";
import type { Project } from "@/types/project.interface";
import ProjectsService from "@/services/projectsService";
import { useAppSelector } from "@/store/store";
import { getTokenSelector } from "@/store/authSlice/auth.slice";
import { toast } from "@heroui/react";
import { IPagination } from "@/types/tables.interface";
import { useLayoutState } from "../layoutContext/LayoutContext";

const actionsList = {
  getProjects: (d: IProjectSearchParams) => {},
};

const ProjectStateContext = createContext<ProjectContextProps>({
  ...initProjectState,
});

const ProjectActionsContext = createContext(actionsList);

type ProjectProviderProps = { projects: Project[]; pagination: IPagination };

const ProjectProvider: FC<PropsWithChildren<ProjectProviderProps>> = ({
  children,
  projects,
  pagination,
}) => {
  const [state, dispatch] = useReducer(ProjectReducer, initProjectState);
  const { layoutName } = useLayoutState();
  const token = useAppSelector(getTokenSelector);
  const cacheRef = useRef<{ [it: string]: Project[] }>({});

  const getProjects = useCallback(
    async ({
      page,
      isAdd,
      withoutCache,
      searchParams = {},
    }: IProjectSearchParams) => {
      if (withoutCache) {
        cacheRef.current = {};
      }
      try {
        dispatch({
          type: ProjectContextTypes.SET_LOADING,
          payload: { data: true },
        });
        let data = null;
        const key = page;
        if (cacheRef.current?.[key]) {
          data = cacheRef.current?.[key];
        } else {
          data = await ProjectsService.getProjects({
            token,
            page,
            searchQuery: { ...state.searchQuery, ...searchParams },
            pageSize: pagination.size,
            platform: layoutName,
          });
          cacheRef.current = {
            ...(cacheRef.current ?? {}),
            [key]: data,
          };
          dispatch({
            type: ProjectContextTypes.SET_PROJECTS,
            payload: { data, isAdd },
          });
        }
      } catch (error) {
        toast.danger("Something went wrong. Please try again.");
      } finally {
        dispatch({
          type: ProjectContextTypes.SET_LOADING,
          payload: { data: false },
        });
      }
    },
    [layoutName, pagination.size, state.searchQuery, token],
  );

  useEffect(() => {
    dispatch({
      type: ProjectContextTypes.SET_PROJECTS,
      payload: { data: { items: projects, ...pagination }, isAdd: false },
    });
    dispatch({
      type: ProjectContextTypes.SET_LOADING,
      payload: { data: false },
    });
  }, [projects, pagination]);

  const value = useMemo(() => state, [state]);

  const actions = useMemo(() => ({ getProjects }), [getProjects]);

  return (
    <ProjectActionsContext.Provider value={actions}>
      <ProjectStateContext.Provider value={value}>
        {children}
      </ProjectStateContext.Provider>
    </ProjectActionsContext.Provider>
  );
};

function useProjectState() {
  const context = useContext(ProjectStateContext);
  if (context === undefined) {
    throw new Error("useProjectState must be used within a ProjectProvider");
  }
  return context;
}
function useProjectActions() {
  const context = useContext(ProjectActionsContext);
  if (context === undefined) {
    throw new Error("useProjectActions must be used within a ProjectProvider");
  }
  return context;
}

export default ProjectProvider;

export { useProjectState, useProjectActions };
