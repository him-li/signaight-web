import { AxiosError } from "axios";
import AuthServices from "@/services/authService";
import type {
  Project,
  ProjectQuery,
  ProjectPNR,
} from "@/types/project.interface";
import { apiInstance } from "@/utils/apiInstance";
import { API_ROUTES } from "@/constants/routes";
import { SEARCH_QURIES } from "@/constants/search";

export default class ProjectsService {
  static async getProjects({
    token,
    searchQuery,
    page,
    pageSize,
    platform,
  }: {
    token: string | null;
    searchQuery: ProjectQuery;
    page?: number;
    pageSize?: number;
    platform?: string;
  }): Promise<{
    items: Project[];
    page: number;
    pages: number;
    total: number;
    size: number;
  }> {
    const headers = await AuthServices.createHeaders(token);
    let searchQueryObj = Object.entries(searchQuery).filter(
      ([, value]) => value !== "",
    );
    if (page) searchQueryObj.push([SEARCH_QURIES.PAGE, String(page)]);
    if (pageSize) searchQueryObj.push(["size", String(pageSize)]);
    if (platform) searchQueryObj.push(["project_platform", platform]);
    searchQueryObj = searchQueryObj.map(([key, value]) => [key, String(value)]);
    const searchParams = new URLSearchParams(searchQueryObj).toString();
    const queryString = searchParams ? `?${searchParams}` : "";
    try {
      const res = await apiInstance.get(
        `${API_ROUTES.PROJECTS}${queryString}`,
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

  static async getProject(id: string, token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(`${API_ROUTES.PROJECTS}/${id}`, {
        headers,
      });
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }

  static async addProject(
    title: string,
    description: string | undefined,
    platform: string,
    pnr_data: ProjectPNR | undefined,
    token: string | null,
  ) {
    const headers = await AuthServices.createHeaders(token);
    const created_at = new Date();
    const request = {
      title,
      description,
      created_at,
      project_platform: platform,
      pnr_data,
    };
    try {
      const res = await apiInstance.post(`${API_ROUTES.PROJECTS}`, request, {
        headers,
      });
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }

  static async updateProject(
    id: string,
    project: Project,
    token: string | null,
  ) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.put(
        `${API_ROUTES.PROJECTS}/${id}`,
        project,
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

  static async deleteProject(id: string, token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.delete(`${API_ROUTES.PROJECTS}/${id}`, {
        headers,
      });
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }
}
