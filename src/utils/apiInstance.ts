/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";
import { SERVER_URL } from "@/constants";
import AuthServices from "@/services/authService";

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

// Create a list to hold the request queue
const refreshAndRetryQueue: RetryQueueItem[] = [];
let isRefreshing = false;

export const apiInstance = axios.create({
  baseURL: SERVER_URL,
});

apiInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log("error------------", error);
    if (401 === error.response?.status) {
      const originalRequest: AxiosRequestConfig = error.config;
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          goToLogout();
          return Promise.reject(error);
        } catch (refreshError) {
          throw refreshError;
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    } else {
      if (typeof error?.response?.data?.detail === "string") {
        error.message = error.response.data.detail;
      }
      if (
        error?.response?.data?.detail?.length &&
        error?.response.data.detail[0].msg
      ) {
        error.message = error.response.data.detail[0].msg;
      }
      return Promise.reject(error);
    }
  },
);

function goToLogout() {
  window.location.href = "/logout";
}
