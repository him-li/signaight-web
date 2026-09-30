/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";
import dynamic from "next/dynamic";
import { Button, Chip } from "@heroui/react";
import { useProjectState } from "@/contexts/projectContext/ProjectContext";
import Display from "@/components/atoms/Display";
import useAddProjectModal from "@/components/blocks/AddProjectModal/useAddProjectModal";
import ProjectsListLazyLoading from "@/components/blocks/signaight/ProjectsList/ProjectsListLazyLoading";
import ProjectSelectHandler from "./ProjectSelectHandler";
import { Icons } from "@/components/atoms/Icons";
import { button } from "styles/styles";
const AllWatchListButton = dynamic(
  () => import("./AllWatchListButtonChecker"),
  {
    loading: () => <div />,
    ssr: false,
  },
);

export default function ProjectsList() {
  const { projects } = useProjectState();
  const { modal, state } = useAddProjectModal();
  return (
    <div className="flex flex-col px-16 md:p-0 w-full md:w-80 max-h-80 md:max-h-[90vh] shadow-e-2xl justify-start backdrop-blur-xl">
      <Button
        fullWidth
        variant="ghost"
        onPress={state.open}
        className={button.ghost_accent + " mt-4 py-4"}
      >
        <Icons.Plus />
        Add Watchlist
      </Button>
      <Display
        when={projects.length > 0}
        fallback={
          <Chip variant="tertiary" className="flex m-auto">
            <Chip.Label>No Watchlist</Chip.Label>
          </Chip>
        }
      >
        <Display when={projects.length > 0} fallback={null}>
          <AllWatchListButton />
        </Display>
        <ProjectSelectHandler />
        <ProjectsListLazyLoading type="menu" />
      </Display>
      {modal}
    </div>
  );
}
