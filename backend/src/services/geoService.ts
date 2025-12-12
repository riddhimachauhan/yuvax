import geoip from "geoip-lite";

export interface GeoData {
  country?: string | null;
  region?: string | null;
  city?: string | null;
  ll?: [number, number] | null;
  timezone?: string | null;
  metro?: number | null;
  message?: string;
}

/**
 * Get geo information from IP
 */
export const getGeoInfo = (ip?: string): GeoData => {
  try {
    if (!ip || ip === "::1" || ip === "127.0.0.1") ip = "207.97.227.239";

    const geo = geoip.lookup(ip);

    if (!geo) return { message: "Geo data not found" };

    return {
      country: geo.country || null,
      region: geo.region || null,
      city: geo.city || null,
      ll: geo.ll || null,
      timezone: geo.timezone || null,
      metro: geo.metro || null,
    };
  } catch (error) {
    console.error("GeoService Error:", error);
    return { message: "Error fetching geo data" };
  }
};
