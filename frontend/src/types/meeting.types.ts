export interface MeetingState {
  token: string;
  meetingId: string;
  joined: boolean;
  loading: boolean;
  error: string | null;
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'failed';
}

export interface CreateMeetingResponse {
  success: boolean;
  data?: {
    id: string;
    title: string;
    status: string;
    created_at: string;
    meetingId?: string;
    participantToken?: string;
  };
  message?: string;
  error?: string;
}

export interface JoinMeetingRequest {
  full_name: string;
  picture?: string;
  custom_participant_id?: string;
}

export interface JoinMeetingResponse {
  success: boolean;
  data?: {
    token: string;
    meetingId: string;
    participantId: string;
  };
  message?: string;
  error?: string;
}

export interface User {
  full_name: string;
  email?: string;
  picture?: string;
  id?: string;
}

export interface MeetingConfig {
  title: string;
  maxParticipants?: number;
  recordOnStart?: boolean;
}