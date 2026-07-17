import { z } from "zod";

export const projectTypes = [
  { value: "brand-identity", label: "Brand Identity" },
  { value: "printing-packaging", label: "Printing & Packaging" },
  { value: "social-media", label: "Social Media" },
  { value: "other", label: "Something Else" },
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(200),
  email: z.string().trim().email("Enter a valid email address").max(320),
  projectType: z.enum([
    "brand-identity",
    "printing-packaging",
    "social-media",
    "other",
  ]),
  message: z
    .string()
    .trim()
    .min(1, "Tell me a bit about the project")
    .max(5000),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
