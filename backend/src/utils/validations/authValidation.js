import { z } from "zod";

const registerSchema = z
  .object({
    nama: z.string(),
    email: z.string().email("Email is invalid"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    no_hp: z.string(),
    alamat: z.string(),
    rw: z.number(),
    rt: z.number(),
    isAdmin: z.number(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export { registerSchema, loginSchema };
