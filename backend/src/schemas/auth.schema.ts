import {z} from "zod";

export const signInSchema = z.object({
    email: z.string({
        message: "Email is required",
    }).email("Invalid email address"),
    password: z.string({
        message: "Password is required",
    }).min(1, "Password is required"),
});
