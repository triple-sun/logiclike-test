import { ValidationError } from "../utils/error-handler";
import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validateRequestMiddleware = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
        headers: req.headers,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(
          new ValidationError(error.errors[0]?.message || "Ошибка валидации")
        );
        return;
      }
      next(new ValidationError("Ошибка валидации запроса"));
    }
  };
};
