

import { Request, Response, NextFunction } from "express";
import { GeoData } from "../services/geoService";
import ResponseBuilder from "../utils/responseBuilder";

/**
 * GET /geo
 */
export const getGeoData = (req: Request & { geo?: GeoData }, res: Response, next: NextFunction) => {
  try {
    return ResponseBuilder.success(res, 200, "Geo data fetched successfully", req.geo);
  } catch (error) {
    next(error);
  }
};
