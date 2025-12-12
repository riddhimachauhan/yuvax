// src/ws/annotations.ts
import { WebSocketServer, WebSocket } from 'ws';
import type { Server as HTTPServer } from 'http';
// Optional hardened verify if you issue your own token:
// import jwt from 'jsonwebtoken';

type Tool = 'pen' | 'eraser';
type AnnEvent =
  | { _ann: true; kind: 'start'; id: string; x: number; y: number; color: string; size: number; tool: Tool; clientId: string }
  | { _ann: true; kind: 'move'; id: string; x: number; y: number; clientId: string }
  | { _ann: true; kind: 'end'; id: string; clientId: string };

const rooms = new Map<string, Set<WebSocket>>();

function getRoom(sessionId: string) {
  if (!rooms.has(sessionId)) rooms.set(sessionId, new Set<WebSocket>());
  return rooms.get(sessionId)!;
}

// MVP verification: accept any non-empty token (dev/local)
// For production, replace with a JWT you issue, not Dyte's.
// Verifying Dyte’s JWT signature requires Dyte’s public keys/JWKs.
function verifyAnnotationToken(token: string, sessionId: string): boolean {
  if (process.env.ANNOTATION_TOKEN_MODE === 'insecure-dev') {
    return typeof token === 'string' && token.length > 0;
  }

  // Example hardened path (if you issue your own jwt)
  // try {
  //   const payload = jwt.verify(token, process.env.ANNOTATION_JWT_SECRET!) as any;
  //   return payload && payload.sessionId === sessionId;
  // } catch {
  //   return false;
  // }

  // Default to dev-like behavior if not configured
  return typeof token === 'string' && token.length > 0;
}

function isValidAnnEvent(data: any): data is AnnEvent {
  if (!data || data._ann !== true || typeof data.kind !== 'string') return false;
  if (data.kind === 'start') return ['id','x','y','color','size','tool','clientId'].every(k => k in data);
  if (data.kind === 'move') return ['id','x','y','clientId'].every(k => k in data);
  if (data.kind === 'end') return ['id','clientId'].every(k => k in data);
  return false;
}

export function attachAnnotationWSS(server: HTTPServer) {
  const wss = new WebSocketServer({ server, path: '/ws/annotations' });

  wss.on('connection', (ws, req) => {
    try {
      const url = new URL(req.url || '', `http://${req.headers.host}` );
      const sessionId = url.searchParams.get('sessionId') || '';
      const token = url.searchParams.get('token') || '';

      if (!sessionId || !verifyAnnotationToken(token, sessionId)) {
        ws.close(4001, 'Unauthorized');
        return;
      }

      const room = getRoom(sessionId);
      room.add(ws);

      ws.on('message', (msg) => {
        let data: any;
        try { data = JSON.parse(msg.toString()); } catch { return; }
        if (!isValidAnnEvent(data)) return;

        // broadcast to others
        for (const client of room) {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            try { client.send(JSON.stringify(data)); } catch {}
          }
        }
      });

      ws.on('close', () => {
        room.delete(ws);
        if (room.size === 0) rooms.delete(sessionId);
      });
    } catch {
      try { ws.close(1011, 'Internal error'); } catch {}
    }
  });
}
