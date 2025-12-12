
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import type { RootState } from "../store";
import { SignupRequest } from "@/lib/types";
import { api } from "@/lib/apiClient";



let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (!error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as typeof error.config & { _retry?: boolean };
    const authEndpoints = ['/api/auth/login', '/api/auth/logout', '/api/auth/refresh'];
    const isAuthEndpoint = authEndpoints.some(endpoint => originalRequest.url?.includes(endpoint));

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post('/api/auth/refresh');
        isRefreshing = false;
        processQueue();
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError);

        if (typeof window !== 'undefined' && window.location.pathname !== '/') {
          window.location.href = '/';
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

interface User {
  user_id: string;
  full_name: string;
  email: string;
  role: string;
  age?: string;
  phone?: string;
  is_trial?: boolean;
  is_active?: boolean;
  [key: string]: unknown;
  country?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  token: string | null;
  tokenExpiresAt: number | null;

}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,
  token: null,
  tokenExpiresAt: null // Add this

};

// Initialize by fetching from backend (cookies will be sent automatically)
export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { rejectWithValue }) => {
    try {
      // Just ask backend who is logged in (via cookies)
      const res = await api.get('/api/auth/me', { timeout: 5000 });
      const user = res.data?.data?.user || res.data?.data;

      const expiresAt = Date.now() + (60 * 60 * 1000);


      if (user) {
        return {
          user, isAuthenticated: true, tokenExpiresAt: expiresAt
        };
      }

      return { user: null, isAuthenticated: false, tokenExpiresAt: null };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          return { user: null, isAuthenticated: false };
        }
      }
      return rejectWithValue("Could not verify authentication");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { identifier: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/auth/login', credentials);
      const user = res.data?.data?.user || res.data?.data;

      if (!user) {
        return rejectWithValue("Invalid response from server");
      }
      const expiresAt = Date.now() + (60 * 60 * 1000);

      // Backend sets cookies, we just store user in Redux
      return {
        user, isAuthenticated: true, tokenExpiresAt: expiresAt
      };

    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data?.message || "Login failed");
      }
      return rejectWithValue("Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/api/auth/logout');
      return null;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data?.message || "Logout failed");
      }
      return rejectWithValue("Logout failed");
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (signupData: SignupRequest, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/auth/signup', signupData);
      const user = res.data?.data?.user || res.data?.data;

      if (!user) {
        return rejectWithValue("Invalid response from server");
      }

      // Backend sets cookies, we just store user in Redux
      return { user, isAuthenticated: true };
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data?.message || "Signup failed");
      }
      return rejectWithValue("Signup failed");
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/auth/refresh');
      const user = res.data?.data?.user;

      // Calculate expiry time (60 mins from now)
      const expiresAt = Date.now() + (60 * 60 * 1000);

      return {
        user: user || null,
        isAuthenticated: true,
        tokenExpiresAt: expiresAt
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Token refresh failed");
      }
      return rejectWithValue("Token refresh failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    },

    clearCredentials: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
        state.isInitialized = false;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.user = action.payload?.user ?? null;
        state.isAuthenticated = action.payload?.isAuthenticated ?? false;
        state.isLoading = false;
        state.isInitialized = true;
        state.error = null;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isInitialized = true;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.tokenExpiresAt = action.payload.tokenExpiresAt;
        state.isLoading = false;
        state.error = null;

      })

      .addCase(refreshAccessToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.user = action.payload.user || state.user;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.tokenExpiresAt = action.payload.tokenExpiresAt;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.tokenExpiresAt = null;
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});


export const { setCredentials, clearCredentials, setError, clearError } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectIsInitialized = (state: RootState) => state.auth.isInitialized;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
