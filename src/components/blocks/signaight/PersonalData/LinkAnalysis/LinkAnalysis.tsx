"use client";
import { useCallback, useEffect, useState } from "react";
import { ListBox, Select, Skeleton } from "@heroui/react";
import dynamic from "next/dynamic";
import { Icons } from "@/components/atoms/Icons";
import { useProjectLinkAnalysisActions } from "@/contexts/projectLinkAnalisysContext/ProjectLinkAnalysisContext";
import { useAppSelector } from "@/store/store";
import { selectCurrentSubjectData } from "@/store/subjectsSlice/subjects.selectors";
import { modal } from "styles/styles";

const AddConnectionButton = dynamic(() => import("./AddConnection"), {
  loading: () => <div className="absolute" />,
  ssr: false,
});
const BlockLayout = dynamic(() => import("@/components/atoms/BlockLayout"), {
  loading: () => null,
  ssr: false,
});
const Graph = dynamic(() => import("./Graph"), {
  loading: () => <Skeleton className="h-48 rounded-lg" />,
  ssr: false,
});

const items = [
  { key: "work", label: "Work", icon: <Icons.Work /> },
  { key: "education", label: "Education", icon: <Icons.Education /> },
  {
    key: "social_connections",
    label: "Social Connections",
    icon: <Icons.LinkAnalysis />,
  },
  { key: "check_ins", label: "Check-ins", icon: <Icons.Locations /> },
  { key: "has_hometown", label: "Hometown", icon: <Icons.Home /> },
];

export default function LinkAnalysis() {
  const person = useAppSelector(selectCurrentSubjectData);
  const { getGraphData } = useProjectLinkAnalysisActions();
  const [value, setValue] = useState<any>(items.map((i) => i.key));

  useEffect(() => {
    if (person?.id) {
      const set = new Set<string>();
      set.add(person?.id as string);
      getGraphData({
        selectedKeys: set,
        edge_types: [
          "has_work",
          "has_education",
          "has_connections",
          "has_check_ins",
          "has_hometown",
        ],
        nodes_type: [
          "person",
          "company",
          "school",
          "work",
          "education",
          "social_connections",
          "check_ins",
          "has_hometown",
        ],
        min_degree: 1,
        connection_type: ["all"],
      });
    }
  }, [person?.id]);

  const handleSelectChange = useCallback(
    (keys: any) => {
      setValue(keys);
      if (person?.id) {
        const set = new Set<string>();
        set.add(person?.id as string);

        getGraphData({
          selectedKeys: set,
          edge_types: [
            "has_work",
            "has_education",
            "has_connections",
            "has_check_ins",
            "has_hometown",
          ],
          nodes_type: ["person", ...(Array.from(keys) as string[])],
          min_degree: 1,
          connection_type: ["all"],
        });
      }
    },
    [person?.id, getGraphData],
  );

  return (
    <BlockLayout
      title="Link Analysis"
      icon={<Icons.LinkAnalysis />}
      subtitle={
        <Select
          aria-label="Link analysis node types"
          selectionMode="multiple"
          onChange={handleSelectChange}
          value={value}
          placeholder="Node Types"
          className="max-w-100 ms-2"
        >
          <Select.Trigger className="rounded-2xl">
            <Select.Value>
              {(v) => <div className="text-xs">{v.selectedText}</div>}
            </Select.Value>
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className={modal.base}>
            <ListBox aria-label="Link analysis node types">
              {items?.map((nodeType) => (
                <ListBox.Item
                  id={nodeType.key}
                  key={nodeType.key}
                  textValue={nodeType.label}
                >
                  {nodeType.icon}
                  {nodeType.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      }
    >
      <div className="relative h-full w-full">
        <AddConnectionButton personId={person?.id as string} />
        <Graph />
      </div>
    </BlockLayout>
  );
}
