"use client";
import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  Button,
  ButtonGroup,
  TextField,
  Label,
  Input,
  FieldError,
  Popover,
  useOverlayState,
} from "@heroui/react";
import debounce from "lodash/debounce";
import { Icons } from "@/components/atoms/Icons/";
import HasFilters from "./HasFilters";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import { SEARCH_QURIES } from "@/constants/search";
import { modal, button } from "styles/styles";

export default function FiltersCampaigns() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams!);
  const { setQueries, deleteQueries } = useSearchParamsActions();
  const state = useOverlayState();
  const { moveToPage } = useSearchParamsActions();

  const handleSubmit = useCallback(() => {
    moveToPage(1);
  }, [moveToPage]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const makeApiCall = useCallback(
    debounce((key: string, value: string) => {
      setQueries([
        { key: SEARCH_QURIES.PAGE, value: "1" },
        { key, value },
      ]);
    }, 400),
    [setQueries],
  );

  const handleChange = useCallback(
    (e: any) => {
      makeApiCall(e.target.id, e.target.value);
    },
    [makeApiCall],
  );

  const handleReset = useCallback(() => {
    deleteQueries({});
    state.close();
  }, [deleteQueries]);

  return (
    <Popover isOpen={state.isOpen} onOpenChange={state.setOpen}>
      <HasFilters>
        <Button
          variant="tertiary"
          className="text-xs font-semibold text-foreground-500 rounded-full"
        >
          <Icons.Search />
          SEARCH
        </Button>
      </HasFilters>
      <Popover.Content className={modal.base}>
        <Popover.Dialog className="flex flex-col w-fit items-center space-y-4">
          <TextField
            id="title__like"
            value={params.get("title__like") ?? ""}
            onChange={handleChange}
          >
            <Label>Title</Label>
            <Input />
            <FieldError />
          </TextField>
          <TextField
            id="description__like"
            value={params.get("description__like") ?? ""}
            onChange={handleChange}
          >
            <Label>Description</Label>
            <Input />
            <FieldError />
          </TextField>
          <ButtonGroup className="gap-1">
            <Button
              type="submit"
              variant="ghost"
              className={button.ghost_accent}
              onPress={handleSubmit}
            >
              <Icons.Search />
              Search
            </Button>
            <Button
              variant="ghost"
              className={button.ghost_accent}
              onPress={handleReset}
            >
              <Icons.Undo />
              Reset
            </Button>
          </ButtonGroup>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
