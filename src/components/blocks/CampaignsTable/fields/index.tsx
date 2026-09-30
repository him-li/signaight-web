import dynamic from "next/dynamic";
import { ColumnType } from "@/types/tables.interface";
const FilterCampaigns = dynamic(
  () => import("@/components/blocks/FilterCampaigns/FilterCampaigns"),
  {
    ssr: false,
    loading: () => <div />,
  },
);
const ViewSwitch = dynamic(() => import("@/components/atoms/ViewSwitch"), {
  ssr: false,
  loading: () => <div />,
});

const columns: ColumnType[] = [
  {
    key: "title",
    label: "TITLE",
    align: "start",
    isSortable: true,
    isRowHeader: true,
  },
  {
    key: "description",
    label: "DESCRIPTION",
    align: "center",
    isRowHeader: false,
  },
  {
    key: "candidates",
    label: "CANDIDATES",
    align: "center",
    isRowHeader: false,
  },
  {
    key: "user",
    label: "PERSON IN CHARGE",
    align: "center",
    isRowHeader: false,
  },
  {
    key: "created_at",
    label: "CREATED DATE",
    align: "center",
    isSortable: true,
    isRowHeader: false,
  },
  {
    key: "filters",
    label: (
      <div className="flex items-center-safe">
        <FilterCampaigns />
        <ViewSwitch />
      </div>
    ),
    align: "end",
    isRowHeader: false,
  },
];

export default columns;
