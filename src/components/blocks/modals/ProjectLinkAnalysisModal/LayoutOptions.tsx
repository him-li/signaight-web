import { Controller, Control } from "react-hook-form";
import { GraphFormValues, LayoutType } from "./types";
import { Button } from "@heroui/react";

const layouts: { label: string; value: LayoutType }[] = [
  { label: "Force", value: "force" },
  { label: "Radial", value: "radial" },
  { label: "Tree", value: "tree" },
  { label: "Cluster", value: "cluster" },
];

interface Props {
  control: Control<GraphFormValues>;
}

export default function LayoutOptions({ control }: Props) {
  return (
    <div>
      <h3 className="font-semibold mb-3">Layout Options</h3>

      <Controller
        name="layout"
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-2 gap-1">
            {layouts.map((layout) => (
              <Button
                key={layout.value}
                type="button"
                variant={field.value === layout.value ? "tertiary" : "outline"}
                onPress={() => field.onChange(layout.value)}
                className="rounded-xl"
              >
                {layout.label}
              </Button>
            ))}
          </div>
        )}
      />
    </div>
  );
}
