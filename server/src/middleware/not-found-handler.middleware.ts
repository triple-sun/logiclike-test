import { Request, Response } from "express";
import { ApiResponse } from "../utils/api-response";

/**
 * Ставится после всех остальных путей
 */
export const notFoundHandlerMiddleware = (_: Request, res: Response) => {
  ApiResponse.error(res, "🔍 Страница не найдена 🗺️", 404);
};
