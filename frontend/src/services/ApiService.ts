import axios, { AxiosResponse, AxiosError } from "axios";
import {
  CreateMeetingResponse,
  JoinMeetingResponse,
  JoinMeetingRequest,
  MeetingConfig,
} from "../types/meeting.types";

/**
 * Shape commonly returned by your backend for error payloads.
 * Extend with additional fields your backend may return.
 */
interface BackendErrorPayload {
  message?: string;
  error?: string;
  [key: string]: unknown;
}

class ApiService {
  private baseURL: string;

  constructor() {
    // Ensure no trailing slash duplication
    this.baseURL = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000").replace(/\/+$/, "");
  }

  // Test API connection
  async testConnection(): Promise<boolean> {
    try {
      const response = await axios.get<{ success: boolean }>(`${this.baseURL}/dyte/test/connection`);
      return Boolean(response.data?.success);
    } catch (error: unknown) {
      console.error("Connection test failed:", this.extractErrorMessage(error));
      return false;
    }
  }

  // Create a new meeting
  async createMeeting(config: MeetingConfig): Promise<CreateMeetingResponse> {
    try {
      const response: AxiosResponse<CreateMeetingResponse> = await axios.post(
        `${this.baseURL}/api/dyte/meetings/create`,
        config
      );
      return response.data;
    } catch (error: unknown) {
      throw new Error(this.extractErrorMessage(error, "Failed to create meeting"));
    }
  }

  // Join a meeting
  async joinMeeting(meetingId: string, userInfo: JoinMeetingRequest): Promise<JoinMeetingResponse> {
    try {
      const response: AxiosResponse<JoinMeetingResponse> = await axios.post(
        `${this.baseURL}/api/dyte/meetings/join/${encodeURIComponent(meetingId)}`,
        userInfo
      );
      return response.data;
    } catch (error: unknown) {
      throw new Error(this.extractErrorMessage(error, "Failed to join meeting"));
    }
  }

  // Get meeting details (generic return type)
  async getMeetingDetails<T = unknown>(meetingId: string): Promise<T> {
    try {
      const response = await axios.get<T>(`${this.baseURL}/api/dyte/meetings/${encodeURIComponent(meetingId)}`);
      return response.data;
    } catch (error: unknown) {
      throw new Error(this.extractErrorMessage(error, "Failed to get meeting details"));
    }
  }

  // Test create (creates meeting + participant token)
  async testCreate(title = "Test Meeting"): Promise<CreateMeetingResponse> {
    try {
      const response: AxiosResponse<CreateMeetingResponse> = await axios.post(
        `${this.baseURL}/api/dyte/test-create`,
        { title }
      );
      return response.data;
    } catch (error: unknown) {
      throw new Error(this.extractErrorMessage(error, "Test creation failed"));
    }
  }

  /**
   * Extract a human-friendly error message from unknown error.
   * Avoids using `any` and safely checks common Axios / Error shapes.
   */
  private extractErrorMessage(err: unknown, fallback = "An error occurred"): string {
    // Axios error with possible server response body
    if (axios.isAxiosError(err)) {
      const axiosErr = err as AxiosError;
      // Try to read structured payloads safely
      const responseData = axiosErr.response?.data;
      if (responseData && typeof responseData === "object") {
        const payload = responseData as BackendErrorPayload;
        if (typeof payload.message === "string" && payload.message.trim().length > 0) {
          return payload.message;
        }
        if (typeof payload.error === "string" && payload.error.trim().length > 0) {
          return payload.error;
        }
      }
      // Fallback to axios error message
      if (axiosErr.message) return axiosErr.message;
      return fallback;
    }

    // Native Error
    if (err instanceof Error) {
      return err.message || fallback;
    }

    // Unknown non-error (attempt safe stringification)
    try {
      if (typeof err === "string") return err;
      return JSON.stringify(err) ?? fallback;
    } catch {
      return fallback;
    }
  }
}

const apiService = new ApiService();
export default apiService;
