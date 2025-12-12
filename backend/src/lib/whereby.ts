import axios from "axios";

export async function createWherebyRoom(endDateISO: string) {
  const resp = await axios.post(
    "https://api.whereby.dev/v1/meetings",
    {
      endDate: endDateISO,           // MUST be in the future
      roomMode: "group",             // group room (multi-party)
      fields: ["hostRoomUrl", "roomUrl"],
      isLocked: true                 // optional, keeps room locked
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHEREBY_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return resp.data as {
    meetingId: string;
    roomUrl: string;
    hostRoomUrl: string;
  };
}
