import z from "zod";
export declare const userRegisterSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=user.d.ts.map