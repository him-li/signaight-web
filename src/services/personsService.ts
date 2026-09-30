/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import AuthServices from "./authService";
import type {
  Person,
  PersonDemoData,
  PersonQuery,
} from "@/types/person/index.interface";
import type { PersonalDetails } from "@/types/person/personal_details/index.interface";
import type { WebSearches } from "@/types/search.interface";
import { ALL_PROJECTS } from "@/constants/projects";
import { getLayoutName } from "@/utils/layout";
import { apiInstance } from "@/utils/apiInstance";
import { API_ROUTES } from "@/constants/routes";
import { IPagination } from "@/types/tables.interface";
import { SEARCH_QURIES } from "@/constants/search";
import { IManyPersonsDeleteRequest } from "@/types/requests/manyPersonsDelete";
import { IPersonsRedFlagsResponse } from "@/types/responses/personsRedFlags";
import { MergePersonsRequest } from "@/types/requests/mergePersons";
import { IMergePersonsResponse } from "@/types/responses/mergePersonsResponse";
import { RiskmatrixWidgetsResponse } from "@/types/responses/riskmatrixWidgetsResponse";

class PersonsService {
  static async getPersons(token: string | null, searchParams?: PersonDemoData) {
    const headers = await AuthServices.createHeaders(token);
    try {
      if (searchParams) {
        const searchParamsAllStr = {
          ...searchParams,
          demo_data: searchParams.demo_data.toString(),
        };
        const searchQueryObj = Object.entries(searchParamsAllStr)
          .filter(([, value]) => value !== "")
          .map(([key, value]) => [key, value.toString()]);
        const searchParamsUrl = new URLSearchParams(searchQueryObj).toString();
        const queryString = searchParams ? `?${searchParamsUrl}` : "";
        const res = await apiInstance.get(
          `${API_ROUTES.PERSONS}${queryString}`,
          {
            headers,
          },
        );
        return res.data;
      } else {
        const res = await apiInstance.get(`${API_ROUTES.PERSONS}`, {
          headers,
        });
        return res.data;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }

  static async getPersonsByProject({
    project_id,
    searchQuery,
    token,
    page,
    pageSize,
    project_platform: platform,
  }: {
    project_id: string;
    searchQuery: PersonQuery;
    token: string | null;
    page?: number;
    pageSize?: number;
    project_platform?: string;
  }): Promise<{ items: Person[] } & IPagination> {
    const headers = await AuthServices.createHeaders(token);
    let searchQueryObj = Object.entries(searchQuery).filter(
      ([, value]) => value !== "",
    );
    const project_platform = platform ?? getLayoutName();
    const projectId = project_id === ALL_PROJECTS ? null : project_id;
    if (page) searchQueryObj.push([SEARCH_QURIES.PAGE, String(page)]);
    if (pageSize) searchQueryObj.push(["size", String(pageSize)]);
    if (projectId) searchQueryObj.push(["project__id", projectId]);
    searchQueryObj.push(["project__project_platform", project_platform!]);
    searchQueryObj = searchQueryObj.map(([key, value]) => [key, String(value)]);
    const searchParams = new URLSearchParams(searchQueryObj)?.toString() ?? "";
    const queryString = searchParams ? `?${searchParams}` : "";
    try {
      const res = await apiInstance.get<{ items: Person[] } & IPagination>(
        `${API_ROUTES.PERSONS}${queryString}`,
        {
          headers,
        },
      );
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  static async exportPersonsByProject(
    project_id: string,
    searchQuery: PersonQuery,
    token: string | null,
    selectedUsers: string[],
  ) {
    const headers = await AuthServices.createHeaders(token);
    let searchQueryObj = Object.entries(searchQuery).filter(
      ([, value]) => value !== "",
    );
    const project_platform = getLayoutName();
    const projectId = project_id === ALL_PROJECTS ? null : project_id;
    if (projectId) searchQueryObj.push(["project__id", projectId]);
    searchQueryObj.push(["project__project_platform", project_platform]);
    searchQueryObj = searchQueryObj.map(([key, value]) => [key, String(value)]);
    const searchParams = new URLSearchParams(searchQueryObj)?.toString() ?? "";
    const queryString = searchParams ? `?${searchParams}` : "";
    try {
      const res = await apiInstance.post(
        `${API_ROUTES.EXPORT_PERSONS}${queryString}`,
        { persons: selectedUsers },
        {
          headers,
        },
      );
      if (res.status === 200) {
        const data = await res.data;
        const csvFormatTimeStart = new Date().getTime();
        const filename = `export_persons_${projectId}_${csvFormatTimeStart}.csv`;
        const link = document.createElement("a");
        if (link.download !== undefined) {
          const url = window.URL.createObjectURL(
            new Blob([data], { type: "ext/csv" }),
          );
          link.setAttribute("href", url);
          link.setAttribute("download", filename);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getPerson(id: string, token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(`${API_ROUTES.PERSONS}/${id}`, {
        headers,
      });
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(
        (e.response?.data as any)?.detail ?? e.name + ": " + e.message,
      );
    }
  }

  static async getPersonHistory(id: string, token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(
        `${API_ROUTES.PERSONS}/${id}/history?action=Insert`,
        {
          headers,
        },
      );
      return res.data?.items[0]?.changes?.personal_details as PersonalDetails;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(
        (e.response?.data as any)?.detail ?? e.name + ": " + e.message,
      );
    }
  }

  static async getPersonWebSearch(id: string, token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(
        `${API_ROUTES.PERSONS}/${id}/web_search`,
        {
          headers,
        },
      );
      return res.data as WebSearches[];
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }

  static async getPersonRedFlags(
    id: string,
    token: string | null,
  ): Promise<IPersonsRedFlagsResponse> {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(
        `${API_ROUTES.PERSONS}/${id}/red-flags`,
        {
          headers,
        },
      );
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }

  static async getLeaderboardInfo(projectId: string, token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(
        `${API_ROUTES.PROJECTS}/${projectId}/leaderboard-info`,
        {
          headers,
        },
      );
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }

  static async uploadProfilePicture(
    id: string,
    file: File,
    token: string | null,
  ) {
    const headers = await AuthServices.createHeaders(token);
    const allowdFileTypes = ["jpeg", "png", "jpg", "webp", "gif"];
    try {
      if (!allowdFileTypes.includes(file.type.split("/")[1]))
        throw new Error("File type not allowed");
      const formData = new FormData();
      formData.append("file", file);
      const res = await apiInstance.post(
        `${API_ROUTES.PERSONS}/${id}/upload-profile-picture`,
        formData,
        {
          headers,
        },
      );
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(
        (e.response?.data as any)?.detail ?? e.name + ": " + e.message,
      );
    }
  }

  static async getBasicInfo(projectId: string, token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(
        `${API_ROUTES.PROJECTS}/${projectId}/basic-info`,
        {
          headers,
        },
      );
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }

  static async getRanking(projectId: string, token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(
        `${API_ROUTES.PROJECTS}/${projectId}/ranking`,
        {
          headers,
        },
      );
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }

  static async getSubjectAnalysis(projectId: string, token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(
        `${API_ROUTES.PROJECTS}/${projectId}/leaderboard-widgets`,
        {
          headers,
        },
      );
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }
  static async getRiskmatrixAnalysis(
    projectId: string,
    token: string | null,
  ): Promise<RiskmatrixWidgetsResponse> {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(
        `${API_ROUTES.PROJECTS}/${projectId}/riskmatrix-widgets`,
        {
          headers,
        },
      );
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }

  static async addPerson(
    projectId: string,
    person: Partial<Person>,
    searchExisting: boolean,
    token: string | null,
  ) {
    const headers = await AuthServices.createHeaders(token);
    const request = person;
    try {
      const searchQueryObj = [];
      searchQueryObj.push(["project_id", projectId]);
      searchQueryObj.push(["search_existing", searchExisting?.toString()]);
      const searchParams = new URLSearchParams(searchQueryObj).toString();
      const queryString = searchParams ? `?${searchParams}` : "";
      const res = await apiInstance.post(
        `${API_ROUTES.PERSONS}${queryString}`,
        request,
        {
          headers,
        },
      );
      return res.data;
    } catch (error) {
      // const e = error as AxiosError;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw error;
    }
  }

  static async addPersonByCsv(
    projectId: string,
    file: File,
    searchExisting: boolean,
    token: string | null,
  ) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const searchQueryObj = [];
      searchQueryObj.push(["project_id", projectId]);
      searchQueryObj.push(["search_existing", searchExisting?.toString()]);
      const searchParams = new URLSearchParams(searchQueryObj).toString();
      const queryString = searchParams ? `?${searchParams}` : "";
      const formData = new FormData();
      formData.append("csv", file);
      const res = await apiInstance.post(
        `${API_ROUTES.PERSONS}/by-csv${queryString}`,
        formData,
        {
          headers,
        },
      );
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }

  static async updatePerson(id: string, person: Person, token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.put(`${API_ROUTES.PERSONS}/${id}`, person, {
        headers,
      });
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async patchPerson(
    id: string,
    person: Partial<Person>,
    token: string | null,
    operation?: "add" | "replace",
  ) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.patch(
        `${API_ROUTES.PERSONS}/${id}`,
        person,
        {
          headers,
          params: operation ? { operation } : undefined,
        },
      );
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }

  static async patchPersonComment(
    id: string,
    comment: string,
    token: string | null,
  ) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.patch(
        `${API_ROUTES.PERSONS}/${id}/comment`,
        comment,
        {
          headers,
        },
      );
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }

  static async deletePersonFromProject(
    subjectiId: string,
    token: string | null,
  ) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.delete(
        `${API_ROUTES.PERSONS}/${subjectiId}`,
        {
          headers,
        },
      );
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }
  static async deleteManyPersonsFromProject(
    data: IManyPersonsDeleteRequest,
    token: string | null,
  ) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.delete(API_ROUTES.PERSONS, {
        headers,
        data,
      });
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }
  static async mergePersons(
    data: MergePersonsRequest,
    token: string | null,
  ): Promise<IMergePersonsResponse> {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.post(`${API_ROUTES.PERSONS}/merge`, data, {
        headers,
      });
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }
}

export default PersonsService;
