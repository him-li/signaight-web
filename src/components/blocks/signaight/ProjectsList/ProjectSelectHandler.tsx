import { useCallback, useEffect } from "react";
import { useSearchParamsState } from "@/contexts/searchParamsContext/SearchParamsContext";
import { useAppDispatch } from "@/store/store";
import { includeSelectedProject, getProjectById } from "@/store/projectsSlice";
import { replicateFromProject } from "@/store/subjectsSlice";

export default function ProjectSelectHandler() {
  const dispatch = useAppDispatch();

  const { currentItem } = useSearchParamsState();
  const handleProjectSelect = useCallback(
    async (projectId: string) => {
      try {
        const action = await dispatch(getProjectById(projectId));
        const project = action?.payload;
        if (!project) return;

        dispatch(includeSelectedProject(project));
        dispatch(replicateFromProject(projectId));
      } catch (err) {
        console.error("Failed to load project:", err);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (currentItem) {
      handleProjectSelect(currentItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItem]);

  return null;
}
