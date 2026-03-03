import { and, eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { user } from "../drizzle/schema";
import { Context } from "hono";
import { paramsUserIdValidator } from "../validators/validators";
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
