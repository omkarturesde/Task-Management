import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { configDotenv } from "dotenv";
configDotenv();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const registerUserService = async (userData) => {
    const { email, password, ...rest } = userData;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
        throw new Error("Email is already registered");
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            ...rest,
        },
    });
    const token = jwt.sign({
        id: user.id,
        email: email,
    }, JWT_SECRET_KEY, { expiresIn: "12h" });
    return { token, email: user.email };
};
export const loginUserService = async (userData) => {
    const { email, password } = userData;
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (!existingUser)
        throw new Error("User Not Found");
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch)
        throw new Error("Invalid Credentials");
    const token = jwt.sign({ id: existingUser.id, email: existingUser.email }, JWT_SECRET_KEY, { expiresIn: "12h" });
    return { token, existingUser };
};
//# sourceMappingURL=user.service.js.map