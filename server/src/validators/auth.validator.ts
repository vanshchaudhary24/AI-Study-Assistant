import { z } from "zod";
const passwordSchema = z
  .string()
  .min(8, "Password must contain at least 8 characters.")
  .regex(/[A-Z]/, "Password must contain one uppercase letter.")
  .regex(/[a-z]/, "Password must contain one lowercase letter.")
  .regex(/[0-9]/, "Password must contain one number.");

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters.")
    .max(50, "Full name cannot exceed 50 characters."),

  email: z.string()
    .email("Invalid email address."),

  password: passwordSchema,
    
});

export const verifyOTPSchema = z.object({
  email: z.string().email(),

  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits."),
});

export const changePasswordSchema = z.object({
  oldPassword: passwordSchema,

  newPassword: passwordSchema,
});

export const loginSchema = z.object({
  email: z.string().email(),

  password: z.string().min(8),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),

  otp: z.string().length(6),

  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/),
});

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters.")
    .max(50, "Full name cannot exceed 50 characters.")
    .optional(),

  avatar: z.string().url("Invalid avatar URL.").optional(),
});