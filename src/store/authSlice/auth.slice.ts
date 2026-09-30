import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";
import type { UserInfo } from "@/auth";

export interface AuthState {
  token: string | null;
  isAuth: boolean;
  userinfo: UserInfo | null;
}

export const initialAuthState: AuthState = {
  token: null,
  isAuth: false,
  userinfo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        state.isAuth = true;
      }
    },
    setUserinfo: (state, action: PayloadAction<UserInfo | null>) => {
      state.userinfo = action.payload;
    },
  },
});

export const { setToken, setUserinfo } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;
export const selectIsAuthState = (state: AppState) => state.auth.isAuth;
export const getTokenSelector = (state: AppState) => state.auth.token;
export const getIsAuthSelector = (state: AppState) => state.auth.isAuth;

export const getUserinfo = (state: AppState) => state.auth.userinfo;
