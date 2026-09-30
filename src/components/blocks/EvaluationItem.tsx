import { Button, Skeleton, Tooltip } from "@heroui/react";
type EvaluationItemsProps = {
  label: string;
  tooltip?: string;
  score?: number | string;
  onPress: () => void;
  isActive?: boolean;
  disableSkeleton?: boolean;
};

export default function EvaluationItems({
  label,
  tooltip,
  score,
  onPress,
  isActive,
  disableSkeleton = false,
}: EvaluationItemsProps) {
  return (
    <>
      {!disableSkeleton ? (
        <Skeleton />
      ) : (
        <Tooltip isDisabled={!tooltip} delay={700}>
          <Tooltip.Trigger>
            <Button
              fullWidth
              variant={isActive ? "tertiary" : "ghost"}
              size="sm"
              className={`flex justify-between text-sm px-6 rounded-none ${
                isActive && "border-s-2 border-neutral-200"
              }`}
              onPress={onPress}
            >
              <p>{label}</p>
              <p>{score}</p>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content placement="right">
            {tooltip && tooltip}
          </Tooltip.Content>
        </Tooltip>
      )}
    </>
  );
}
