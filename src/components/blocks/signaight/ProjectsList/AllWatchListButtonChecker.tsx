import { useCallback } from "react";
import { Button } from "@heroui/react";
import { ALL_PROJECTS } from "@/constants/projects";
import {
  useSearchParamsActions,
  useSearchParamsState,
} from "@/contexts/searchParamsContext/SearchParamsContext";
import { useAppDispatch } from "@/store/store";
import { includeSelectedProject } from "@/store/projectsSlice";
import { replicateFromProject } from "@/store/subjectsSlice";
import { usePermissionsState } from "@/contexts/permissionsContext/PermissionsContext";

export default function AllWatchListButton() {
  const dispatch = useAppDispatch();
  const { setItemQuery } = useSearchParamsActions();
  const { currentItem } = useSearchParamsState();
  const { allWatchlistAllow } = usePermissionsState();

  const handleProjectSelect = useCallback(
    (projectId: string, projectTitle: string, createdAt?: Date) => {
      dispatch(
        includeSelectedProject({
          id: projectId,
          title: projectTitle,
          created_at: createdAt,
        }),
      );
      dispatch(replicateFromProject(projectId));
    },
    [dispatch],
  );

  if (allWatchlistAllow) {
    return (
      <Button
        variant={currentItem === ALL_PROJECTS ? "primary" : "ghost"}
        onPress={() => {
          setItemQuery(ALL_PROJECTS);
          handleProjectSelect(ALL_PROJECTS, "All Projects");
        }}
        className="min-w-full h-10 ease-in-out duration-300 text-center"
      >
        All Watchlists
      </Button>
    );
  }
  return null;
}
