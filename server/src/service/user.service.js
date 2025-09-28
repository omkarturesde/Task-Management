import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();
export const createUser = async (data) => {
  const user = new User(data);
  await user.save();
  return user;
};

export const registerUserService = async (data) => {
  const { email } = data;
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");
  const user = await createUser(data);
  const token = jwt.sign(
    {
      id: user._id,
      email: email,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "12h" }
  );
  return { token, user };
};

export const loginUserService = async (data) => {
  const { email, password } = data;
  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new Error("User Not Found");

  const isMatch = await existingUser.comparePassword(password);
  if (!isMatch) throw new Error("Invalid Credentials");

  const token = jwt.sign(
    { id: existingUser._id, email: email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "12h" }
  );

  return { token, data };
};
