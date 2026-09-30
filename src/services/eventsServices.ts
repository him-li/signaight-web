import { AxiosError } from "axios";
import AuthServices from "./authService";
import { apiInstance } from "@/utils/apiInstance";
import { API_ROUTES } from "@/constants/routes";

class EventsServices {
  static async getSearches(token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(`${API_ROUTES.EVENTS}/search`, {
        headers,
      });
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }

  static async getDoneSearches(token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(
        `${API_ROUTES.EVENTS}/search?status=Done`,
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

  static async getSearch(searchId: string, token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(
        `${API_ROUTES.EVENTS}/search/${searchId}`,
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
}

export default EventsServices;
