"use client";
import { PureComponent, useCallback } from "react";
import { AxiosError } from "axios";
import { Treemap, ResponsiveContainer, TreemapProps, Tooltip } from "recharts";
import { Icons } from "@/components/atoms/Icons";
import { compatibilities } from "@/constants";
import { scoreColors, schema } from "@/constants/colors";
import { toast } from "@heroui/react";
import { SEARCH_QURIES } from "@/constants/search";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";

interface CompatibilityData {
  "High Compatibility"?: number | string;
  "Medium Compatibility"?: number | string;
  "Low Compatibility"?: number | string;
  Disqualified?: number | string;
}
interface CompatibilityTreemapProps {
  chartHeight: number;
  chartWidth: number;
  rawData?: CompatibilityData;
}

interface CustomizedContentProps extends TreemapProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  depth?: number;
  color?: string;
  size?: number;
  name?: string;
  abbr?: string;
}

type CompatibilitiesType = typeof compatibilities;

export default function CompatibilityTreemap({
  chartHeight,
  chartWidth,
  rawData,
}: CompatibilityTreemapProps) {
  const { setQueries } = useSearchParamsActions();
  const data = [
    "High Compatibility",
    "Medium Compatibility",
    "Low Compatibility",
    "Disqualified",
  ].map((name) => ({
    name,
    size: (rawData && rawData[name as keyof CompatibilityData]) || 0,
    color: scoreColors(
      compatibilities[name as keyof CompatibilitiesType]?.stop,
    ),
  }));

  const handleClick = useCallback(
    (value: string) => {
      try {
        setQueries([
          {
            key: SEARCH_QURIES.COMPATABILITY,
            value: value,
          },
          {
            key: SEARCH_QURIES.STATUS,
            value: "",
          },
          {
            key: SEARCH_QURIES.SCRORE_GTE,
            value: "",
          },
          {
            key: SEARCH_QURIES.SCRORE_LTE,
            value: "",
          },
        ]);
        toast.success("Filter Applied", {
          description: `Successfully filtered by ${value}`,
        });
      } catch (e) {
        const error = e as AxiosError;
        toast.danger(error.name, {
          description: error.message,
        });
      }
    },
    [setQueries],
  );

  const getIcon = (name: string) => {
    switch (name) {
      case "High Compatibility":
        return <Icons.Checks />;
      case "Medium Compatibility":
        return <Icons.Check />;
      case "Low Compatibility":
        return <Icons.Minus />;
      case "Disqualified":
        return <Icons.Cancel />;
      default:
        return null;
    }
  };

  class CustomizedContent extends PureComponent<CustomizedContentProps> {
    render() {
      const {
        x = 0,
        y = 0,
        width = 0,
        height = 0,
        depth = 0,
        color,
        size,
        name,
      } = this.props;

      return (
        <g
          fill="transparent"
          cursor="pointer"
          onClick={() => handleClick(name as string)}
        >
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            style={{
              fill: depth < 2 ? color : scoreColors(100),
              stroke: "transparent",
              WebkitTextStrokeColor: "transparent",
            }}
          />
          {depth === 1 && (
            <svg x={x + width / 2 - 7} y={y + height / 2 - 7} color="white">
              {size != 0 && name && getIcon(name)}
            </svg>
          )}
          {depth === 1 && (
            <text
              x={x + 7}
              y={y + 20}
              fill="white"
              stroke="white"
              fontSize={18}
              fillOpacity={0.9}
            >
              {size != 0 && size}
            </text>
          )}
        </g>
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ payload }: any) => {
    if (payload && payload.length) {
      const { name, value } = payload[0].payload;
      return (
        <div className="rounded-2xl bg-neutral-500/25 text-foreground backdrop-blur-xs shadow-lg p-3 text-start text-sm">
          <p color="white">{name}</p>
          <p color="white">Count of Applicants: {value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      style={{ borderRadius: "1rem", overflow: "hidden" }}
    >
      <Treemap
        width={chartWidth}
        height={chartHeight}
        data={data}
        dataKey="size"
        stroke={schema.secondary}
        content={<CustomizedContent />}
        isAnimationActive={false}
      >
        <Tooltip content={<CustomTooltip />} />
      </Treemap>
    </ResponsiveContainer>
  );
}
