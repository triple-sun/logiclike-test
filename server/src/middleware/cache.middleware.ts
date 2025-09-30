import { ENV } from "../config/env.config";
import { Request, Response, NextFunction } from "express";

interface CacheOptions {
  duration?: number;
  private?: boolean;
}

export const cacheMiddleware = (options: CacheOptions = {}) => {
  const duration = options.duration || 300; // 5 minutes default

  return (req: Request, res: Response, next: NextFunction) => {
    if (ENV.NODE_ENV === "production" && req.method === "GET") {
      res.set(
        "Cache-Control",
        `${options.private ? "private" : "public"}, max-age=${duration}`
      );
    } else {
      res.set("Cache-Control", "no-store");
    }
    next();
  };
};
