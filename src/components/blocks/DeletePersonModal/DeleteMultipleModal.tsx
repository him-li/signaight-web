"use client";
import { useCallback } from "react";
import { Button, AlertDialog, useOverlayState } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { resetProjectSelectedSubjects } from "@/store/subjectsSlice";
import { selectCurrentProjectId } from "@/store/projectsSlice";
import {
  useTableActions,
  useTableState,
} from "@/contexts/tableContext/TableContext";
import { useLayoutState } from "@/contexts/layoutContext/LayoutContext";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import Capitalize from "@/utils/capitalize";
import { layouts } from "@/constants/layouts";
import { deleteManyPersons } from "@/store/subjectsSlice/subjects.actions";
import EventBus, { PersonsDeletedEvent } from "@/services/EventBus/EventBus";
import { modal, button } from "styles/styles";

export default function DeleteMultipleModal() {
  const { refresh } = useSearchParamsActions();
  const state = useOverlayState();
  const dispatch = useAppDispatch();
  const { layoutName } = useLayoutState();
  const personTerm = Capitalize(
    layouts.find((layout) => layout.key === layoutName)?.person!,
  );

  const { selectedKeys, deselectedKeys, tableData, selectedAll } =
    useTableState();
  const { setSelectedKeys } = useTableActions();
  const selectedProjectId = useAppSelector(selectCurrentProjectId);

  const count =
    selectedKeys === "all" || selectedAll
      ? tableData.length - deselectedKeys.size
      : selectedKeys.size;

  const handleDeleteSelected = useCallback(() => {
    if (selectedKeys !== "all") {
      if (deselectedKeys.size > 0) {
        const deselectedPersonsIds = Array.from(deselectedKeys) as string[];
        dispatch(
          deleteManyPersons({
            method: "not_in",
            person_ids: deselectedPersonsIds,
            project_id: selectedProjectId!,
          }),
        );
        EventBus.publish(
          "persons-deleted",
          new PersonsDeletedEvent(deselectedPersonsIds, "not_in"),
        );
      }
      if (selectedKeys.size > 0) {
        const selectedPersonsIds = Array.from(selectedKeys) as string[];
        dispatch(
          deleteManyPersons({
            method: "in",
            person_ids: selectedPersonsIds,
            project_id: selectedProjectId!,
          }),
        );
        EventBus.publish(
          "persons-deleted",
          new PersonsDeletedEvent(selectedPersonsIds, "in"),
        );
      }
    }
    if (selectedKeys === "all") {
      dispatch(
        deleteManyPersons({
          method: "all",
          person_ids: [],
          project_id: selectedProjectId!,
        }),
      );
      EventBus.publish("persons-deleted", new PersonsDeletedEvent([], "all"));
    }
    dispatch(resetProjectSelectedSubjects(selectedProjectId));
    setSelectedKeys(new Set([]), false);

    refresh();
    state.close();
  }, [
    deselectedKeys,
    dispatch,
    state,
    refresh,
    selectedKeys,
    selectedProjectId,
    setSelectedKeys,
  ]);

  return (
    <AlertDialog onOpenChange={state.setOpen} isOpen={state.isOpen}>
      <AlertDialog.Trigger>
        <Button
          isIconOnly
          size="sm"
          variant="danger"
          onPress={state.open}
          isDisabled={selectedKeys !== "all" && selectedKeys.size === 0}
        >
          <Icons.Delete />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className={modal.base}>
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Heading>
                Delete {personTerm + "s"}
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body className="text-foreground">
              Are you sure you want to delete {count}{" "}
              {personTerm.toLowerCase() + "s"}? This action cannot be undone
              afterwards.
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button
                variant="ghost"
                type="submit"
                onPress={() => handleDeleteSelected()}
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
