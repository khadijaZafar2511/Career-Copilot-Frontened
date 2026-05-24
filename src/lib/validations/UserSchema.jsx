import * as z from "zod";


export const UserSchema = z.object({
  fullname: z
    .string()
    .min(3, "Name must be atleast 3 character ")
    .nonempty("Name is required"),
  username: z
    .string()
    .toLowerCase()
    .min(3, "UserName is required")
    .max(20, "Username too long")
    .nonempty(" Username is required"),
  email: z
    .email({ pattern: z.regexes.email }, "Enter a valid email")
    .toLowerCase()
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be atleast 6 character long")
    .max(50)
    .nonempty("Password is required"),
});