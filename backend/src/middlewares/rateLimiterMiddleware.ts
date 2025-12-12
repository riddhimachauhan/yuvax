
import { Request, Response, NextFunction } from "express";
import { consumeRateLimit } from "../services/rateLimiterService";

export const rateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.method === 'OPTIONS') {
      return next();
    }

    const key: string = req.user?.user_id || req.ip || "anonymous";
    
    // ⭐ Log every request
    console.log(`🔍 Rate limit check - Key: ${key}, Path: ${req.path}, Method: ${req.method}`);

    const { remainingPoints, msBeforeNext } = await consumeRateLimit(key);

    res.setHeader("X-RateLimit-Limit", "100");
    res.setHeader("X-RateLimit-Remaining", remainingPoints.toString());
    res.setHeader(
      "X-RateLimit-Reset",
      new Date(Date.now() + msBeforeNext).toISOString()
    );

    console.log(`✅ Allowed - User: ${key}, Remaining: ${remainingPoints}`);

    next();
  } catch (err: any) {
    if (err.msBeforeNext) {
      const retryAfterSeconds = Math.ceil(err.msBeforeNext / 1000);
      
      // ⭐ Log when blocked
      const key: string = req.user?.user_id || req.ip || "anonymous";
      console.log(`🚫 RATE LIMITED - Key: ${key}, Path: ${req.path}, Retry in: ${retryAfterSeconds}s`);
      
      const origin = req.headers.origin;
      const allowedOrigins = [
        "https://yuvax.tech",
        "http://localhost:3001",
        "http://localhost:3000",
      ];
      
      if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
      }
      
      res.setHeader('Retry-After', retryAfterSeconds.toString());
      
      return res.status(429).json({
        success: false,
        message: `Too Many Requests. Please try again after ${retryAfterSeconds} seconds.`,
        retryAfter: retryAfterSeconds,
      });
    }
    next(err);
  }
};