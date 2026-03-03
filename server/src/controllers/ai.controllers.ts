import { Context } from "hono";
import {
    professionalSummaryValidator,
    jobDescriptionValidator,
} from "../validators/validators";
import { ZodError } from "zod";
import { openai } from "../lib/openai";

export async function enhanceProfessionalSummary(c: Context) {
    try {
        const rawBody = await c.req.json();
        const { summary } = professionalSummaryValidator.parse(rawBody);
        const response = await openai.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else.",
                },
                {
                    role: "user",
                    content: summary,
                },
            ],
        });
        const data = response.choices[0].message.content;
        return c.json({ success: true, message: "Operation successful", data: data });
    } catch (error) {
        if (error instanceof ZodError) {
            return c.json(
                {
                    success: false,
                    message: error.issues[0].message,
                },
                400,
            );
        }
        return c.json({ success: false, message: "Something went wrong" }, 500);
    }
}

export async function enhanceJobDescription(c: Context) {
    try {
        const rawBody = await c.req.json();
        const { description } = jobDescriptionValidator.parse(rawBody);

        const response = await openai.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only in 1-2 sentence also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else.",
                },
                {
                    role: "user",
                    content: description,
                },
            ],
        });
        const data = response.choices[0].message.content;
        return c.json({ success: true, message: "Operation successful", data: data });
    } catch (error) {
        if (error instanceof ZodError) {
            return c.json(
                {
                    success: false,
                    message: error.issues[0].message,
                },
                400,
            );
        }
        return c.json({ success: false, message: "Something went wrong" }, 500);
    }
}

// Full Stack Next.js developer with experience building web applications using React and Next.js. Knows JavaScript, HTML, CSS, and works with both frontend and backend development. Can create responsive designs, work with databases, and handle basic API integrations. Looking for opportunities to grow and contribute to development projects.