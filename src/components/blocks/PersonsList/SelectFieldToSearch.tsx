import { useCallback } from "react";
import { Select, Label, ListBox } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import {
  useAnalysisActions,
  useAnalysisState,
} from "@/contexts/analisysContext/AnalysisContext";
import { modal } from "styles/styles";
import type { AnalysisContextProps } from "@/contexts/analisysContext/types";

export const searchBy = [
  { key: "f_name__like", label: "First Name", icon: <Icons.Name /> },
  { key: "l_name__like", label: "Last Name", icon: <Icons.Name /> },
  { key: "email_address__like", label: "Email", icon: <Icons.Email /> },
];

export default function SelectFieldToSearch() {
  const { setSearchField } = useAnalysisActions();
  const { searchField } = useAnalysisState();

  const handleChange = useCallback(
    (e: any) => {
      setSearchField(e.target.value as AnalysisContextProps["searchField"]);
    },
    [setSearchField],
  );

  return (
    <Select defaultValue={searchField}>
      <Select.Trigger className="bg-transparent shadow-none">
        <Select.Value className="flex gap-1 items-center-safe" />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className={modal.base}>
        <ListBox>
          {searchBy.map((field) => (
            <ListBox.Item
              id={field.key}
              key={field.key}
              textValue={field.label}
              onPress={() => handleChange}
              className="min-w-40"
            >
              {field.icon}
              <Label id={field.key}>{field.label}</Label>
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
