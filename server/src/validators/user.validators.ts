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

const personalInfoUpdateSchema = z.object({
    fullname: z.string().optional(),
    profession: z.string().optional(),
    email: z.email().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    linkedIn: z.string().optional(),
    website: z.string().optional(),
});

const experienceUpdateSchema = z.object({
    company: z.string().optional(),
    position: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    description: z.string().optional(),
    isCurrent: z.boolean().optional(),
});

const projectUpdateSchema = z.object({
    type: z.string().optional(),
    description: z.string().optional(),
});

const educationUpdateSchema = z.object({
    institution: z.string().optional(),
    degree: z.string().optional(),
    field: z.string().optional(),
    graduationDate: z.string().optional(),
    gpa: z.string().optional(),
});

export const resumeBodyUpdateValidator = z.object({
    title: z.string().optional(),
    public: z.boolean().optional(),
    template: z.string().optional(),
    accentColor: z.string().optional(),
    professionalSummary: z.string().optional(),
    skills: z.string().array().optional(),

    personalInfo: personalInfoUpdateSchema.optional(),
    experience: z.array(experienceUpdateSchema).optional(),
    project: z.array(projectUpdateSchema).optional(),
    education: z.array(educationUpdateSchema).optional(),
});
