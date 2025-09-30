import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  message: {
    success: false,
    message: "Слишком много запросов, попробуйте позднее",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
