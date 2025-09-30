import { PrismaClient } from "@prisma/client";

export class VoterService {
  constructor(private readonly prisma: PrismaClient) {}

  async findOrCreateVoter(ip: string) {
    const voter = await this.prisma.voter.findUnique({
      where: { ip },
      select: {
        id: true,
        votes: true,
      },
    });

    /** Если не найден такой ip - создаем */
    if (!voter) {
      return this.prisma.voter.create({
        data: { ip },
        select: {
          id: true,
          votes: true,
        },
      });
    }

    return voter;
  }
}
