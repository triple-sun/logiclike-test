import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { ENV } from "./env.config";
import rTracer from "cls-rtracer";

const logLevel = ENV.NODE_ENV === "production" ? "info" : "debug";

// a custom format that outputs request id
const rTracerFormat = winston.format.printf((info) => {
  const rid = rTracer.id();
  return rid
    ? `${info.timestamp} [request-id:${rid}]: ${info.message}`
    : `${info.timestamp}: ${info.message}`;
});

const formatConfig = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
  winston.format.errors({ stack: true }),
  winston.format.metadata(),
  rTracerFormat
);

const transports: winston.transport[] = [
  new winston.transports.Console({
    level: logLevel,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
      winston.format.timestamp(),
      rTracerFormat
    ),
  }),
];

if (ENV.NODE_ENV === "production") {
  transports.push(
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxSize: "20m",
      maxFiles: "14d",
    }),
    new DailyRotateFile({
      filename: "logs/combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
    })
  );
}

export const logger = winston.createLogger({
  level: ENV.NODE_ENV === "production" ? "info" : "debug",
  format: formatConfig,
  transports,
});
