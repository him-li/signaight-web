"use client";
import { useCallback } from "react";
import { AxiosError } from "axios";
import {
  Button,
  AlertDialog,
  UseOverlayStateReturn,
  toast,
} from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { useAppDispatch } from "@/store/store";
import { deleteProject } from "@/store/projectsSlice";
import { setPageLoading } from "@/store/pageLoadingSlice";
import { useLayoutState } from "@/contexts/layoutContext/LayoutContext";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import Capitalize from "@/utils/capitalize";
import { layouts } from "@/constants/layouts";
import { modal, button } from "styles/styles";
import type { Project } from "@/types/project.interface";

type DeleteProjectModalProps = {
  project: Project;
  state: UseOverlayStateReturn;
};

export default function DeleteProjectModal({
  project,
  state,
}: DeleteProjectModalProps) {
  const { layoutName } = useLayoutState();
  const projectTerm = Capitalize(
    layouts.find((layout) => layout.key === layoutName)?.project!,
  );
  const { refresh } = useSearchParamsActions();
  const dispatch = useAppDispatch();

  const onConfirm = () => {
    handleDeleteProject(project.id);
    state.close();
  };

  const handleDeleteProject = useCallback(
    async (id: string) => {
      try {
        dispatch(setPageLoading());
        await dispatch(deleteProject(id));
        toast.success("Success", {
          description: { projectTerm } + " deleted successfully",
        });
        refresh();
      } catch (e) {
        const error = e as AxiosError;
        toast.danger("Error", {
          description: error.response?.statusText || error.message,
        });
      }
    },
    [dispatch, refresh],
  );

  return (
    <AlertDialog isOpen={state.isOpen} onOpenChange={state.setOpen}>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className={modal.base}>
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Heading>Delete {projectTerm}</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body className="text-foreground">
              Are you sure you want to delete {projectTerm.toLowerCase()}{" "}
              {project?.title}? You cannot undo this action afterwards.
            </AlertDialog.Body>
            <AlertDialog.Footer className="w-full justify-end-safe">
              <Button
                variant="ghost"
                type="submit"
                onPress={onConfirm}
                className={button.ghost_danger}
              >
                <Icons.Delete />
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
