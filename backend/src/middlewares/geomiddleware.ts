
import { Request, Response, NextFunction } from "express";
import { getGeoInfo, GeoData } from "../services/geoService";
import requestIp from "request-ip";


export const attachGeoInfo = (req: Request & { geo?: GeoData }, res: Response, next: NextFunction) => {
  try {
    const ip = requestIp.getClientIp(req) || "8.8.8.8"; // fallback
    req.geo = getGeoInfo(ip);
    console.log("Visitor IP:", ip, "Geo:", req.geo);

    next();
  } catch (error) {
    console.error("Geo Middleware Error:", error);
    next(); // continue even if geo fails
  }
};
