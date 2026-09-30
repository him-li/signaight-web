"use client";
import { Button, Separator, Tooltip } from "@heroui/react";
import dynamic from "next/dynamic";
import { useCallback } from "react";
import { useAppSelector } from "@/store/store";
import { Icons } from "@/components/atoms/Icons";
import { SEARCH_QURIES } from "@/constants/search";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import { selectSelectedProject } from "@/store/projectsSlice/projects.selectors";
import useEditProjectModal from "@/components/blocks/EditProjectModal/useEditProjectModal";
import { selectCurrentProjectId } from "@/store/projectsSlice";
import ProjectLinkAnalysisProvider from "@/contexts/projectLinkAnalisysContext/ProjectLinkAnalysisContext";

const FiltersSubjects = dynamic(
  () => import("@/components/blocks/FilterSubjects/FiltersSubjects"),
  {
    ssr: false,
    loading: () => <></>,
  },
);
const SortSubjects = dynamic(() => import("@/components/atoms/SortSubjects"), {
  ssr: false,
  loading: () => <></>,
});
const ViewSwitch = dynamic(() => import("@/components/atoms/ViewSwitch"), {
  ssr: false,
  loading: () => <></>,
});
const ActionStudio = dynamic(() => import("@/components/blocks/ActionStudio"), {
  loading: () => <div />,
  ssr: false,
});

export default function TableToolbar() {
  const { deleteQueries } = useSearchParamsActions();
  const project = useAppSelector(selectSelectedProject);
  const { modal, state } = useEditProjectModal(project!);
  const projectId = useAppSelector(selectCurrentProjectId);
  const handleReset = useCallback(async () => {
    deleteQueries({ excludeKeys: [SEARCH_QURIES.ITEM] });
  }, [deleteQueries]);

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between items-center-safe w-full p-2">
        <div className="flex flex-col md:flex-row w-fit justify-start items-center-safe gap-2">
          <FiltersSubjects hideCompatibility hideMark />
          <SortSubjects />
          <Button
            onPress={handleReset}
            variant="tertiary"
            className="text-xs text-foreground-500 font-semibold rounded-full"
          >
            <Icons.Undo />
            RESET
          </Button>
        </div>
        <div className="flex flex-col md:flex-row w-fit justify-start items-center-safe gap-2">
          <ProjectLinkAnalysisProvider projectId={projectId!}>
            <ActionStudio />
          </ProjectLinkAnalysisProvider>
          {project ? (
            <Tooltip>
              <Tooltip.Trigger>
                <Button
                  isIconOnly
                  variant="ghost"
                  onPress={state.open}
                  className="rounded-full"
                >
                  <Icons.Edit />
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>Edit</Tooltip.Content>
            </Tooltip>
          ) : null}
          <ViewSwitch />
        </div>
      </div>
      <Separator />
      {modal}
    </div>
  );
}
