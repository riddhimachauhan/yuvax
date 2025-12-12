import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

function base64url(source: Buffer) {
  return source
    .toString("base64")
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function generateJwt(clientId: string, clientSecret: string) {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    aud: `https://serviceaccount1.meritgraph.com/v1/${clientId}/api/token`,
    iss: clientId,
    expiry: 3600, // ⚠️ doc says "expiry", not "exp"
  };

  const headerEncoded = base64url(Buffer.from(JSON.stringify(header)));
  const payloadEncoded = base64url(Buffer.from(JSON.stringify(payload)));
  const data = `${headerEncoded}.${payloadEncoded}`;

  const signature = crypto
    .createHmac("sha256", clientSecret)
    .update(data)
    .digest();

  const signatureEncoded = base64url(signature);

  return `${data}.${signatureEncoded}`;
}

let tokenCache: { token: string; expiry: number } | null = null;

export async function getMeritHubToken() {
  const now = Date.now();
  if (tokenCache && now < tokenCache.expiry - 5000) {
    console.log("♻️ Returning cached access_token:", tokenCache.token);
    return tokenCache.token;
  }

  const clientId = process.env.MERITHUB_CLIENT_ID!;
  const clientSecret = process.env.MERITHUB_CLIENT_SECRET!;

  // Generate JWT
  const jwtToken = generateJwt(clientId, clientSecret);
  console.log("🔑 Generated JWT (assertion):", jwtToken);

  // Exchange JWT for access_token
  const resp = await axios.post(
    `https://serviceaccount1.meritgraph.com/v1/${clientId}/api/token`,
    new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `Bearer ${jwtToken}`, // ⚠️ Must include "Bearer"
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  console.log("✅ MeritHub Access Token Response:", resp.data);

  tokenCache = {
  token: resp.data.access_token.replace(/^Bearer\s+/i, ""), // remove extra "Bearer "
  expiry: now + (resp.data.expires_in ?? 3600) * 1000,
};

  return tokenCache.token;
}
