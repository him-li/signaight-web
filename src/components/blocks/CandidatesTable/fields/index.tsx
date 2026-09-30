"use client";
import dynamic from "next/dynamic";
import { Button, Checkbox } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { ColumnType } from "@/types/tables.interface";
import { useTableState } from "@/contexts/tableContext/TableContext";
const CsvDownload = dynamic(() => import("@/components/atoms/CSVDownload"), {
  ssr: false,
  loading: () => <div />,
});
const DeleteMultipleModal = dynamic(
  () => import("@/components/blocks/DeletePersonModal/DeleteMultipleModal"),
  {
    ssr: false,
    loading: () => <div />,
  },
);

export default function Columns() {
  const { selectedKeys } = useTableState();
  return [
    {
      key: "actions",
      label: (
        <div className="flex flex-row items-center-safe space-x-2">
          <Checkbox aria-label="Select all" slot="selection">
            <Checkbox.Control className="rounded-full">
              <Checkbox.Indicator />
            </Checkbox.Control>
          </Checkbox>
          <CsvDownload
            data={
              selectedKeys !== "all"
                ? Array.from(selectedKeys).map((id) => {
                    return {
                      Id: id,
                    };
                  })
                : []
            }
            filename={"SignAIght_Selected_Applicants"}
            isApiDownload
          >
            <Button
              isIconOnly
              className="rounded-full"
              size="sm"
              isDisabled={selectedKeys !== "all" && selectedKeys.size === 0}
            >
              <Icons.Download />
            </Button>
          </CsvDownload>
          <DeleteMultipleModal />
        </div>
      ),
      align: "start",
      isRowHeader: true,
    },
    {
      key: "personal_details__name__first_name__f_name",
      label: "FIRST NAME",
      align: "center",
      isSortable: true,
      isRowHeader: false,
    },
    {
      key: "personal_details__name__last_name__l_name",
      label: "LAST NAME",
      align: "center",
      isSortable: true,
      isRowHeader: false,
    },
    {
      key: "personal_details__email__email_address",
      label: "EMAIL",
      align: "center",
      isSortable: true,
      isRowHeader: false,
    },
    {
      key: "signaight_score",
      label: (
        <span>
          Real<strong className="text-teal-500">Eye</strong> SCORE
        </span>
      ),
      align: "center",
      isSortable: true,
      isRowHeader: false,
    },
    {
      key: "sources",
      label: "SOURCES",
      align: "center",
      isRowHeader: false,
    },
    {
      key: "recruiting_source",
      label: "RECRUITING SOURCE",
      align: "center",
      isRowHeader: false,
    },
    {
      key: "status",
      label: "STATUS",
      align: "center",
      isRowHeader: false,
    },
    {
      key: "filters",
      label: <div />,
      align: "end",
      isRowHeader: false,
    },
  ] as ColumnType[];
}
