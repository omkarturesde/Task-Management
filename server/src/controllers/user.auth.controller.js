import {
  loginUserService,
  registerUserService,
} from "../service/user.service.js";

export const registerUser = async (req, res) => {
  try {
    const { token, user } = await registerUserService(req.body);
    res.cookie(token);

    return res.status(201).json({
      message: "User created Successfully",
      user,
    });
  } catch (error) {
    if (error.message === "User already exists") {
      return res.status(409).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
    });
    // console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { token, user } = await loginUserService(req.body);
    res.cookie(token);

    return res.status(200).json({
      message: "Login Successfull",
      token,
      user,
    });
  } catch (error) {
    if (error.message === "User Not Found") {
      return res.status(404).json({
        message: error.message,
      });
    } else if (error.message === "Invalid Credentials") {
      return res.status(403).json({
        message: error.message,
      });
    } else {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
    // console.log(error);
  }
};
