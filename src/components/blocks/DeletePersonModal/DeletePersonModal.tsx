"use client";
import { useCallback } from "react";
import {
  Button,
  AlertDialog,
  toast,
  UseOverlayStateReturn,
} from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/store/store";
import { deletePerson } from "@/store/subjectsSlice";
import { useTableActions } from "@/contexts/tableContext/TableContext";
import { useLayoutState } from "@/contexts/layoutContext/LayoutContext";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import Capitalize from "@/utils/capitalize";
import { layouts } from "@/constants/layouts";
import EventBus, { PersonsDeletedEvent } from "@/services/EventBus/EventBus";
import { getPersonName } from "@/utils/getPersonName";
import { modal, button } from "styles/styles";
import type { Person } from "@/types/person/index.interface";

type DeletePersonModalProps = {
  person: Person;
  state: UseOverlayStateReturn;
};

export default function DeletePersonModal({
  person,
  state,
}: DeletePersonModalProps) {
  const { refresh } = useSearchParamsActions();
  const dispatch = useAppDispatch();
  const { setSelectedKeys } = useTableActions();
  const fullName = getPersonName(person?.personal_details?.name, "full_name");
  const { layoutName } = useLayoutState();
  const personTerm = Capitalize(
    layouts.find((layout) => layout.key === layoutName)?.person!,
  );
  const handleDelete = useCallback(
    async (personId: string | undefined) => {
      try {
        await dispatch(deletePerson(personId));
        setSelectedKeys(new Set([]), false);
        toast.success("Success", {
          description: `Person ${fullName ?? ""} deleted successfully`,
        });
        state.close();
        //publish event to subscribers
        EventBus.publish(
          "persons-deleted",
          new PersonsDeletedEvent([personId!], "in"),
        );
      } catch (e) {
        const error = e as AxiosError;
        toast.danger("Error", {
          description: error.response?.statusText || error.message,
        });
      } finally {
        refresh();
      }
    },
    [dispatch, fullName, state, refresh, setSelectedKeys],
  );

  return (
    <AlertDialog
      onOpenChange={state.setOpen}
      isOpen={state.isOpen}
      key={person.id}
    >
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog
            aria-label="Delete Person Modal"
            className={modal.base}
          >
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Heading>Delete {personTerm}</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body className="text-foreground">
              Are you sure you want to delete {personTerm.toLowerCase()}{" "}
              {fullName}? The action cannot be undone afterwards.
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button
                variant="ghost"
                onPress={() => handleDelete(person.id)}
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
