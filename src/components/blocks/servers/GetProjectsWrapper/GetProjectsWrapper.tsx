import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LAYOUT_NAME_COOKIE } from "@/constants";
import { ROUTES } from "@/constants/routes";
import { SIGNAIGHT_LAYOUT_KEY } from "@/constants/layouts";
import { searchProjectsQuery } from "@/constants/search";
import { SESSION_COOKIE_NAME } from "@/auth";
import { IPagination } from "@/types/tables.interface";
import ProjectsService from "@/services/projectsService";
import ProjectProvider from "@/contexts/projectContext/ProjectContext";
import { Project } from "@/types/project.interface";

type Props = {
  params: { lang: string; campaignId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
  children: React.ReactNode;
  pageSize: number;
  page?: number;
};

const GetProjectsWrapper = async ({
  searchParams,
  children,
  pageSize,
  page,
}: Props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME);
  if (!token) {
    redirect(ROUTES.LOGIN);
  }
  const searchParamsData = await searchParams;
  const pageNumber = searchParamsData?.page
    ? Number(searchParamsData?.page)
    : 1;
  const platform =
    cookieStore.get(LAYOUT_NAME_COOKIE)?.value ??
    process.env.NEXT_PUBLIC_LAYOUT_TYPE ?? SIGNAIGHT_LAYOUT_KEY;
  let projectsData = {} as { items: Project[] } & IPagination;

  const getData = async () => {
    const data = await ProjectsService.getProjects({
      token: token?.value ?? "",
      searchQuery: {
        ...searchProjectsQuery,
        ...searchParamsData,
      },
      page: page ?? pageNumber,
      pageSize,
      platform,
    });
    return data;
  };

  try {
    projectsData = await getData();
  } catch (error) {
    console.error("Error fetching persons data:", error);
    projectsData = { items: [], size: pageSize, page: 1, pages: 1, total: 0 };
  }

  return (
    <ProjectProvider
      projects={projectsData.items ?? []}
      pagination={projectsData}
    >
      {children}
    </ProjectProvider>
  );
};

export default GetProjectsWrapper;
