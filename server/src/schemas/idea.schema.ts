import { z } from "zod";

export const addVoteSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
