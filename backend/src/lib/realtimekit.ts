import axios from "axios";

const ORG_ID = process.env.CF_ORG_ID; // Organization ID from dashboard
const API_KEY = process.env.CF_API_KEY; // API Key from dashboard

const RTK_BASE_URL = "https://api.realtime.cloudflare.com/v2";

const authHeader = {
  Authorization: `Basic ${Buffer.from(`${ORG_ID}:${API_KEY}`).toString("base64")}`,
};

export const createRealtimeMeeting = async (name: string) => {
  const res = await axios.post(
    `${RTK_BASE_URL}/meetings`,
    { title: name },
    { headers: { ...authHeader, "Content-Type": "application/json" } }
  );
  return res.data.data; // returns { id, title, ... }
};

export const addRealtimeParticipant = async (
  meetingId: string,
  customId: string,
  name: string,
  preset: string
) => {
  const res = await axios.post(
    `${RTK_BASE_URL}/meetings/${meetingId}/participants`,
    {
      name,
      preset_name: preset,
      custom_participant_id: customId,
    },
    { headers: { ...authHeader, "Content-Type": "application/json" } }
  );
  return res.data.data; // contains token
};
