import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  DyteApiConfig,
  CreateMeetingRequest,
  CreateMeetingResponse,
  AddParticipantRequest,
  AddParticipantResponse,
  GetMeetingResponse,
  DyteApiResponse
} from '../types/dyte.types';

class DyteService {
  private client: AxiosInstance;
  private config: DyteApiConfig;

  constructor() {
    this.config = {
      orgId: process.env.DYTE_ORG_ID!,
      apiKey: process.env.DYTE_API_KEY!,
      baseUrl: process.env.DYTE_BASE_URL || 'https://api.dyte.io/v2'
    };

    if (!this.config.orgId || !this.config.apiKey) {
      throw new Error('Dyte configuration missing. Please check DYTE_ORG_ID and DYTE_API_KEY environment variables.');
    }

    this.client = axios.create({
      baseURL: this.config.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${this.config.orgId}:${this.config.apiKey}`).toString('base64')}`
      },
      timeout: 30000
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('Dyte API Error:', error.response?.data || error.message);
        throw error;
      }
    );
  }

  async createMeeting(meetingData: CreateMeetingRequest): Promise<CreateMeetingResponse> {
    try {
      const payload = {
        title: meetingData.title,
        preferred_region: meetingData.preferred_region || 'ap-south-1',
        record_on_start: meetingData.record_on_start || false,
        live_stream_on_start: meetingData.live_stream_on_start || false,
        max_participants: meetingData.max_participants || 100
      };

      const response: AxiosResponse<CreateMeetingResponse> = await this.client.post('/meetings', payload);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to create meeting: ${error.response?.data?.message || error.message}`);
    }
  }

  async addParticipant(meetingId: string, participantData: AddParticipantRequest): Promise<AddParticipantResponse> {
    try {
      const payload = {
        name: participantData.name,
        picture: participantData.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(participantData.name)}&background=random`,
        preset_name: participantData.preset_name || 'default_preset',
        custom_participant_id: participantData.custom_participant_id
      };

      const response: AxiosResponse<AddParticipantResponse> = await this.client.post(
        `/meetings/${meetingId}/participants`,
        payload
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to add participant: ${error.response?.data?.message || error.message}`);
    }
  }

  async getMeeting(meetingId: string): Promise<GetMeetingResponse> {
    try {
      const response: AxiosResponse<GetMeetingResponse> = await this.client.get(`/meetings/${meetingId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get meeting: ${error.response?.data?.message || error.message}`);
    }
  }

  async deleteMeeting(meetingId: string): Promise<void> {
    try {
      await this.client.delete(`/meetings/${meetingId}`);
    } catch (error: any) {
      throw new Error(`Failed to delete meeting: ${error.response?.data?.message || error.message}`);
    }
  }

  async getOrganization(): Promise<any> {
    try {
      const response = await this.client.get('/organizations');
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get organization: ${error.response?.data?.message || error.message}`);
    }
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      await this.getOrganization();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new DyteService();