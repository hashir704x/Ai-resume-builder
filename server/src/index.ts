import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./lib/auth";
import { logger } from "hono/logger";
import { userRouter } from "./routes/user.routes";
import { resumeRouter } from "./routes/resume.routes";
import { aiRouter } from "./routes/ai.routes";

const app = new Hono();
app.use(logger());

app.use(
    "/api/*",
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.route("/api/user", userRouter);
app.route("/api/resume", resumeRouter);
app.route("/api/ai", aiRouter);

app.get("/api/check", (c) => {
    return c.json("Hello Hono!");
});

export default app;
