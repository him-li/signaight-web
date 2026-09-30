import dynamic from "next/dynamic";
import { Card } from "@heroui/react";
import { card } from "styles/styles";
const Title = dynamic(() => import("./fields/title"), {
  ssr: false,
  loading: () => null,
});
const Description = dynamic(() => import("./fields/description"), {
  ssr: false,
  loading: () => null,
});
const User = dynamic(() => import("./fields/user"), {
  ssr: false,
  loading: () => null,
});
const CreatedDate = dynamic(() => import("./fields/createdDate"), {
  ssr: false,
  loading: () => null,
});
const Actions = dynamic(() => import("./fields/actions"), {
  ssr: false,
  loading: () => null,
});
const ProjectsListPagination = dynamic(() => import("./pagination"), {
  ssr: false,
  loading: () => <div />,
});
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
import type { Project } from "@/types/project.interface";
export default function CampaignsCards({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col p-4">
      <div className="flex p-2 justify-end items-center-safe w-full">
        <FilterCampaigns />
        <ViewSwitch />
      </div>
      <div className="p-8 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6">
        {projects.length ? (
          projects.map((project) => (
            <Card
              key={project.id}
              aria-label={project.id}
              className={card.base}
            >
              <Card.Header className="p-4">
                <Title project={project} isTitleEnlarged={true} />
              </Card.Header>
              <Card.Content className={card.content}>
                <Description description={project?.description} />
                <span>
                  <b>Candidates:</b>
                  <span className="w-4 h-4 m-auto">{project.person_count}</span>
                </span>
                <User email={project.user_email} />
                <CreatedDate date={project?.created_at} />
              </Card.Content>
              <Card.Footer className={card.footer}>
                <Actions item={project} />
              </Card.Footer>
            </Card>
          ))
        ) : (
          <div className="text-center w-full sm:col-span-2 md:col-span-3 lg:col-span-5 xl:col-span-6">
            No campaigns to display.
          </div>
        )}
      </div>
      <ProjectsListPagination />
    </div>
  );
}
