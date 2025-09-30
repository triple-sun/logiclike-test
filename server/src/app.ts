import express from "express";

import { notFoundHandlerMiddleware } from "./middleware/not-found-handler.middleware";
import rTracer from "cls-rtracer";
import { LoggerService } from "./services/logger.service";
import { setupSecurityHeaders } from "./config/security.config";
import { ErrorMonitoringService } from "./services/error-monitoring.service";
import cors from "cors";
import { compressionMiddleware } from "./middleware/compression.middleware";
import { requestLoggerMiddleware } from "./middleware/request-logger.middleware";
import { apiLimiter } from "./middleware/rate-limiter.middleware";
import { ENV } from "./config/env.config";
import { cacheMiddleware } from "./middleware/cache.middleware";
import { errorHandlerMiddleware } from "./middleware/error-handler.middleware";
import { ideaRouter } from "./routes/idea.routes";

const app = express();
// Мониторинг ошибок приложения
ErrorMonitoringService.getInstance(new LoggerService("App"));
// Безопасность
setupSecurityHeaders(app as express.Express);
app.use(cors({ origin: ENV.FRONTEND_URL }));
// Производительность
app.use(compressionMiddleware);
app.use(express.json({ limit: "10kb" }));
// Мониторинг
app.use(rTracer.expressMiddleware());
app.use(requestLoggerMiddleware);
// Rate Limiting
app.use("/api", apiLimiter);
// Пути
app.use("/api/ideas", ideaRouter);
app.use("/api/ideas", cacheMiddleware({ duration: 300 }));

// Health Check
app.get("/health", (_, res) => {
  res.json({
    status: "ok",
    timestamp: new Date(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
  });
});

app.use(notFoundHandlerMiddleware);
/** Должен идти последним */
app.use(errorHandlerMiddleware);

export default app;
