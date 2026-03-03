import { and, desc, eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import {
    education,
    experience,
    personalInfo,
    project,
    resume,
    user,
} from "../drizzle/schema";
import { Context } from "hono";
import {
    paramsUserIdValidator,
    resumeBodyValidator,
    paramsResumeIdValidator,
    resumeBodyUpdateValidator,
} from "../validators/user.validators";
import { ZodError } from "zod";

export async function getUserDataById(c: Context) {
    try {
        const userData = c.get("user");
        const rawUserId = c.req.param("userId");
        const { userId } = paramsUserIdValidator.parse({ userId: rawUserId });
        const res = await db
            .select()
            .from(user)
            .where(and(eq(user.id, userId), eq(user.id, userData.id)));
        if (res.length === 0) {
            return c.json({ success: false, message: "User does not exsits" }, 404);
        }
        return c.json({
            success: true,
            data: res[0],
            message: "User data fetched successfully",
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return c.json(
                {
                    success: false,
                    message: error.issues[0].message,
                },
                400,
            );
        }
        return c.json({ success: false, message: "Something went wrong" }, 500);
    }
}

export async function getUserAllResumes(c: Context) {
    try {
        const userData = c.get("user");
        const resumesData = await db
            .select()
            .from(resume)
            .where(eq(resume.userId, userData.id))
            .orderBy(desc(resume.createdAt));

        return c.json({
            success: true,
            data: resumesData,
            message: "Resumes data fetched successfully",
        });
    } catch (error) {
        return c.json({ success: false, message: "Something went wrong" }, 500);
    }
}

export async function createResume(c: Context) {
    try {
        const body = await c.req.json();
        const userData = c.get("user");
        const parsedBody = resumeBodyValidator.parse(body);
        const [res] = await db
            .insert(resume)
            .values({ title: parsedBody.title, userId: userData.id })
            .returning({ id: resume.id });
        return c.json(
            {
                success: true,
                data: res,
                message: "Resumes data fetched successfully",
            },
            201,
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return c.json(
                {
                    success: false,
                    message: error.issues[0].message,
                },
                400,
            );
        }
        return c.json({ success: false, message: "Something went wrong" }, 500);
    }
}

export async function deleteResume(c: Context) {
    try {
        const userData = c.get("user");
        const rawResumeId = c.req.param("resumeId");
        const parsedResumeId = paramsResumeIdValidator.parse({ resumeId: rawResumeId });
        await db
            .delete(resume)
            .where(
                and(
                    eq(resume.id, parsedResumeId.resumeId),
                    eq(resume.userId, userData.id),
                ),
            );
        return c.json(
            {
                success: true,
                message: "Resume deleted successfully",
            },
            200,
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return c.json(
                {
                    success: false,
                    message: error.issues[0].message,
                },
                400,
            );
        }
        return c.json({ success: false, message: "Something went wrong" }, 500);
    }
}

export async function getResumeDetailsById(c: Context) {
    try {
        const userData = c.get("user");
        const rawResumeId = c.req.param("resumeId");
        const { resumeId } = paramsResumeIdValidator.parse({ resumeId: rawResumeId });

        const [resumeData, personalInfoData, experienceData, projectData, educationData] =
            await Promise.all([
                db
                    .select()
                    .from(resume)
                    .where(and(eq(resume.id, resumeId), eq(resume.userId, userData.id))),
                db.select().from(personalInfo).where(eq(personalInfo.resumeId, resumeId)),
                db.select().from(experience).where(eq(experience.resumeId, resumeId)),
                db.select().from(project).where(eq(project.resumeId, resumeId)),
                db.select().from(education).where(eq(education.resumeId, resumeId)),
            ]);

        if (resumeData.length === 0) {
            return c.json({ success: false, message: "Resume does not exsits" }, 404);
        }
        return c.json({
            success: true,
            message: "Resume data fetched successfully",
            data: {
                resume: resumeData[0],
                personalInfo: personalInfoData[0],
                experience: experienceData,
                project: projectData,
                education: educationData,
            },
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return c.json(
                {
                    success: false,
                    message: error.issues[0].message,
                },
                400,
            );
        }
        return c.json({ success: false, message: "Something went wrong" }, 500);
    }
}

export async function getPublicResumeDetailsById(c: Context) {
    try {
        const rawResumeId = c.req.param("resumeId");
        const { resumeId } = paramsResumeIdValidator.parse({ resumeId: rawResumeId });
        const [resumeData, personalInfoData, experienceData, projectData, educationData] =
            await Promise.all([
                db
                    .select()
                    .from(resume)
                    .where(and(eq(resume.id, resumeId), eq(resume.public, true))),
                db.select().from(personalInfo).where(eq(personalInfo.resumeId, resumeId)),
                db.select().from(experience).where(eq(experience.resumeId, resumeId)),
                db.select().from(project).where(eq(project.resumeId, resumeId)),
                db.select().from(education).where(eq(education.resumeId, resumeId)),
            ]);

        if (resumeData.length === 0) {
            return c.json({ success: false, message: "Resume does not exsits" }, 404);
        }
        return c.json({
            success: true,
            message: "Resume data fetched successfully",
            data: {
                resume: resumeData[0],
                personalInfo: personalInfoData[0],
                experience: experienceData,
                project: projectData,
                education: educationData,
            },
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return c.json(
                {
                    success: false,
                    message: error.issues[0].message,
                },
                400,
            );
        }
        return c.json({ success: false, message: "Something went wrong" }, 500);
    }
}

export async function updateResume(c: Context) {
    try {
        const rawResumeId = c.req.param("resumeId");
        const userData = c.get("user");
        const { resumeId } = paramsResumeIdValidator.parse({ resumeId: rawResumeId });
        const rawBody = await c.req.json();
        const parsedBody = resumeBodyUpdateValidator.parse(rawBody);

        const [targetResume] = await db
            .select()
            .from(resume)
            .where(and(eq(resume.id, resumeId), eq(resume.userId, userData.id)));
        if (!targetResume) {
            return c.json(
                {
                    message: "You are not authorized to update this resource",
                    success: false,
                },
                403,
            );
        }

        const batchQueries: any[] = [
            db
                .update(resume)
                .set({
                    ...(parsedBody.title && { title: parsedBody.title }),
                    ...(parsedBody.template && { template: parsedBody.template }),
                    ...(parsedBody.public !== undefined && { public: parsedBody.public }),
                    ...(parsedBody.accentColor && {
                        accentColor: parsedBody.accentColor,
                    }),
                    ...(parsedBody.professionalSummary && {
                        professionalSummary: parsedBody.professionalSummary,
                    }),
                    ...(parsedBody.skills && { skills: parsedBody.skills }),
                })
                .where(and(eq(resume.id, resumeId), eq(resume.userId, userData.id))),
        ];

        if (parsedBody.personalInfo) {
            batchQueries.push(
                db
                    .insert(personalInfo)
                    .values({ resumeId: resumeId, ...parsedBody.personalInfo })
                    .onConflictDoUpdate({
                        target: personalInfo.resumeId,
                        set: parsedBody.personalInfo,
                    }),
            );
        }

        if (parsedBody.experience) {
            batchQueries.push(
                db.delete(experience).where(eq(experience.resumeId, resumeId)),
            );
            if (parsedBody.experience.length > 0) {
                batchQueries.push(
                    db.insert(experience).values(
                        parsedBody.experience.map((exp) => ({
                            ...exp,
                            resumeId: resumeId,
                        })),
                    ),
                );
            }
        }

        if (parsedBody.education) {
            batchQueries.push(
                db.delete(education).where(eq(education.resumeId, resumeId)),
            );
            if (parsedBody.education.length > 0) {
                batchQueries.push(
                    db.insert(education).values(
                        parsedBody.education.map((edu) => ({
                            ...edu,
                            resumeId: resumeId,
                        })),
                    ),
                );
            }
        }

        if (parsedBody.project) {
            batchQueries.push(db.delete(project).where(eq(project.resumeId, resumeId)));
            if (parsedBody.project.length > 0) {
                batchQueries.push(
                    db.insert(project).values(
                        parsedBody.project.map((prj) => ({
                            ...prj,
                            resumeId: resumeId,
                        })),
                    ),
                );
            }
        }

        await db.batch(batchQueries as any);
        return c.json({ success: true, message: "Resume data updated successfully" });
    } catch (error) {
        if (error instanceof ZodError) {
            return c.json(
                {
                    success: false,
                    message: error.issues[0].message,
                },
                400,
            );
        }
        return c.json({ success: false, message: "Something went wrong" }, 500);
    }
}
