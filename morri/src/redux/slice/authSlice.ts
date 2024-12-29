import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8081";

interface User {
  id: string;
  name: string;
  role: string;
  // them
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterResponse {
  user: User;
  token: string;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/auth/login`,
      credentials
    );
    const { token, user } = response.data;

    localStorage.setItem("token", token);

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("An error occurred during login");
  }
});

export const register = createAsyncThunk<
  RegisterResponse,
  { name: string; email: string; password: string },
  { rejectValue: string }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${API_URL}/auth/register`,
      userData
    );
    const { token, user } = response.data;

    localStorage.setItem("token", token);

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("An error occurred during registration");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },
    validateAuth: (state) => {
      const token = localStorage.getItem("token");
      if (!token) {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        delete axios.defaults.headers.common["Authorization"];
      } else {
        state.isAuthenticated = true;
        state.token = token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { logout, validateAuth, clearError } = authSlice.actions;
export default authSlice.reducer;
