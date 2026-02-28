import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./lib/auth";
// import { logger } from "hono/logger";
import { createMiddleware } from "hono/factory";


const authLogger = createMiddleware(async function (c, next) {
    console.log("Auth hit", c.req.path);
    await next();
});

const app = new Hono();
// app.use(logger());

app.use(
    "/api/*",
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);

app.on(["POST", "GET"], "/api/auth/*", authLogger, (c) => auth.handler(c.req.raw));

app.get("/api/check", (c) => {
    return c.json("Hello Hono!");
});

export default app;
