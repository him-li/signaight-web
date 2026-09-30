import { Suspense, type ReactNode } from "react";
import dynamic from "next/dynamic";
import GetSignAIghtInitialProjectsWrapper from "../servers/GetProjectsWrapper/GetSignAIghtInitialProjectsWrapper";
import ProjectsList from "@/components/blocks/signaight/ProjectsList/ProjectsList";
import LoadingProgress from "@/components/atoms/LoadingProgress";

const ProfileSelection = dynamic(
  () => import("@/components/blocks/ProfileSelectionSidebar"),
  {
    loading: () => <div />,
  },
);

export default function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row grow lg:px-16">
      <Suspense
        fallback={
          <div className="w-75">
            <LoadingProgress />
          </div>
        }
      >
        <GetSignAIghtInitialProjectsWrapper>
          <ProjectsList />
        </GetSignAIghtInitialProjectsWrapper>
      </Suspense>
      <div className="min-h-full w-full backdrop-blur-lg">
        <ProfileSelection />
        <div className="flex flex-col min-h-full w-full gap-4 p-8 items-start overflow-y-auto overflow-x-clip">
          {children}
        </div>
      </div>
    </div>
  );
}
