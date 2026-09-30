"use client";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "@heroui/react";
import { useAppDispatch } from "@/store/store";
import { getRankingInfo } from "@/store/subjectsSlice";
import { Icons } from "@/components/atoms/Icons";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import { SEARCH_QURIES } from "@/constants/search";

interface SearchingStatusData {
  search_running?: number | string;
  search_done?: number | string;
  search_error?: number | string;
  total?: number | string;
}
interface SearchingStatusProps {
  data?: SearchingStatusData;
}

export default function SearchingStatus({ data }: SearchingStatusProps) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams!);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedKeys, setSelectedKeys] = useState<
    "all" | Set<string | number>
  >(new Set([]));
  const { setQueries, deleteQueries } = useSearchParamsActions();
  const status = params.get(SEARCH_QURIES.STATUS);

  useEffect(() => {
    if (status) {
      setSelectedKeys(new Set([status]));
    } else {
      setSelectedKeys(new Set([]));
    }
  }, [status]);

  const handleClick = useCallback(
    (isReset: boolean, status: string) => {
      if (isReset) {
        deleteQueries({});
        setSelectedKeys(new Set([]));
        return;
      }
      try {
        setQueries([
          {
            key: SEARCH_QURIES.STATUS,
            value: status,
          },
          {
            key: SEARCH_QURIES.COMPATABILITY,
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
        dispatch(getRankingInfo());
        toast.success("Filter Applied", {
          description: `Successfully filtered by status ${status}`,
        });
      } catch (e) {
        const error = e as AxiosError;
        toast.danger(error.name, {
          description: error.message,
        });
      }
    },
    [deleteQueries, dispatch, setQueries],
  );

  return (
    <div className="grid grid-cols-2 gap-0.5 h-[20vh] shadow-md bg-default-100 backdrop-blur-xl overflow-hidden">
      <div
        key="total"
        aria-label="Total Applicants"
        className="flex flex-col justify-evenly ps-3 bg-background hover:bg-background-tertiary ease-in-out duration-300 cursor-pointer"
        onClick={() => {
          handleClick(true, "");
        }}
      >
        <strong className="flex gap-2 items-center-safe">
          <Icons.Persons />
          Applicants
        </strong>
        <strong className="text-3xl">{data?.total}</strong>
      </div>

      <div
        key="Success"
        aria-label="Search Completed"
        className={
          "flex flex-col justify-evenly ps-3 bg-accent hover:bg-accent-hover ease-in-out duration-300 cursor-pointer" +
          ((selectedKeys as Set<string>).has("Success") ? " bg-accent" : "")
        }
        onClick={() => handleClick(false, "Success")}
      >
        <strong className="flex gap-2 items-center-safe">
          <Icons.Check />
          Completed
        </strong>

        <strong className="text-3xl">{data?.search_done}</strong>
      </div>

      <div
        key="In+progress"
        aria-label="Search Running"
        className={
          "flex flex-col justify-evenly ps-3 bg-warning hover:bg-warning-hover ease-in-out duration-300 cursor-pointer" +
          ((selectedKeys as Set<string>).has("In progress")
            ? " bg-warning"
            : "")
        }
        onClick={() => handleClick(false, "In progress")}
      >
        <strong className="flex gap-2 items-center-safe">
          <Icons.Pending />
          Searching
        </strong>
        <strong className="text-3xl">{data?.search_running}</strong>
      </div>

      <div
        key="Error"
        aria-label="Search Error"
        className={`flex flex-col justify-evenly ps-3 bg-danger hover:bg-danger-hover ease-in-out duration-300 cursor-pointer ${(selectedKeys as Set<string>).has("Error") ? "bg-danger text-white" : ""}`}
        onClick={() => handleClick(false, "Error")}
      >
        <strong className="flex gap-2 items-center-safe">
          <Icons.Cancel />
          Search Error
        </strong>
        <strong className="text-3xl">{data?.search_error}</strong>
      </div>
    </div>
  );
}
