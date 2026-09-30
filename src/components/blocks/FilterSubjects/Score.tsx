import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Slider, Label } from "@heroui/react";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import { useTableActions } from "@/contexts/tableContext/TableContext";
import { SEARCH_QURIES } from "@/constants/search";

export default function Score() {
  const { setSelectedKeys } = useTableActions();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams!);
  const { setQueries } = useSearchParamsActions();

  const value = [
    Number(params.get(SEARCH_QURIES.RISK_SCRORE_GTE) || 0),
    Number(params.get(SEARCH_QURIES.RISK_SCRORE_LTE)) || 100,
  ];

  const handleScoreRangeChange = useCallback(
    (values: number[]) => {
      setSelectedKeys(new Set([]), false);
      setQueries([
        { key: SEARCH_QURIES.PAGE, value: "1" },
        { key: SEARCH_QURIES.RISK_SCRORE_GTE, value: values[0].toString() },
        { key: SEARCH_QURIES.RISK_SCRORE_LTE, value: values[1].toString() },
      ]);
    },
    [setQueries, setSelectedKeys],
  );

  return (
    <Slider
      aria-label="Risk Score Range"
      onChangeEnd={(values) => handleScoreRangeChange(values as number[])}
      defaultValue={value}
      minValue={0}
      maxValue={100}
      step={10}
      // showSteps
    >
      <Label>Risk Score Range</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  );
}
