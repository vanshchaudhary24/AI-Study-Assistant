import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .regex(/[A-Z]/, "Must contain an uppercase letter.")
  .regex(/[a-z]/, "Must contain a lowercase letter.")
  .regex(/[0-9]/, "Must contain a number.");

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters.")
      .max(50, "Full name cannot exceed 50 characters."),

    email: z
      .string()
      .email("Invalid email address."),

    password: passwordSchema,

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    }
  );

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});