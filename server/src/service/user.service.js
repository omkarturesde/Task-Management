import { User } from "../models/user.model.js";

export const createUser = async (data) => {
  const user = new User(data);
  await user.save();
  return user;
};
