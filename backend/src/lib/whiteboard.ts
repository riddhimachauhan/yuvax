// src/lib/whiteboard.ts
import crypto from "crypto";

function b64url(buf: Buffer) {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function createExcalidrawRoomURL() {
  const roomId = b64url(crypto.randomBytes(12));
  const roomKey = b64url(crypto.randomBytes(16));
  // 👇 Instead of a plain https:// link, return the collaboration room link
  return `ws://localhost:5000/room/${roomId},${roomKey}`;
}
