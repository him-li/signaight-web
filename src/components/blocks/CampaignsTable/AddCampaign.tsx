import { Icons } from "@/components/atoms/Icons";
import { Button } from "@heroui/react";
import useAddProjectModal from "@/components/blocks/AddProjectModal/useAddProjectModal";
import { button } from "styles/styles";

export default function AddCampaign() {
  const { modal, state } = useAddProjectModal();
  return (
    <>
      <div className="m-auto h-full p-5 text-center rounded-2xl bg-default-50/90">
        Please{" "}
        <Button
          variant="ghost"
          className={button.ghost_accent}
          onPress={state.open}
        >
          <Icons.Plus />
          Add a Campaign
        </Button>{" "}
        to get started.
      </div>
      {modal}
    </>
  );
}
