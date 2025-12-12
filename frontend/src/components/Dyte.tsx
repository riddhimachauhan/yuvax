"use client";

import { useEffect } from "react";
import {
  useRealtimeKitClient,
  useRealtimeKitMeeting,
  RealtimeKitProvider,
} from "@cloudflare/realtimekit-react";
import { RtkMeeting } from "@cloudflare/realtimekit-react-ui";

export default function Dyte() {
  const [meeting, initMeeting] = useRealtimeKitClient();

  useEffect(() => {
    async function joinMeeting() {
      try {
        // 1. Ask backend for participant token
        const res = await fetch("http://localhost:5000/dyte/add-participant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            meetingId: "your-meeting-id",
            name: "Yuva",
            preset: "host",
          }),
        });

        const data = await res.json();

        // 2. Pass participant token to initMeeting
        if (data.token) {
          initMeeting({
            authToken: data.token,
            defaults: { audio: false, video: false },
          });
        } else {
          console.error("No token received", data);
        }
      } catch (err) {
        console.error("Error joining meeting:", err);
      }
    }

    joinMeeting();
  }, [initMeeting]);

  function MyMeetingUI() {
    const { meeting } = useRealtimeKitMeeting();
    return (
      <div style={{ height: "480px" }}>
        <RtkMeeting mode="fill" meeting={meeting} showSetupScreen={false} />
      </div>
    );
  }

  return (
    <RealtimeKitProvider value={meeting}>
      <MyMeetingUI />
    </RealtimeKitProvider>
  );
}
