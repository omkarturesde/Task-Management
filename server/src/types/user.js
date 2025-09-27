import z from "zod";

export const userRegisterSchema = z.object({
  username: z
    .string()
    .regex(/^[A-Za-z ]+$/, "Only alphabets and spaces allowed")
    .optional(),
  email: z.email("Email is not valid"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
