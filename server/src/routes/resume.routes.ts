import { Hono } from "hono";
import {
    getResumeDetailsById,
    getUserAllResumes,
    createResume,
    deleteResume,
    updateResume,
    getPublicResumeDetailsById,
} from "../controllers/resume.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const resumeRouter = new Hono();

// public
resumeRouter.get("/public/:resumeId", getPublicResumeDetailsById);

// protected
resumeRouter.use("/*", authMiddleware);
resumeRouter.get("/", getUserAllResumes);
resumeRouter.post("/", createResume);
resumeRouter.get("/:resumeId", getResumeDetailsById);
resumeRouter.delete("/:resumeId", deleteResume);
resumeRouter.put("/:resumeId", updateResume);

export { resumeRouter };
