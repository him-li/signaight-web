"use client";
import { useCallback } from "react";
import { Button, Tooltip, Popover } from "@heroui/react";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { patchSubject } from "@/store/subjectsSlice";
import { Icons } from "@/components/atoms/Icons";
import type { Person } from "@/types/person/index.interface";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import { modal } from "styles/styles";
type MarkPersonProps = {
  person: Person;
};

export default function MarkPerson({ person }: MarkPersonProps) {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { refresh } = useSearchParamsActions();

  const updatePersonMark = useCallback(
    async (
      updatedAttention = person?.is_attention,
      updatedFavorite = person?.is_favorite,
    ) => {
      const updatedPerson = {
        is_attention: updatedAttention,
        is_favorite: updatedFavorite,
      };
      await dispatch(
        patchSubject({
          subjectId: params?.personId ?? person.id,
          subjectDetails: updatedPerson,
        }),
      );
      refresh();
    },
    [
      person?.is_attention,
      person?.is_favorite,
      person?.id,
      dispatch,
      params?.personId,
      refresh,
    ],
  );

  return (
    <Popover>
      <Button
        isIconOnly
        variant="ghost"
        className={
          person?.is_attention
            ? "bg-danger"
            : person?.is_favorite
              ? "bg-warning"
              : ""
        }
      >
        {person?.is_attention ? (
          <Icons.Error color="red" />
        ) : (
          <Icons.Star color={person?.is_favorite ? "orange" : "gray"} />
        )}
      </Button>
      <Popover.Content placement="right" className={modal.base}>
        <Popover.Dialog>
          <Tooltip>
            <Tooltip.Trigger>
              <Button
                variant="ghost"
                onPress={() =>
                  updatePersonMark(person?.is_attention, !person?.is_favorite)
                }
              >
                <Icons.Star color={person?.is_favorite ? "orange" : "gray"} />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              {person?.is_favorite
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </Tooltip.Content>
          </Tooltip>
          <Tooltip>
            <Tooltip.Trigger>
              <Button
                variant="ghost"
                onPress={() =>
                  updatePersonMark(!person?.is_attention, person?.is_favorite)
                }
              >
                <Icons.Error color={person?.is_attention ? "red" : "gray"} />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content
              className={person?.is_attention ? "bg-danger" : ""}
            >
              {person?.is_attention
                ? "Attention Required"
                : "Requires Attention"}
            </Tooltip.Content>
          </Tooltip>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
