import { AppError } from "../utils/app-error";
import { ErrorCode } from "../utils/error-codes";
import { VoterService } from "./voter.service";
import { LoggerService } from "./logger.service";
import { PrismaClient, Prisma } from "@prisma/client";

export class IdeaService {
  constructor(
    private readonly logger: LoggerService,
    private readonly prisma: PrismaClient,
    private readonly voterService: VoterService
  ) {}

  async findById(id: string) {
    const idea = await this.prisma.idea.findUnique({
      where: { id },
    });

    if (!idea) throw new AppError(`Идея не найдена`, 404, ErrorCode.NOT_FOUND);

    return idea;
  }

  async findMany(voterIp: string, where?: Prisma.IdeaWhereInput) {
    const ideas = await this.prisma.idea.findMany({
      where,
      orderBy: {
        votes: { _count: "desc" },
      },
      select: {
        id: true,
        title: true,
        text: true,
        votes: {
          select: {
            voter: { select: { ip: true } },
          },
        },
      },
    });

    return ideas.map((idea) => ({
      ...idea,
      canVote: !idea.votes.some((v) => v.voter.ip === voterIp),
    }));
  }

  async addVote(ideaId: string, voterIp: string) {
    this.logger.info(
      `Получен запрос голосования от [${voterIp}] за идею [${ideaId}]`
    );
    /** Получаем сущности */
    const idea = await this.findById(ideaId);
    const voter = await this.voterService.findOrCreateVoter(voterIp);

    /** Проверяем, что голосующий отдал не более 10 голосов */
    if (voter.votes.length === 10) {
      throw new AppError(`Превышен лимит голосований`, 409, ErrorCode.CONFLICT);
    }

    /** Проверяем, что за идею еще не голосовали */
    if (voter.votes.some((v) => v.ideaId === idea.id)) {
      throw new AppError(
        `За идею можно проголосовать только один раз`,
        409,
        ErrorCode.CONFLICT
      );
    }

    /** Если все ок - записываем голос */
    const created = this.prisma.voteEvent.create({
      data: {
        idea: { connect: { id: idea.id } },
        voter: { connect: { id: voter.id } },
      },
    });

    this.logger.info(
      `Записан голос от [${voterIp}] за идею [${idea.id}]:[${idea.title}]`
    );

    return { ...created, canVote: false };
  }
}
