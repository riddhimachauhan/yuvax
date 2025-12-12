import { RateLimiterMemory } from "rate-limiter-flexible";
import { RATE_LIMIT } from "../utils/constants";

const rateLimiter = new RateLimiterMemory({
  points: RATE_LIMIT.POINTS,
  duration: RATE_LIMIT.DURATION,
});

export const consumeRateLimit = async (key: string) => {
  try {
    const rateLimitRes = await rateLimiter.consume(key, 1);
    return {
      remainingPoints: rateLimitRes.remainingPoints,
      msBeforeNext: rateLimitRes.msBeforeNext,
    };
  } catch (err: any) {
    throw err;
  }
};
