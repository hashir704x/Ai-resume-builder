import z from "zod";

export const paramsUserIdValidator = z.object({
    userId: z.string().min(5).max(50)
})
