"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/store/store";
import { selectDisplayMode } from "@/store/subjectsSlice/subjects.selectors";
import { selectLoadingProjectsList } from "@/store/projectsSlice/projects.selectors";
import PageLoader from "@/components/atoms/PageLoader";
import { useProjectState } from "@/contexts/projectContext/ProjectContext";
const TableProvider = dynamic(
  () => import("@/contexts/tableContext/TableContext"),
  {
    ssr: false,
    loading: () => <div />,
  },
);
const CampaignsTable = dynamic(() => import("./table"), {
  ssr: false,
  loading: () => <div />,
});
const CampaignsCards = dynamic(() => import("./card"), {
  ssr: false,
  loading: () => null,
});
const AddCampaign = dynamic(() => import("./AddCampaign"), {
  ssr: false,
  loading: () => null,
});

export default function Campaigns() {
  const searchParams = useSearchParams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const params = new URLSearchParams(searchParams!);
  const { projects, pagination } = useProjectState();
  const isCardView = useAppSelector(selectDisplayMode);
  const isLoading = useAppSelector(selectLoadingProjectsList);

  const isFiltersAvailable = useMemo(
    () => params.get("title__like") || params.get("description__like"),
    [params],
  );

  const justProjects = useMemo(() => projects.filter((it) => it), [projects]);

  const render = () => {
    if (isLoading && !justProjects.length) {
      return <PageLoader />;
    }
    if (!isLoading && !justProjects.length && !isFiltersAvailable) {
      return <AddCampaign />;
    }

    return (
      <TableProvider data={justProjects} pagination={pagination}>
        {isCardView ? (
          <CampaignsCards projects={justProjects} />
        ) : (
          <CampaignsTable />
        )}
      </TableProvider>
    );
  };

  return <div id="#/properties/campaigns-table">{render()}</div>;
}
