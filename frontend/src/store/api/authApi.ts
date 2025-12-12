import type { RootState } from "@/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  LoginRequest,
  User,
  SignupRequest,
  AuthResponse,
} from "@/lib/types";

const LS_KEY = "yuvax_auth";

type LocalAuth = { user?: User | null; token?: string | null };

type UnknownRecord = Record<string, unknown>;
const isRecord = (v: unknown): v is UnknownRecord => typeof v === "object" && v !== null;

const normalizeMeResponse = (resp: unknown): User | null => {
  if (!isRecord(resp)) return null;

  // Prefer nested: { data: { user } }
  const data = (resp as UnknownRecord).data;
  if (isRecord(data) && "user" in data) {
    const u = (data as UnknownRecord).user as User | null | undefined;
    return u ?? null;
  }

  // Fallback: { user }
  if ("user" in resp) {
    const u = (resp as { user?: User | null }).user;
    return u ?? null;
  }

  return null;
};

const saveAuthToLS = (data: LocalAuth | null) => {
  try {
    if (typeof window === "undefined") return;
    if (!data) return localStorage.removeItem(LS_KEY);
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch { }
};

const getTokenFromLS = (): string | null => {
  try {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LocalAuth;
    return parsed?.token ?? null;
  } catch {
    return null;
  }
};

// type guard
const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

// extract payload safely without any
const extractAuthPayload = (resp: unknown): LocalAuth => {
  if (!isObject(resp)) return { user: null, token: null };

  // backend may return { data: { user, token } } or { user, token }
  const maybeData = resp.data;
  const payload = isObject(maybeData) ? maybeData : resp;

  const user = isObject(payload) && "user" in payload ? (payload.user as User | null) : null;
  const token = isObject(payload) && "token" in payload ? (payload.token as string | null) : null;

  return { user, token };
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const tokenFromState = state.auth?.token ?? null;
      const token = tokenFromState ?? getTokenFromLS();
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (body) => ({ url: "/api/auth/signup", method: "POST", body }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const auth = extractAuthPayload(data);
          saveAuthToLS(auth);
        } catch {
          /* ignore */
        }
      },
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({ url: "/api/auth/login", method: "POST", body: credentials }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const auth = extractAuthPayload(data);
          saveAuthToLS(auth);
        } catch {
          /* ignore */
        }
      },
    }),
    me: builder.query<User | null, void>({
      query: () => ({
        url: "/api/auth/me",
        // credentials: "include" as const, // send cookies ONLY for this request
        method: "GET",
      }),
      transformResponse: (resp: unknown): User | null => normalizeMeResponse(resp),
      providesTags: ["User"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: "/api/auth/logout", method: "POST" }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          try {
            if (typeof window !== "undefined") localStorage.removeItem(LS_KEY);
          } catch { }
        }
      },
    }),
    resetPassword: builder.mutation<void, { currentPassword: string; newPassword: string }>({
      query: (body) => {
        const token = getTokenFromLS();
        const headers: Record<string, string> = {};
        if (token) headers.authorization = `Bearer ${token}`;
        return { url: "/api/auth/reset-password", method: "POST", body, headers };
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useMeQuery,
  useLogoutMutation,
  useResetPasswordMutation,
} = authApi;
