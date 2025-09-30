import dotenv from "dotenv";
import app from "./app";
import prisma from "./config/database.config";
import { ENV } from "./config/env.config";
import { logger } from "./config/logger.config";

dotenv.config({ path: `../.env` });

const server = app.listen(ENV.API_PORT, () => {
  logger.info(`Server running on port ${ENV.API_PORT} in ${ENV.NODE_ENV} mode`);
});

// Graceful shutdown handler
const shutdown = async () => {
  logger.info("Shutdown signal received");
  // Add connection draining
  app.disable("connection"); // Stop accepting new connections
  // Add timeout for existing connections
  const connectionDrainTimeout = setTimeout(() => {
    logger.warn("Connection drain timeout reached, forcing shutdown");
    process.exit(1);
  }, 10000);

  server.close(async () => {
    logger.info("HTTP server closed");

    try {
      await prisma.$disconnect();
      logger.info("Database connections closed");

      process.exit(0);
    } catch (err) {
      logger.error("Error during shutdown:", err);
      process.exit(1);
    }
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    logger.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 30000);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

export default server;
