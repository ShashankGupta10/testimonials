import { z } from "zod";

const signupSchema = z.object({
    username: z.string(),
    password: z.string(),
    name: z.string(),
});

const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
});

const spaceSchema = z.object({
    spaceName: z.string(),
    headerTitle: z.string(),
    customMessage: z.string(),
    questions: z.array(z.string()),
})

type RegisterUserType = z.infer<typeof signupSchema>;
type LoginUserType = z.infer<typeof loginSchema>;
type SpaceType = z.infer<typeof spaceSchema>;

export { signupSchema, loginSchema, spaceSchema };
export type { RegisterUserType, LoginUserType, SpaceType };