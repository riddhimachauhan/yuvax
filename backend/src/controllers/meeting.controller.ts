import { Request, Response } from "express";
import dyteService from "../services/dyteService";
import { CreateMeetingRequest, AddParticipantRequest, DyteApiResponse } from "../types/dyte.types";

export const createMeeting = async (req: Request, res: Response<DyteApiResponse<any>>) => {
  try {
    const { title = "New Meeting", ...options }: CreateMeetingRequest = req.body;

    const meeting = await dyteService.createMeeting({
      title,
      ...options,
    });

    res.json({
      success: true,
      data: {
        id: meeting.data.id,
        title: meeting.data.title,
        status: meeting.data.status,
        created_at: meeting.data.created_at,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create meeting",
      error: error.message,
    });
  }
};

export const joinMeeting = async (req: Request, res: Response<DyteApiResponse<any>>) => {
  try {
    const { meetingId } = req.params;
    const { name, picture, custom_participant_id }: AddParticipantRequest = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const participant = await dyteService.addParticipant(meetingId, {
      name,
      picture,
      custom_participant_id: custom_participant_id || `user-${Date.now()}`,
    });

    res.json({
      success: true,
      data: {
        token: participant.data.token,
        meetingId,
        participantId: participant.data.id,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to join meeting",
      error: error.message,
    });
  }
};

export const getMeetingDetails = async (req: Request, res: Response<DyteApiResponse<any>>) => {
  try {
    const { meetingId } = req.params;
    const meeting = await dyteService.getMeeting(meetingId);

    res.json({
      success: true,
      data: meeting.data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve meeting",
      error: error.message,
    });
  }
};

export const testCreateMeeting = async (req: Request, res: Response<DyteApiResponse<any>>) => {
  try {
    const { title = "Test Meeting" } = req.body;

    const meeting = await dyteService.createMeeting({ title });

    const participant = await dyteService.addParticipant(meeting.data.id, {
      name: "Test User",
      custom_participant_id: `test-user-${Date.now()}`,
    });

    res.json({
      success: true,
      data: {
        meetingId: meeting.data.id,
        participantToken: participant.data.token,
        meetingDetails: meeting.data,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Test failed: " + error.message,
    });
  }
};

export const testConnection = async (req: Request, res: Response<DyteApiResponse<any>>) => {
  try {
    const isConnected = await dyteService.testConnection();

    if (isConnected) {
      const org = await dyteService.getOrganization();
      res.json({
        success: true,
        data: {
          connected: true,
          organization: org.data,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to connect to Dyte API",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Connection test failed",
      error: error.message,
    });
  }
};
