import { ApiResponse } from "../utils/api-response";
import { Request, Response, NextFunction } from "express";

export abstract class BaseController {
  protected async handleRequest(
    _: Request,
    res: Response,
    next: NextFunction,
    action: () => Promise<any>
  ): Promise<void> {
    try {
      const result = await action();
      ApiResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }
}
