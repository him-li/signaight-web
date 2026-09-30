import { AxiosError } from "axios";
import AuthServices from "./authService";
import { API_ROUTES } from "@/constants/routes";
import { apiInstance } from "@/utils/apiInstance";
import type { Candidate } from "@/types/person/index.interface";

export default class CandidatesServices {
  static async getCandidates(
    personId: string,
    source: string,
    resource: string,
    searchId: string,
    primary: boolean,
    token: string | null,
  ) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const query = `?ds_filter=true${source ? "&source=" + source?.toLowerCase() : ""}${
        resource ? `&resource=${resource?.toLowerCase()}` : ""
      }${searchId ? `&search_id=${searchId}` : ""}${typeof primary === "boolean" ? `&primary=${primary}` : ""}`;
      const res = await apiInstance.get(
        `${API_ROUTES.PERSONS}/${personId}/candidates/${query}`,
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

  static async getCandidate(id: string, token: string | null) {
    const headers = await AuthServices.createHeaders(token);
    try {
      const res = await apiInstance.get(`${API_ROUTES.CANDIDATES}/${id}`, {
        headers,
      });
      return res.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.name + ": " + e.message);
    }
  }

  static async updateCandidatePrimary(
    personId: string,
    candidateId: string,
    searchId: string,
    token: string | null,
  ) {
    const headers = await AuthServices.createHeaders(token);
    const request = {
      primary: true,
    };
    try {
      const res = await apiInstance.put(
        `${API_ROUTES.PERSONS}/${personId}/candidates/${candidateId}/primary?search_id=${searchId}`,
        request,
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

  static async addCandidate(
    personId: string,
    candidate: Partial<Candidate>,
    token: string | null,
  ) {
    const headers = await AuthServices.createHeaders(token);
    const request = candidate;
    try {
      const res = await apiInstance.post(
        `${API_ROUTES.PERSONS}/${personId}/candidates/`,
        request,
        {
          headers,
        },
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}
