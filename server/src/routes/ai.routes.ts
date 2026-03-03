import { Hono } from "hono";
import { enhanceProfessionalSummary } from "../controllers/ai.controllers";

const aiRouter = new Hono();

aiRouter.post("/professional-summary", enhanceProfessionalSummary);

export { aiRouter };
