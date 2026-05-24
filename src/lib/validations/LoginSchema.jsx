import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .email({ pattern: z.regexes.email }, "enter a valid email")
    .toLowerCase().nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be atleast 6 character long")
    .max(50)
    .nonempty("Password is required"),
});