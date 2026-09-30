"use client";
import { ComboBox, Input, Label, ListBox } from "@heroui/react";
import { modal } from "styles/styles";

type EvidenceUrlFieldProps = {
  value: string;
  onChange: (v: string) => void;
  suggestions: string[];
  error?: string;
};

export default function EvidenceUrlField({
  value,
  onChange,
  suggestions,
  error,
}: EvidenceUrlFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <ComboBox
        allowsCustomValue
        inputValue={value}
        onInputChange={onChange}
        onChange={(key) => {
          if (key) onChange(key as string);
        }}
      >
        <Label>
          Evidence URL <span className="text-danger">*</span>
        </Label>
        <ComboBox.InputGroup
          className={error ? "border border-danger rounded-lg" : ""}
        >
          <Input placeholder="https://..." />
          {suggestions.length > 0 && <ComboBox.Trigger />}
        </ComboBox.InputGroup>
        {suggestions.length > 0 && (
          <ComboBox.Popover className={modal.base}>
            <ListBox>
              {suggestions.map((url) => (
                <ListBox.Item id={url} key={url} textValue={url}>
                  <span className="text-sm truncate block max-w-xs">{url}</span>
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </ComboBox.Popover>
        )}
      </ComboBox>
      {error && <p className="text-danger text-xs">{error}</p>}
    </div>
  );
}
