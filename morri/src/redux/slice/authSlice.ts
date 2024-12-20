import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";

interface User {
  id: string;
  name: string;
  role: string;
  // ....
}

const API_URL = "http://localhost:8080";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
} = authSlice.actions;

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(loginStart());
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      console.log("response: ", response);
      const { user, token } = response.data;
      dispatch(loginSuccess({ user, token }));
    } catch (error: any) {
      dispatch(loginFailure(error.response?.data?.message || "Login failed"));
    }
  };

export const register =
  (userData: { name: string; email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(registerStart());
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      const { user, token } = response.data;
      dispatch(registerSuccess({ user, token }));
    } catch (error: any) {
      dispatch(
        registerFailure(error.response?.data?.message || "Registration failed")
      );
    }
  };

export default authSlice.reducer;
