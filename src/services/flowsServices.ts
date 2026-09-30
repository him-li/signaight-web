/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthServices from "./authService";
import { toast } from "@heroui/react";
import { apiInstance } from "@/utils/apiInstance";
import { API_ROUTES } from "@/constants/routes";

class FlowsServices {
  static async getFlows(token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(API_ROUTES.FLOWS, {
        headers,
      });
      toast.info("Flows Fetched");
      return res.data;
    } catch (error) {
      toast.danger("Error Fetching Flows");
      console.log(error);
    }
  }

  static async useFlow(key: string[], persons_id: any, token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    const request = {
      selected_persons: persons_id,
    };
    try {
      const res = await apiInstance.post(API_ROUTES.FLOWS, request, {
        headers,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async useEnrichFlow(persons_id: any, token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    const request = {
      selected_persons: persons_id,
    };
    try {
      const res = await apiInstance.post(API_ROUTES.FLOWS_ENRICH, request, {
        headers,
      });
      toast.success("Enrichment flow processed successfully");
      return res.data;
    } catch (error) {
      toast.danger("Error starting enrichment flow");
      console.log(error);
    }
  }
}

export default FlowsServices;
