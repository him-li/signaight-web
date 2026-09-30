import { Button } from "@heroui/react";
import { useFormContext } from "react-hook-form";
import { Icons } from "@/components/atoms/Icons";
import { ALL_PROJECTS } from "@/constants/projects";
import { useCSVValidationState } from "@/contexts/csvValidationContext/CSVValidationContext";
import { selectCurrentProjectId } from "@/store/projectsSlice";
import { useAppSelector } from "@/store/store";
import { button } from "styles/styles";
type Props = object;

export default function SubmitButton({}: Props) {
  const { watch } = useFormContext();
  const projectId = useAppSelector(selectCurrentProjectId);
  const { csvValidationErrors } = useCSVValidationState();

  return (
    <Button
      variant="ghost"
      type="submit"
      isDisabled={
        !projectId ||
        projectId === ALL_PROJECTS ||
        !watch("file_")?.length ||
        csvValidationErrors.length > 0
      }
      className={button.ghost_accent}
    >
      <Icons.Upload />
      Upload File
    </Button>
  );
}
