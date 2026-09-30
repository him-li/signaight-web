/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCallback } from "react";
import dynamic from "next/dynamic";
import {
  ToggleButton,
  ToggleButtonGroup,
  DateField,
  DateRangePicker,
  Label,
  RangeCalendar,
} from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { modal } from "styles/styles";
import BlockLayout from "@/components/atoms/BlockLayout";
import {
  useGeoTraceActions,
  useGeoTraceState,
} from "@/contexts/geoTraceContext/GeoTraceContext";
import { GeoTraceContextProps } from "@/contexts/geoTraceContext/types";
const GeoTraceMap = dynamic(() => import("./Map"), {
  loading: () => <div />,
  ssr: false,
});

export default function GeoTrace() {
  const { dateRange, position } = useGeoTraceState();
  const { setDateRange, setPosition } = useGeoTraceActions();

  const handleSelect = useCallback(
    (data: "residence" | "check_ins" | "entities") => {
      let newPosition: GeoTraceContextProps["position"] = position;
      if (position.includes(data)) {
        newPosition = position.filter((it) => it !== data);
      } else {
        newPosition = position.concat(data);
      }
      setPosition(newPosition);
    },
    [position, setPosition],
  );

  return (
    <BlockLayout isVisible={true} title="Geo Trace" icon={<Icons.Locations />}>
      <GeoTraceMap />
      <ToggleButtonGroup
        aria-label="Geo trace categories"
        selectionMode="multiple"
        size="sm"
      >
        <ToggleButton id="residence" onPress={() => handleSelect("residence")}>
          <Icons.Location fill="purple" />
          Residence
        </ToggleButton>
        <ToggleButton id="check_ins" onPress={() => handleSelect("check_ins")}>
          <Icons.Location fill="teal" />
          Check-in
        </ToggleButton>
        <ToggleButton id="entities" onPress={() => handleSelect("entities")}>
          <Icons.Location fill="darkkhaki" />
          Mentions
        </ToggleButton>
      </ToggleButtonGroup>
      <DateRangePicker
        value={dateRange}
        onChange={(dates) => {
          if (dates) setDateRange(dates);
        }}
        aria-label="Date Range Picker"
      >
        <Label>Trip dates</Label>
        <DateField.Group>
          <DateField.InputContainer>
            <DateField.Input slot="start">
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateRangePicker.RangeSeparator />
            <DateField.Input slot="end">
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.InputContainer>
          <DateField.Suffix>
            <DateRangePicker.Trigger>
              <DateRangePicker.TriggerIndicator />
            </DateRangePicker.Trigger>
          </DateField.Suffix>
        </DateField.Group>
        <DateRangePicker.Popover className={modal.base}>
          <RangeCalendar
            aria-label="Choose trip dates"
            visibleDuration={{ months: 2 }}
          >
            <RangeCalendar.Header>
              <RangeCalendar.YearPickerTrigger>
                <RangeCalendar.YearPickerTriggerHeading />
                <RangeCalendar.YearPickerTriggerIndicator />
              </RangeCalendar.YearPickerTrigger>
              <RangeCalendar.NavButton slot="previous" />
              <RangeCalendar.NavButton slot="next" />
            </RangeCalendar.Header>
            <RangeCalendar.Grid>
              <RangeCalendar.GridHeader>
                {(day) => (
                  <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>
                )}
              </RangeCalendar.GridHeader>
              <RangeCalendar.GridBody>
                {(date) => <RangeCalendar.Cell date={date} />}
              </RangeCalendar.GridBody>
            </RangeCalendar.Grid>
          </RangeCalendar>
        </DateRangePicker.Popover>
      </DateRangePicker>
    </BlockLayout>
  );
}
