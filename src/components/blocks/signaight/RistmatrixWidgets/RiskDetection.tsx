"use client";
import { useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Chip, Label, ListBox, type Selection } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { getFlagLabel, getSelectedFlags } from "./utils";
import { useRiskmatrixWidgetsState } from "@/contexts/riskmatrixWidgetsContext/RiskmatrixWidgetsContext";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import { SEARCH_QURIES } from "@/constants/search";
import type { FlagEntry } from ".";

export function RiskDetection() {
  const { setQueries } = useSearchParamsActions();
  const { personsFlags } = useRiskmatrixWidgetsState();
  const searchParams = useSearchParams();
  const selectedKeys = getSelectedFlags(searchParams);

  const flags: FlagEntry[] = useMemo(
    () =>
      Object.entries(personsFlags)
        .map(([flag, data]) => ({
          flag,
          count: data?.count,
          persons: data?.persons,
        }))
        .filter((entry) => entry.count > 0),
    [personsFlags],
  );

  const handleSelectionChange = useCallback(
    (keys: Selection) => {
      const selectedFlags = Array.from(keys);
      setQueries([
        {
          key: SEARCH_QURIES.FLAGS,
          value: selectedFlags.length ? selectedFlags.join(",") : "",
        },
        { key: SEARCH_QURIES.RISK_SCRORE_GTE, value: "" },
        { key: SEARCH_QURIES.RISK_SCRORE_LTE, value: "" },
        { key: SEARCH_QURIES.PAGE, value: "1" },
      ]);
    },
    [setQueries],
  );

  useEffect(() => {
    if (!selectedKeys) {
      handleSelectionChange(new Set());
    }
  }, [selectedKeys]);

  return (
    <ListBox
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={handleSelectionChange}
      items={flags}
      renderEmptyState={() => (
        <div className="p-0 h-[20vh] flex flex-col justify-evenly ps-8 bg-accent text-foreground">
          <strong>Risks Detected</strong>
          <strong className="text-3xl">0</strong>
        </div>
      )}
      className="rounded-2xl h-[20vh] shadow-md bg-default backdrop-blur-xl overflow-y-auto p-0 scrollbar-hide"
    >
      {(item) => (
        <ListBox.Item
          id={item.flag}
          key={item.flag}
          textValue={getFlagLabel(item.flag)}
          className={`hover:bg-default-hover ease-in-out duration-300 rounded-none data-[selected=true]:bg-[#009689]/20
            data-[selected=true]:text-danger`}
        >
          <Icons.Flag className="text-danger" />
          <Label>{getFlagLabel(item.flag)}</Label>
          <Chip variant="tertiary" className="ms-auto">
            {item.count == 1 ? <Icons.Person /> : <Icons.Persons />}
            <Chip.Label>{item.count}</Chip.Label>
          </Chip>
        </ListBox.Item>
      )}
    </ListBox>
  );
}
