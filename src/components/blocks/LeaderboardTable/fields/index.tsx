import { Icons } from "@/components/atoms/Icons";
import DeleteMultipleModal from "../../DeletePersonModal/DeleteMultipleModal";
import CsvDownload from "@/components/atoms/CSVDownload";
import { Button, Checkbox } from "@heroui/react";
import { useTableState } from "@/contexts/tableContext/TableContext";
import { ColumnType } from "@/types/tables.interface";

const Columns = () => {
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
      isRowHeader: true,
    },
    {
      key: "ranking",
      label: "RANKING",
      isRowHeader: false,
    },
    {
      key: "personal_details__name__first_name__f_name",
      label: "PROFILE",
      align: "left",
      isSortable: true,
      isRowHeader: false,
    },
    {
      key: "signaight_score",
      label: (
        <span>
          Real<strong className="text-success">Eye</strong> SCORE
        </span>
      ),
      align: "center",
      isSortable: true,
      isRowHeader: false,
    },
    {
      key: "alerts",
      label: "ALERTS",
      align: "center",
      isRowHeader: false,
    },
    {
      key: "compatibility",
      label: "COMPATIBILITY",
      align: "center",
      isRowHeader: false,
    },
    {
      key: "filters",
      label: (
        <div className="flex flex-row items-center-safe">
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
              size="sm"
              className="rounded-full"
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
};

export default Columns;
