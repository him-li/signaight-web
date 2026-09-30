import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LAYOUT_NAME_COOKIE, sortingStrings } from "@/constants";
import { ROUTES } from "@/constants/routes";
import { SIGNAIGHT_LAYOUT_KEY } from "@/constants/layouts";
import { searchPersonsQuery } from "@/constants/search";
import PersonProvider from "@/contexts/personContext/PersonContext";
import { SESSION_COOKIE_NAME } from "@/auth";
import PersonsService from "@/services/personsService";
import { Person } from "@/types/person/index.interface";
import { IPagination } from "@/types/tables.interface";
import PersonsListListeners from "../../socket/PersonsListListeners";

type Props = {
  params: { lang: string; campaignId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
  children: React.ReactNode;
  pageSize: number;
  orderBy?: string[];
};

const GetPersonsWrapper = async ({
  params,
  searchParams,
  children,
  pageSize,
  orderBy = [sortingStrings.signaight_score_desc, sortingStrings.f_name_asc],
}: Props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME);
  if (!token) {
    redirect(ROUTES.LOGIN);
  }
  const paramsData = await params;
  const searchParamsData = await searchParams;
  const projectId = paramsData.campaignId ?? searchParamsData?.it;
  const page = searchParamsData?.page ? Number(searchParamsData?.page) : 1;
  const project_platform =
    cookieStore.get(LAYOUT_NAME_COOKIE)?.value ??
    process.env.NEXT_PUBLIC_LAYOUT_TYPE ?? SIGNAIGHT_LAYOUT_KEY;
  let personsData = {} as { items: Person[] } & IPagination;

  const searchQueries = {
    ...searchPersonsQuery,
    order_by: orderBy,
    ...searchParamsData,
  };

  const getData = async () => {
    const data = await PersonsService.getPersonsByProject({
      project_id: projectId,
      searchQuery: searchQueries,
      token: token?.value ?? "",
      page,
      pageSize,
      project_platform,
    });
    return data;
  };

  if (!projectId) {
    return (
      <PersonProvider
        personsData={{ items: [], size: 0, page: 1, pages: 1, total: 0 }}
        projectId={projectId}
        searchQueries={searchQueries}
      >
        {children}
      </PersonProvider>
    );
  }

  try {
    personsData = await getData();
  } catch (error) {
    console.error("Error fetching persons data:", error);
    personsData = { items: [], size: pageSize, page: 1, pages: 1, total: 0 };
  }

  return (
    <PersonProvider
      personsData={personsData}
      projectId={projectId}
      searchQueries={searchQueries}
    >
      <PersonsListListeners />
      {children}
    </PersonProvider>
  );
};

export default GetPersonsWrapper;
