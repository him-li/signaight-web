/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  useState,
  useCallback,
  createContext,
  PropsWithChildren,
  useMemo,
  useContext,
} from "react";
import { IGetGraphData, ProjectLinkAnalysisContextProps } from "./types";
import { useAppSelector } from "@/store/store";
import { toast } from "@heroui/react";
import { AxiosError } from "axios";
import LinkAnalysisService from "@/services/linkAnalysisService";
import { getTokenSelector } from "@/store/authSlice/auth.slice";

const actionsList = {
  getGraphData: (_d: IGetGraphData) => {},
};

const ProjectLinkAnalysisStateContext =
  createContext<ProjectLinkAnalysisContextProps>({
    graphData: null,
    loading: false,
  });

const ProjectLinkAnalysisActionsContext = createContext(actionsList);

type ProjectLinkAnalysisProviderProps = { projectId: string };

const ProjectLinkAnalysisProvider: React.FC<
  PropsWithChildren<ProjectLinkAnalysisProviderProps>
> = ({ children, projectId }) => {
  const token = useAppSelector(getTokenSelector);
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getGraphData = useCallback(
    async (params: IGetGraphData) => {
      try {
        setLoading(true);
        const data = await LinkAnalysisService.getLinkAnalysis(token!, {
          project_id: params.selectedKeys === "all" ? projectId : undefined,
          selected_persons:
            params.selectedKeys === "all"
              ? undefined
              : (Array.from(params.selectedKeys) as string[]),
          edge_types: params.edge_types,
          node_types: params.nodes_type,
          min_degree: params.min_degree,
          connection_type: params.connection_type,
        });
        setGraphData(data.result);
      } catch (e) {
        const error = e as AxiosError;
        console.error(error);
        toast.danger(error.name, {
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    },
    [projectId],
  );

  const value = useMemo(
    () => ({
      graphData,
      loading,
    }),
    [graphData, loading],
  );

  const actions = useMemo(() => ({ getGraphData }), [getGraphData]);

  return (
    <ProjectLinkAnalysisActionsContext.Provider value={actions}>
      <ProjectLinkAnalysisStateContext.Provider value={value}>
        {children}
      </ProjectLinkAnalysisStateContext.Provider>
    </ProjectLinkAnalysisActionsContext.Provider>
  );
};

function useProjectLinkAnalysisState() {
  const context = useContext(ProjectLinkAnalysisStateContext);
  if (context === undefined) {
    throw new Error(
      "useProjectLinkAnalysisState must be used within a ProjectLinkAnalysisProvider",
    );
  }
  return context;
}
function useProjectLinkAnalysisActions() {
  const context = useContext(ProjectLinkAnalysisActionsContext);
  if (context === undefined) {
    throw new Error(
      "useProjectLinkAnalysisActions must be used within a ProjectLinkAnalysisProvider",
    );
  }
  return context;
}

export default ProjectLinkAnalysisProvider;

export { useProjectLinkAnalysisState, useProjectLinkAnalysisActions };
