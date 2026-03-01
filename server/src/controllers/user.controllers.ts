import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { user } from "../drizzle/schema";
import { Context } from "hono";

export async function getUserDataById(c: Context) {
    try {
        // @ts-ignore
        const { userId } = c.req.valid("param");
        const res = await db.select().from(user).where(eq(user.id, userId));
        console.log(res);
        if (res.length === 0) {
            return c.json({ success: false, message: "User does not exsits" }, 404);
        }
        return c.json({ success: true, data: res[0] });
    } catch (error) {
        console.error("Error came:", error);
        return c.json({ success: false, message: "Something went wrong" }, 500);
    }
}



