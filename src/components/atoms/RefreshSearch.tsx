import { useCallback } from "react";
import { Button, Tooltip } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { runEnrichFlows } from "@/store/flowsSlice/flows.actions";
import type { Person } from "@/types/person/index.interface";
import { useAppDispatch } from "@/store/store";
import { usePersonActions } from "@/contexts/personContext/PersonContext";

export default function RefreshSearch({
  person,
  isIconOnly = true,
  variant = "ghost",
  radius = "full",
  isDisabled = false,
  size = "sm",
}: {
  person: Person;
  isIconOnly?: boolean;
  variant?:
    | "primary"
    | "ghost"
    | "tertiary"
    | "danger"
    | "danger-soft"
    | "outline"
    | "secondary";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  isDisabled?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const dispatch = useAppDispatch();
  const { updatePersonIfExists } = usePersonActions();

  const handleClick = useCallback(() => {
    dispatch(runEnrichFlows({ person }));
    updatePersonIfExists({ ...person, id: person.id });
  }, [dispatch, person, updatePersonIfExists]);

  return (
    <Tooltip>
      <Tooltip.Trigger>
        <Button
          isDisabled={isDisabled}
          variant={variant}
          isIconOnly={isIconOnly}
          onPress={handleClick}
          className={`rounded-${radius}`}
        >
          <Icons.Refresh />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>Refresh Data</Tooltip.Content>
    </Tooltip>
  );
}
