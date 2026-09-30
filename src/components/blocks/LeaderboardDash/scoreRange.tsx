"use client";
import { useCallback, useState } from "react";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Icons } from "@/components/atoms/Icons";
import { useAppDispatch } from "@/store/store";
import { getRankingInfo } from "@/store/subjectsSlice";
import { scoreColors } from "@/constants/colors";
import { toast } from "@heroui/react";
import { SEARCH_QURIES } from "@/constants/search";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";

interface ScoreRangeData {
  total?: number | string;
  score_0_10?: number | string;
  score_10_20?: number | string;
  score_20_30?: number | string;
  score_30_40?: number | string;
  score_40_50?: number | string;
  score_50_60?: number | string;
  score_60_70?: number | string;
  score_70_80?: number | string;
  score_80_90?: number | string;
  score_90_100?: number | string;
}
interface ScoreRangeProps {
  chartWidth: number;
  chartHeight: number;
  rawData?: ScoreRangeData;
  scoreGteKey: string;
  scoreLteKey: string;
  scoreTitle: string;
  personsCountTitle: string;
}

interface CustomTooltipProps {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
  label?: string | number | null;
}

export default function ScoreRange({
  chartHeight,
  chartWidth,
  rawData,
  scoreGteKey,
  scoreLteKey,
  scoreTitle,
  personsCountTitle,
}: ScoreRangeProps) {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const { setQueries } = useSearchParamsActions();
  const d = useSearchParams();
  const v = d?.get(scoreGteKey) || d?.get(scoreLteKey);

  const data = [
    "score_0_10",
    "score_10_20",
    "score_20_30",
    "score_30_40",
    "score_40_50",
    "score_50_60",
    "score_60_70",
    "score_70_80",
    "score_80_90",
    "score_90_100",
  ].map((name, index) => {
    return {
      name,
      label: `${index * 10}-${index * 10 + 10}`,
      count: (rawData && rawData[name as keyof ScoreRangeData]) || 0,
    };
  });

  const handleClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any, index: number) => {
      try {
        if (index === 9) {
          setQueries([
            {
              key: SEARCH_QURIES.COMPATABILITY,
              value: "",
            },
            {
              key: SEARCH_QURIES.STATUS,
              value: "",
            },
            {
              key: scoreGteKey,
              value: "90",
            },
            {
              key: scoreLteKey,
              value: "100",
            },
            {
              key: SEARCH_QURIES.FLAGS,
              value: "",
            },
            {
              key: SEARCH_QURIES.PAGE,
              value: "1",
            },
          ]);
        } else {
          setQueries([
            {
              key: SEARCH_QURIES.COMPATABILITY,
              value: "",
            },
            {
              key: SEARCH_QURIES.STATUS,
              value: "",
            },
            {
              key: scoreGteKey,
              value: (index * 10).toString(),
            },
            {
              key: scoreLteKey,
              value: (index * 10 + 9).toString(),
            },
            {
              key: SEARCH_QURIES.FLAGS,
              value: "",
            },
            {
              key: SEARCH_QURIES.PAGE,
              value: "1",
            },
          ]);
        }
        setActiveIndex(index);
        dispatch(getRankingInfo());
        toast.success("Filter Applied", {
          description: `Successfully filtered by score range ${index * 10} - ${
            index * 10 + 10
          }`,
        });
      } catch (e) {
        const error = e as AxiosError;
        toast.danger(error.name, {
          description: error.message,
        });
      }
    },
    [dispatch, setQueries],
  );

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-2xl bg-neutral-800/80 text-white backdrop-blur-xs shadow-lg p-3 text-start text-sm">
          <p>
            {scoreTitle}: {label}
          </p>
          <p>
            {personsCountTitle}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomizedDot = (props: any) => {
    const { cx, cy, index, payload } = props;
    return (
      <foreignObject
        x={cx - 7}
        y={cy - 7}
        width={50}
        height={50}
        viewBox="0 0 50 50"
        cursor="pointer"
        onClick={() => handleClick(payload.value, index)}
      >
        <Icons.Eye />
      </foreignObject>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={chartWidth}
        height={chartHeight}
        data={data}
        margin={{
          top: 5,
          left: -30,
          right: 20,
          bottom: -10,
        }}
      >
        <XAxis
          dataKey="label"
          scale="point"
          tickFormatter={(value) => value.split("-")[1]}
          style={{ fontSize: "0.75rem" }}
        />
        <YAxis style={{ fontSize: "0.75rem" }} />
        <Tooltip content={<CustomTooltip />} />
        <defs>
          <linearGradient id="bgColor" gradientTransform="rotate(0)">
            <stop offset="0%" stopColor={scoreColors(0)} />
            <stop offset="33%" stopColor={scoreColors(40)} />
            <stop offset="67%" stopColor={scoreColors(60)} />
            <stop offset="100%" stopColor={scoreColors(100)} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="count"
          stroke="url(#bgColor)"
          fill="url(#bgColor)"
          activeDot={<CustomizedDot />}
          dot={(props) => {
            const isActive = props.index === activeIndex && v;
            return (
              <circle
                cx={props.cx}
                cy={props.cy}
                r={isActive ? 6 : 3}
                fill={isActive ? "#ef4444" : "#19a093"}
              />
            );
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
