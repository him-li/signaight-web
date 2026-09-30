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
      key: "checkbox",
      label: (
        <Checkbox aria-label="Select all" slot="selection">
          <Checkbox.Control className="rounded-full">
            <Checkbox.Indicator />
          </Checkbox.Control>
        </Checkbox>
      ),
      align: "start",
      isRowHeader: true,
    },
    {
      key: "personal_details__name__first_name__f_name",
      label: "PROFILE",
      align: "start",
      isRowHeader: false,
    },
    {
      key: "signaight_score",
      label: "SCORE",
      align: "center",
      isRowHeader: false,
    },
    {
      key: "red_flags",
      label: "RED FLAGS",
      align: "center",
      isRowHeader: false,
    },
    {
      key: "last_updated",
      label: "LAST UPDATED",
      align: "center",
      isRowHeader: false,
    },
    {
      key: "actions",
      label: (
        <div className="flex items-center-safe">
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
      align: "end",
      isRowHeader: false,
    },
  ] as ColumnType[];
}
