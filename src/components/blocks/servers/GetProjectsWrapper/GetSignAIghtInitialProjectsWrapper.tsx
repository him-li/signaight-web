import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/auth";
import { ROUTES } from "@/constants/routes";
import { redirect } from "next/navigation";
import ProjectsService from "@/services/projectsService";
import { SEARCH_COUNT, searchProjectsQuery } from "@/constants/search";
import { LAYOUT_NAME_COOKIE } from "@/constants";
import { SIGNAIGHT_LAYOUT_KEY } from "@/constants/layouts";
import ProjectProvider from "@/contexts/projectContext/ProjectContext";

export default async function GetSignAIghtInitialProjectsWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME);
  if (!token) {
    redirect(ROUTES.LOGIN);
  }

  const data = await ProjectsService.getProjects({
    token: token?.value ?? "",
    searchQuery: searchProjectsQuery,
    page: 1,
    pageSize: SEARCH_COUNT,
    platform:
      cookieStore.get(LAYOUT_NAME_COOKIE)?.value ?? SIGNAIGHT_LAYOUT_KEY,
  });
  return (
    <ProjectProvider projects={data.items ?? []} pagination={data}>
      {children}
    </ProjectProvider>
  );
}
