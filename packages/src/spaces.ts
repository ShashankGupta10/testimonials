import { z } from "zod";

export const spaceSchema = z.object({
    spaceName: z.string(),
    headerTitle: z.string(),
    customMessage: z.string(),
    questions: z.array(z.string()),
})

export type SpaceType = z.infer<typeof spaceSchema>;