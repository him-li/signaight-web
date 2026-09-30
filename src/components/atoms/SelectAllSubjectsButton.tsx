"use client";
import { Button, type ButtonProps } from "@heroui/react";
import { useAppSelector } from "@/store/store";
import { Icons } from "@/components/atoms/Icons";
import { selectProjectsState } from "@/store/projectsSlice";
import type { ReactNode } from "react";
interface SelectAllSubjectsButtonProps extends Omit<ButtonProps, "children"> {
  handleSelectAll: () => void;
  children: ReactNode;
}
export default function SelectAllSubjectsButton(
  props: SelectAllSubjectsButtonProps,
) {
  const selectedProject = useAppSelector(selectProjectsState).selectedProject;
  return (
    <Button
      {...props}
      onPress={props.handleSelectAll}
      isDisabled={!selectedProject}
    >
      <Icons.Check />
      {props.children}
    </Button>
  );
}
