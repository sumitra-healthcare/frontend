import { z } from "zod";

export const DoctorRegistrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100, "Full name must be at most 100 characters"),
  email: z.string().email("Invalid email address"),
  medicalRegistrationId: z.string().min(5, "Medical registration ID must be at least 5 characters").max(50, "Medical registration ID must be at most 50 characters"),
  specialty: z.string().min(2, "Specialty must be at least 2 characters").max(100, "Specialty must be at most 100 characters"),
  password: z.string().min(6, "Password must be at least 6 characters long").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[0-9]/, "Password must contain at least one number").optional().or(z.literal('')),
});

export const DoctorLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const AdminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
