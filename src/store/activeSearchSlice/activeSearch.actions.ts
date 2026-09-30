/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AppState } from "@/store/store";
import ActiveSearchServices from "@/services/activeSearchService";
import { toast } from "@heroui/react";

export const fetchActiveSearches = createAsyncThunk(
  "activeSearch/fetchActiveSearches",
  async (any, { getState, rejectWithValue }) => {
    const token = (getState() as AppState).auth.token;
    try {
      const response = await ActiveSearchServices.getActiveSearches(token);
      return response;
    } catch (error) {
      const e = error as AxiosError;
      toast.danger("Error", {
        description: e.response?.statusText || e.message,
      });
      return rejectWithValue(e.response?.data || e.message);
    }
  },
);

export const fetchActiveSearchById = createAsyncThunk(
  "activeSearch/fetchActiveSearchById",
  async (activeSearchId: any, { getState, rejectWithValue }) => {
    const token = (getState() as AppState).auth.token;
    try {
      const response = await ActiveSearchServices.getActiveSearch(
        activeSearchId,
        token,
      );
      if (
        !response ||
        response === undefined ||
        response === null ||
        (Object.keys(response).length === 0 && response.constructor === Object)
      ) {
        toast.danger("Failed", {
          description: "Something went wrong, please try again later",
        });
      } else {
        toast.success("Success", {
          description: "Search fetched successfully",
        });
      }
      return response;
    } catch (error) {
      const e = error as AxiosError;
      toast.danger("Error", {
        description: e.response?.statusText || e.message,
      });
      return rejectWithValue(e.response?.data || e.message);
    }
  },
);

export const createActiveSearch = createAsyncThunk(
  "activeSearch/createActiveSearch",
  async ({ activeSearch }: any, { getState, rejectWithValue }) => {
    const token = (getState() as AppState).auth.token;
    try {
      const response = await ActiveSearchServices.addActiveSearch(
        activeSearch,
        token,
      );
      toast.success("Success", {
        description: "Search initiated successfully",
      });
      return response;
    } catch (error) {
      const e = error as AxiosError;
      toast.danger("Error", {
        description: e.response?.statusText || e.message,
      });
      return rejectWithValue(e.response?.data || e.message);
    }
  },
);

export const updateActiveSearch = createAsyncThunk(
  "activeSearch/updateActiveSearch",
  async (
    { ActiveSearchId, ActiveSearchDetails }: any,
    { getState, rejectWithValue },
  ) => {
    const token = (getState() as AppState).auth.token;
    try {
      const response = await ActiveSearchServices.updateActiveSearch(
        ActiveSearchId,
        ActiveSearchDetails,
        token,
      );
      toast.success("Success", {
        description: "Search updated successfully",
      });
      return response;
    } catch (error) {
      const e = error as AxiosError;
      toast.danger("Error", {
        description: e.response?.statusText || e.message,
      });
      return rejectWithValue(e.response?.data || e.message);
    }
  },
);
export const activeSearchActions = {
  fetchActiveSearches,
  fetchActiveSearchById,
  updateActiveSearch,
  createActiveSearch,
};
