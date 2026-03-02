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

