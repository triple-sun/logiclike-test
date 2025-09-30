-- DropForeignKey
ALTER TABLE "VoteEvent" DROP CONSTRAINT "VoteEvent_ideaId_fkey";

-- DropForeignKey
ALTER TABLE "VoteEvent" DROP CONSTRAINT "VoteEvent_voterId_fkey";

-- AddForeignKey
ALTER TABLE "VoteEvent" ADD CONSTRAINT "VoteEvent_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "Voter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteEvent" ADD CONSTRAINT "VoteEvent_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
