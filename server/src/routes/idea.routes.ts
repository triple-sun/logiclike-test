import { Router } from "express";
import { IdeaController } from "../controllers/iead.controller";
import { VoterService } from "../services/voter.service";
import { LoggerService } from "../services/logger.service";
import { IdeaService } from "../services/idea.service";
import { validateRequestMiddleware } from "../middleware/validate-request.middleware";
import { addVoteSchema } from "../schemas/idea.schema";
import prisma from "../config/database.config";
import { cacheMiddleware } from "../middleware/cache.middleware";

const router = Router();
const logger = new LoggerService("IdeaRouter");

const voterService = new VoterService(prisma);
const ideaService = new IdeaService(logger, prisma, voterService);

const ideaController = new IdeaController(ideaService);

router.get("/", cacheMiddleware({ duration: 60 }), ideaController.getAll);

router.post(
  "/:id/vote",
  validateRequestMiddleware(addVoteSchema),
  ideaController.addVote
);

export const ideaRouter = router;
