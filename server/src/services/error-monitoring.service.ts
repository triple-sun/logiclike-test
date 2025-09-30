import { AppError, isAppError } from "../utils/app-error";
import { ENV } from "../config/env.config";
import { LoggerService } from "./logger.service";
import rTracer from "cls-rtracer";

export class ErrorMonitoringService {
  private static instance: ErrorMonitoringService;

  private constructor(private readonly logger: LoggerService) {
    process.on("uncaughtException", this.handleUncaughtException);
    process.on("unhandledRejection", this.handleUnhandledRejection);
  }

  public static getInstance(logger: LoggerService): ErrorMonitoringService {
    if (!ErrorMonitoringService.instance) {
      ErrorMonitoringService.instance = new ErrorMonitoringService(logger);
    }
    return ErrorMonitoringService.instance;
  }

  private formatError(error: Error | AppError, request?: any) {
    const baseError = {
      message: error.message,
      stack: ENV.NODE_ENV === "development" ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    };

    if (isAppError(error)) {
      return {
        ...baseError,
        code: error.code,
        statusCode: error.statusCode,
        isOperational: error.isOperational,
        details: error.details,
        request: request
          ? {
              requestId: rTracer.id(),
              url: request.url,
              method: request.method,
              params: request.params,
              query: request.query,
              body: request.body,
              userId: request.user?.id,
            }
          : undefined,
      };
    }

    return baseError;
  }

  private handleUncaughtException = (error: Error) => {
    const formattedError = JSON.stringify(this.formatError(error), null, 2);
    this.logger.error(
      "UNCAUGHT EXCEPTION! Shutting down...\n" + formattedError
    );
    process.exit(1);
  };

  private handleUnhandledRejection = (reason: any) => {
    const formattedError = this.formatError(
      reason instanceof Error ? reason : new Error(String(reason))
    );
    this.logger.error(
      "UNHANDLED REJECTION! Shutting down...\n" +
        JSON.stringify(formattedError, null, 2)
    );
    process.exit(1);
  };
}
