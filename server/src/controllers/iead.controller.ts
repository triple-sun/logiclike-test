import { Request, Response, NextFunction } from "express";
import { BaseController } from "./base.controller";
import { IdeaService } from "../services/idea.service";
import { AppError } from "../utils/app-error";
import { ErrorCode } from "../utils/error-codes";

export class IdeaController extends BaseController {
  constructor(private ideaService: IdeaService) {
    super();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    await this.handleRequest(req, res, next, async () => {
      return await this.ideaService.findMany();
    });
  };

  addVote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    await this.handleRequest(req, res, next, async () => {
      const ip = Array.isArray(req.headers["x-forwarded-for"])
        ? req.headers["x-forwarded-for"][0]
        : req.headers["x-forwarded-for"] || req.ip || req.socket.remoteAddress;

      if (!ip) {
        throw new AppError(
          `IP не найден в запросе`,
          400,
          ErrorCode.BAD_REQUEST
        );
      }

      return await this.ideaService.addVote(req.params.id, ip);
    });
  };
}
