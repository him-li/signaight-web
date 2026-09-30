"use client";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Switch, Tooltip } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { activateCardView, deactivateCardView } from "@/store/subjectsSlice";
import { selectDisplayMode } from "@/store/subjectsSlice/subjects.selectors";

type ViewSwitchProps = {
  tooltipOffset?: number;
};

const VIEW_BREAKPOINT = 1080;

export default function ViewSwitch({ tooltipOffset }: ViewSwitchProps) {
  const isCardView = useAppSelector(selectDisplayMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const updateViewMode = () => {
      if (window.innerWidth < VIEW_BREAKPOINT) {
        dispatch(activateCardView());
      }
    };

    updateViewMode();

    const mediaQuery = window.matchMedia("(min-width: 48rem)");
    const handleResize = (e: MediaQueryListEvent) => {
      if (e.matches) {
        return;
      } else {
        dispatch(activateCardView());
      }
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [dispatch]);

  const handleListViewChange = useCallback(() => {
    if (isCardView) {
      dispatch(deactivateCardView());
    } else {
      dispatch(activateCardView());
    }
  }, [dispatch, isCardView]);

  return (
    <Tooltip>
      <Tooltip.Content
        offset={tooltipOffset}
      >{`Switch to ${isCardView ? "Table" : "Card"} View`}</Tooltip.Content>
      <Tooltip.Trigger>
        <Switch
          isSelected={isCardView}
          onChange={handleListViewChange}
          size="lg"
        >
          <Switch.Control className="relative shadow-md">
            <div className="absolute inset-0 flex items-center justify-between px-1 pointer-events-none">
              <Icons.Table className="opacity-40" />
              <Icons.File className="opacity-40" />
            </div>
            <Switch.Thumb className="relative z-10">
              <Switch.Icon>
                {isCardView ? <Icons.File /> : <Icons.Table />}
              </Switch.Icon>
            </Switch.Thumb>
          </Switch.Control>
        </Switch>
      </Tooltip.Trigger>
    </Tooltip>
  );
}
