import { z } from "zod";

export const spaceSchema = z.object({
    spaceName: z.string(),
    headerTitle: z.string(),
    customMessage: z.string(),
    questions: z.array(z.string()),
    extraInfo: z.enum(["NAME", "EMAIL", "SOCIAL"]),
    stars: z.boolean(),
})

export type SpaceType = z.infer<typeof spaceSchema>;