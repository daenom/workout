// src/schemas/signup-schema.ts
import * as z from "zod";

export const signupSchema = z.object({
  firstname: z.string().min(1, "Don't you have a name"),
  lastname: z.string().optional(),
  email: z.string().email("No farzi email"),
  password: z.string().min(4, "WTF is this password"),
});

export type SignupFormValues = z.infer<typeof signupSchema>;