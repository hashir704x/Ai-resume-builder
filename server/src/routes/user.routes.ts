import { Hono } from "hono";
import { getUserDataById } from "../controllers/user.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";


const userRouter = new Hono();

userRouter.use("/*", authMiddleware);

userRouter.get("/:userId", getUserDataById);

export { userRouter };
