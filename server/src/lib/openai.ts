import OpenAI from "openai";

if (!Bun.env.GEMINI_API_KEY || !Bun.env.GEMINI_BASE_URL) {
    throw new Error("Error!, Gemini keys are not found");
}

const openai = new OpenAI({
    apiKey: Bun.env.GEMINI_API_KEY,
    baseURL: Bun.env.GEMINI_BASE_URL,
});

export { openai };
