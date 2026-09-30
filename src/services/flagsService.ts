import { AxiosError } from "axios";
import AuthServices from "./authService";
import { apiInstance } from "@/utils/apiInstance";
import { API_ROUTES } from "@/constants/routes";
import { IPersonsRedFlagsResponse } from "@/types/responses/personsRedFlags";
import { FlagsStatisticsResponse } from "@/types/responses/flagsStatisticResponse";

class FlagsServices {
  static async getFlagsByPersonId(
    personId: string,
    token: string | null,
  ): Promise<IPersonsRedFlagsResponse> {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(
        `${API_ROUTES.FLAGS_BY_PERSON}/${personId}`,
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
  static async getFlagsStatisticByProject(
    projectId: string,
    token: string | null,
  ): Promise<FlagsStatisticsResponse> {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(
        `${API_ROUTES.FLAGS_STATISTIC}?project__id=${projectId}`,
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

export default FlagsServices;
