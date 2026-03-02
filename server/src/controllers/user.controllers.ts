import { desc, eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { resume, user } from "../drizzle/schema";
import { Context } from "hono";
import {
    paramsUserIdValidator,
    resumeBodyValidator,
    paramsResumeIdValidator,
} from "../validators/user.validators";
import { ZodError } from "zod";

export async function getUserDataById(c: Context) {
    try {
        const rawUserId = c.req.param("userId");
        const { userId } = paramsUserIdValidator.parse({ userId: rawUserId });
        const res = await db.select().from(user).where(eq(user.id, userId));
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
        const rawResumeId = c.req.param("resumeId");
        const parsedResumeId = paramsResumeIdValidator.parse({ resumeId: rawResumeId });
        await db.delete(resume).where(eq(resume.id, parsedResumeId.resumeId));
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
