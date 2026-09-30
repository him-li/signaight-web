import { Controller, Control } from "react-hook-form";
import { GraphFormValues } from "./types";
import { Select, ListBox, Slider } from "@heroui/react";

interface Props {
  control: Control<GraphFormValues>;
}

export default function ConnectionSettings({ control }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-semibold mb-2">Connection Type</h3>

        <Controller
          name="connectionType"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value || []}
              onChange={(keys) => {
                const values = Array.from(keys);
                field.onChange(values);
              }}
              selectionMode="multiple"
            >
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="z-100002">
                <ListBox className="z-100002">
                  <ListBox.Item
                    id="bidirectional"
                    key="bidirectional"
                    textValue="Bidirectional"
                  >
                    Bidirectional
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item
                    id="unidirectional"
                    key="unidirectional"
                    textValue="Unidirectional"
                  >
                    Unidirectional (Follow) <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="likes" key="likes" textValue="Likes">
                    Likes
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item
                    id="groups"
                    key="groups"
                    textValue="Groups Membership"
                  >
                    Groups Membership
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          )}
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Connection Threshold</h3>

        <Controller
          name="threshold"
          control={control}
          render={({ field }) => (
            <Slider
              minValue={2}
              maxValue={6}
              step={1}
              defaultValue={2}
              onChange={field.onChange}
            >
              <Slider.Output />
              <Slider.Track>
                <Slider.Fill />
                <Slider.Thumb />
                {/* <Slider.Marks>
                  {[
                    {
                      value: 2,
                      label: "2",
                    },
                    {
                      value: 3,
                      label: "3",
                    },
                    {
                      value: 4,
                      label: "4",
                    },
                    {
                      value: 5,
                      label: "5",
                    },
                    {
                      value: 6,
                      label: "6",
                    },
                  ]}
                </Slider.Marks> */}
              </Slider.Track>
            </Slider>
          )}
        />
      </div>
    </div>
  );
}
