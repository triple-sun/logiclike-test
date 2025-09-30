import { PrismaClient } from "@prisma/client";
import { ENV } from "./env.config";

const prisma = new PrismaClient({
  // log only in development
  log: ENV.NODE_ENV === "development" ? ["query", "error", "warn"] : [],
});

// Soft shutdown handler
const handleShutdown = async () => {
  console.log("Отключаюсь от БД...");
  await prisma.$disconnect();
};

process.on("SIGTERM", handleShutdown);
process.on("SIGINT", handleShutdown);

export default prisma;
