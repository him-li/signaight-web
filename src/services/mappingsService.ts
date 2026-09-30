import AuthServices from "./authService";
import { apiInstance } from "@/utils/apiInstance";
import { API_ROUTES } from "@/constants/routes";

class MappingServices {
  static async getMapping(token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    const response = await apiInstance.get(API_ROUTES.MAPPING, {
      headers,
    });
    return response.data;
  }
}

export default MappingServices;
