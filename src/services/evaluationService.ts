import { AxiosError } from "axios";
import AuthServices from "./authService";
import { API_ROUTES } from "@/constants/routes";
import { apiInstance } from "@/utils/apiInstance";

class EvaluationServices {
  static async getEvaluationByPersonId(personId: string, token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(
        `${API_ROUTES.EVALUATION}/by-person/${personId}`,
        {
          headers: headers,
        },
      );
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }
}

export default EvaluationServices;
