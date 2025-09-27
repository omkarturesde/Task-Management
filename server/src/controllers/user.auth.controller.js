import { User } from "../models/user.model.js";
import { createUser } from "../service/user.service.js";

export const registerUser = async (req, res) => {
  const { email } = req.body;

  const isUserAlreadyExists = await User.findOne({ email: email });

  if (isUserAlreadyExists) {
    res.status(409).json({
      msessage: "user already exists",
    });
  }

  const user = await createUser(req.body);
  res.status(201).json({
    message: "user created successfully",
    user,
  });
};
