import z from "zod";

export const paramsUserIdValidator = z.object({
    userId: z.string().nonempty(),
});

export const resumeBodyValidator = z.object({
    title: z.string().nonempty(),
});

export const paramsResumeIdValidator = z.object({
    resumeId: z.uuid().nonempty(),
});
