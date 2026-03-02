import { Hono } from "hono";
import {
    getUserDataById,
    getUserAllResumes,
    createResume,
    deleteResume,
    getResumeDetailsById,
    getPublicResumeDetailsById,
    updateResume,
} from "../controllers/user.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRouter = new Hono();

userRouter.get("/resume/public/:resumeId", getPublicResumeDetailsById);

userRouter.use("/*", authMiddleware);
userRouter.get("/resume/:resumeId", getResumeDetailsById);
userRouter.get("/resume", getUserAllResumes);
userRouter.post("/resume", createResume);
userRouter.delete("/resume/:resumeId", deleteResume);
userRouter.put("/resume/:resumeId", updateResume);

userRouter.get("/profile/:userId", getUserDataById);

export { userRouter };
