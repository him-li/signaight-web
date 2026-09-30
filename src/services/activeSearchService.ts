import { AxiosError } from "axios";
import AuthServices from "@/services/authService";
import type { ActiveSearch } from "@/types/search.interface";
import { API_ROUTES } from "@/constants/routes";
import { apiInstance } from "@/utils/apiInstance";

export default class ActiveSearchServices {
  static async getActiveSearches(token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(API_ROUTES.EVENTS_ACTIVE_SEARCH, {
        headers,
      });
      return res.data.items;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }

  static async getActiveSearch(id: string, token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(
        `${API_ROUTES.EVENTS_ACTIVE_SEARCH}/${id}`,
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

  static async addActiveSearch(
    activeSearch: ActiveSearch,
    token: string | null,
  ) {
    const headers = await AuthServices.createHeaders(token);
    const created_at = new Date();
    const request = {
      ...activeSearch,
      created_at,
    };
    try {
      const res = await apiInstance.post(
        API_ROUTES.EVENTS_ACTIVE_SEARCH,
        request,
        { headers },
      );
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }

  static async updateActiveSearch(
    id: string,
    activeSearch: ActiveSearch,
    token: string | null,
  ) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.put(
        `${API_ROUTES.EVENTS_ACTIVE_SEARCH}/${id}`,
        activeSearch,
        { headers },
      );
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }
}
