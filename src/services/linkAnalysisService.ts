/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import AuthServices from "./authService";
import { apiInstance } from "@/utils/apiInstance";
import { API_ROUTES } from "@/constants/routes";
import { IConnectionType } from "@/contexts/projectLinkAnalisysContext/types";

type Params = {
  project_id?: string;
  selected_persons?: string[];
  edge_types: string[];
  node_types: string[];
  min_degree: number;
  connection_type: IConnectionType[];
};

let controller: AbortController | null = null;

class LinkAnalysisService {
  static async getLinkAnalysis(token: string | null, params?: Params) {
    const headers = await AuthServices.createHeaders(token);
    if (controller) controller.abort();
    try {
      const res = await apiInstance.post(
        `${API_ROUTES.PERSONS}/graph`,
        params,
        {
          headers,
          signal: controller?.signal,
        },
      );
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }
}

export default LinkAnalysisService;
