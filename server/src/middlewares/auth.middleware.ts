import { createMiddleware } from "hono/factory";
import { auth } from "../lib/auth";

const authMiddleware = createMiddleware(async function (c, next) {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
        return c.json({ success: false, message: "You are Unauthorized" }, 401);
    }

    c.set("user", session.user);
    await next();
});

export { authMiddleware };
