import { Hono } from "hono";
import { getUserDataById } from "../controllers/user.controllers";
import { paramsUserIdValidator } from "../validators/user.validators";
import { zValidator } from "@hono/zod-validator";

const userRouter = new Hono();

userRouter.get(
    "/profile/:userId",
    zValidator("param", paramsUserIdValidator, function (result, c) {
        if (!result.success) {
            return c.json(
                {
                    success: false,
                    message: result.error.issues[0].message,
                },
                400,
            );
        }
    }),
    getUserDataById,
);

export { userRouter };
