import { PrismaClient } from "@prisma/client";

// Ensure a robust singleton across dev hot-reloads
// Ref: https://www.prisma.io/docs/guides/performance-and-optimization/connection-management
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Build datasource URL with pool options if not present
function getDatasourceUrl(): string | undefined {
  const base = process.env.DATABASE_URL;
  if (!base) return undefined;

  const max = process.env.DB_POOL_MAX || "20";
  const timeout = process.env.DB_POOL_TIMEOUT_MS || "30000";

  try {
    const u = new URL(base);
    const sp = u.searchParams;
    if (!sp.get("connection_limit")) sp.set("connection_limit", String(max));
    if (!sp.get("pool_timeout")) sp.set("pool_timeout", String(timeout));
    u.search = sp.toString();
    return u.toString();
  } catch {
    const sep = base.includes("?") ? "&" : "?";
    return `${base}${sep}connection_limit=${encodeURIComponent(max)}&pool_timeout=${encodeURIComponent(timeout)}`;
  }
}

const prismaInstance =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasourceUrl: getDatasourceUrl(),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaInstance;

export function getPrismaClient(): PrismaClient {
  return prismaInstance;
}

export async function connectDB(): Promise<void> {
  try {
    await getPrismaClient().$connect();
    console.log("✅ Connected to PostgreSQL via Prisma");
  } catch (err) {
    console.error("❌ Failed to connect to the database:", err);
    process.exit(1); // stop the app if DB isn’t reachable
  }
}

export async function disconnectDB(): Promise<void> {
  try {
    await getPrismaClient().$disconnect();
    console.log("🔌 Disconnected from PostgreSQL");
  } catch (err) {
    console.error("❌ Failed to disconnect database:", err);
  }
}
