import type { Prisma } from "../generated/prisma/browser";
export declare const registerUserService: (userData: Prisma.UserCreateInput) => Promise<{
    token: string;
    email: any;
}>;
export declare const loginUserService: (userData: {
    email: string;
    password: string;
}) => Promise<{
    token: string;
    existingUser: any;
}>;
//# sourceMappingURL=user.service.d.ts.map