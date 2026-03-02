import { Hono } from "hono";
import {
    getUserDataById,
    getUserAllResumes,
    createResume,
    deleteResume,
} from "../controllers/user.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRouter = new Hono();

userRouter.use("/*", authMiddleware);

userRouter.get("/resume", getUserAllResumes);
userRouter.post("/resume", createResume);
userRouter.delete("/resume/:resumeId", deleteResume);

userRouter.get("/profile/:userId", getUserDataById);

export { userRouter };
