import { Button, Dropdown, Label } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { modal } from "styles/styles";
import useDeletePersonModal from "@/components/blocks/DeletePersonModal/useDeletePersonModal";
import useEditPersonModal from "@/components/blocks/EditPersonModal/useEditPersonModal";
import type { Person } from "@/types/person/index.interface";

interface ItemMenuProps {
  person: Person;
}
export default function ItemMenu({ person }: ItemMenuProps) {
  const { modal: DeletePersonModal, state: deleteState } =
    useDeletePersonModal(person);
  const { modal: EditPersonModal, state: editState } = useEditPersonModal(
    person.id!,
  );
  return (
    <>
      <Dropdown>
        <Button
          type="button"
          variant="ghost"
          isIconOnly
          className="rounded-full"
        >
          <Icons.BarMenu />
        </Button>
        <Dropdown.Popover className={modal.base}>
          <Dropdown.Menu aria-label="Applicant Actions">
            <Dropdown.Item
              id="edit"
              key="edit"
              textValue="Edit"
              onPress={editState.open}
            >
              <Icons.Edit />
              <Label>Edit</Label>
            </Dropdown.Item>
            <Dropdown.Item
              id="delete"
              key="delete"
              textValue="Delete"
              onPress={deleteState.open}
            >
              <Icons.Delete />
              <Label>Delete</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
      {person?.id && EditPersonModal}
      {person?.id && DeletePersonModal}
    </>
  );
}
