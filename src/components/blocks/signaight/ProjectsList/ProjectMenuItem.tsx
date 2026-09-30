"use client";
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { memo } from "react";
import { ProjectItemProps } from "./type";
import { setMaxStringLength } from "@/utils/setMaxStringLength";
import { PROJECT_NAME_LENGTH } from "@/constants/projects";
import ProjectChip from "./ProjectChip";

function ProjectMenuItem(
  props: ProjectItemProps & {
    setSelectedProjectIds?: (ids: { [key: string]: boolean }) => void;
    selectedProjectIds?: { [key: string]: boolean };
    selectedItem?: string | null;
  },
) {
  const { data } = props;

  if (!data) {
    return null;
  }

  return (
    <ProjectChip {...props} selectedIds={props.selectedProjectIds}>
      <div>{setMaxStringLength(data?.title, PROJECT_NAME_LENGTH)}</div>
    </ProjectChip>
  );
}

const ProjectMenuItemMemo = memo(ProjectMenuItem);

export default ProjectMenuItemMemo;
