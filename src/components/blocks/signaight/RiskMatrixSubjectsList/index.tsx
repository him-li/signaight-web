"use client";
import { useAppSelector } from "@/store/store";
import { selectDisplayMode } from "@/store/subjectsSlice/subjects.selectors";
import SubjectTable from "./table";
import SubjectCards from "./cards";
import Display from "@/components/atoms/Display";
import { usePersonState } from "@/contexts/personContext/PersonContext";
import NotFound from "@/components/atoms/Icons/NotFound";
import { selectSelectedProject } from "@/store/projectsSlice/projects.selectors";

export default function SubjectsList() {
  const { persons } = usePersonState();
  const isCardView = useAppSelector(selectDisplayMode);
  const currentProject = useAppSelector(selectSelectedProject);

  return (
    <Display when={!!currentProject} fallback={<NotFound />}>
      <Display when={isCardView} fallback={<SubjectTable />}>
        <SubjectCards persons={persons} />
      </Display>
    </Display>
  );
}
