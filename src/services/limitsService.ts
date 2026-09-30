/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import AuthServices from "./authService";
import { apiInstance } from "@/utils/apiInstance";
import { API_ROUTES } from "@/constants/routes";
import {
  IActionType,
  IKind,
  ILimitsResponse,
} from "@/types/responses/limitsResponse";

class LimitsService {
  static async getLimits(
    action: IActionType,
    kind: IKind,
    token: string | null,
  ): Promise<ILimitsResponse> {
    const headers = await AuthServices.createHeaders(token);
    try {
      const searchParamsAllStr = {
        kind,
        action,
      };
      const searchParamsUrl = new URLSearchParams(
        searchParamsAllStr,
      ).toString();
      const queryString = `?${searchParamsUrl}`;
      const res = await apiInstance.get(`${API_ROUTES.LIMITS}${queryString}`, {
        headers,
      });
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }
}

export default LimitsService;
