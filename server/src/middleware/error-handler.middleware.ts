import { Request, Response, NextFunction } from "express";
import rTracer from 'cls-rtracer';
import { logger } from "../config/logger.config";
import { ApiResponse } from "../utils/api-response";
import { AppError } from "../utils/app-error";


export const errorHandlerMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error({
    message: error.message,
    stack: error.stack,
    context: "ErrorHandler",
    requestId: rTracer.id(),
  });

  if (error instanceof AppError) {
    ApiResponse.error(res, error.message, error.statusCode);
    return;
  }

  ApiResponse.error(res, "Internal server error", 500);
};
