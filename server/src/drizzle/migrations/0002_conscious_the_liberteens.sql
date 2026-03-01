CREATE TABLE "education" (
	"id" serial PRIMARY KEY NOT NULL,
	"institution" text,
	"degree" text,
	"field" text,
	"graduationDate" text,
	"gpa" text,
	"resumeId" uuid
);
--> statement-breakpoint
CREATE TABLE "experience" (
	"id" serial PRIMARY KEY NOT NULL,
	"company" text NOT NULL,
	"position" text,
	"startDate" text,
	"endDate" text,
	"description" text,
	"isCurrent" boolean,
	"resumeId" uuid
);
--> statement-breakpoint
CREATE TABLE "personalInfo" (
	"resumeId" uuid PRIMARY KEY NOT NULL,
	"image" text,
	"fullname" text,
	"profession" text,
	"email" text,
	"phone" text,
	"location" text,
	"linkedIn" text,
	"website" text
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text,
	"description" text,
	"resumeId" uuid
);
--> statement-breakpoint
CREATE TABLE "resume" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"public" boolean DEFAULT false NOT NULL,
	"template" text DEFAULT 'classic' NOT NULL,
	"accentColor" text DEFAULT '#3B82F6' NOT NULL,
	"professionalSummary" text,
	"skills" text[],
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "education" ADD CONSTRAINT "education_resumeId_resume_id_fk" FOREIGN KEY ("resumeId") REFERENCES "public"."resume"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience" ADD CONSTRAINT "experience_resumeId_resume_id_fk" FOREIGN KEY ("resumeId") REFERENCES "public"."resume"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personalInfo" ADD CONSTRAINT "personalInfo_resumeId_resume_id_fk" FOREIGN KEY ("resumeId") REFERENCES "public"."resume"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_resumeId_resume_id_fk" FOREIGN KEY ("resumeId") REFERENCES "public"."resume"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resume" ADD CONSTRAINT "resume_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;