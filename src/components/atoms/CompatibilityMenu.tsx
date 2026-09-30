/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type { ReactElement, JSXElementConstructor } from "react";
import { AxiosError } from "axios";
import { Button, Dropdown, Label, toast } from "@heroui/react";
import { useAppDispatch } from "@/store/store";
import { patchSubject } from "@/store/subjectsSlice";
import type { Person } from "@/types/person/index.interface";
import { compatibilities } from "@/constants";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import { modal } from "styles/styles";

type CompatibilityMenuProps = {
  subject: Person | null;
  isResponsive: boolean;
};

type Compatibility = keyof typeof compatibilities;

export default function CompatibilityMenu({ subject }: CompatibilityMenuProps) {
  const dispatch = useAppDispatch();
  const compatibility = subject?.compatibility;
  const { refresh } = useSearchParamsActions();

  const handleChange = async (compatibility: string) => {
    const subjectId: string | undefined = subject?.id;
    try {
      await dispatch(
        patchSubject({ subjectId, subjectDetails: { compatibility } }),
      );
      toast.success("Updated", {
        description: "Compatibility was reset successfully",
      });
      refresh();
    } catch (e) {
      const error = e as AxiosError;
      toast.danger(error.name, {
        description: error.message,
      });
    }
  };

  const getIcon = (compatibility: Compatibility | undefined) => {
    if (compatibility) {
      const selectedCompatibility = compatibilities[compatibility];
      return (<selectedCompatibility.icon />) as
        | ReactElement<any, string | JSXElementConstructor<any>>
        | undefined;
    }
  };

  return (
    <Dropdown>
      <Button variant="ghost" className="min-w-12 max-w-20 rounded-full">
        {getIcon(compatibility as any)}
      </Button>
      <Dropdown.Popover className={modal.base}>
        <Dropdown.Menu aria-label="Compatibility Menu" selectionMode="single">
          {Object.values(compatibilities).map((item, index) => (
            <Dropdown.Item
              id={item.full}
              key={index}
              onPress={() => handleChange(item.full)}
              textValue={item.full}
              className={
                item.full === (subject?.compatibility as any)
                  ? "bg-primary"
                  : ""
              }
            >
              <Dropdown.ItemIndicator />
              <item.icon />
              <Label>{item.full}</Label>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
