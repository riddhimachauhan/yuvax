import { z } from "zod";

export const step1Schema = z.object({
  first_name: z.string().min(2, "First name is too short"),
  last_name: z.string().min(2, "Last name is too short"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone number"),
  role: z.enum(["Student"])
});

export const step2Schema = z.object({
  dob: z.string().nonempty("Date of Birth is required"),
  country: z.string().nonempty("Country is required"),
  gender: z.enum(["male", "female"], { required_error: "Select gender" }),
});

export const step3Schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
