import { Request, Response, NextFunction } from "express";
import rTracer from "cls-rtracer";
import { LoggerService } from "../services/logger.service";

export const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();

  const logger = new LoggerService("RequestLogger");

  res.on("finish", () => {
    const logData = {
      requestId: rTracer.id(),
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${Date.now() - startTime}ms`,
      userAgent: req.get("user-agent"),
      ip: req.ip,
      context: "HttpRequest",
      query: Object.keys(req.query).length ? req.query : undefined,
      body: Object.keys(req.body || {}).length ? req.body : undefined,
    };

    if (res.statusCode >= 400) {
      logger.error("Неудачный запрос " + JSON.stringify(logData, null, 2));
    } else {
      logger.info("Успешный запрос" + JSON.stringify(logData, null, 2));
    }
  });

  next();
};
