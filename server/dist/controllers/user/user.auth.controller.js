import { loginUserService, registerUserService, } from "../../service/user.service.js";
export const registerUser = async (req, res) => {
    try {
        const { token, email } = await registerUserService(req.body);
        res.cookie("token", token);
        return res.status(201).json({
            message: "Account created successfully",
            token,
            user: {
                email,
            },
        });
    }
    catch (error) {
        if (error.message === "Email is already registered") {
            return res.status(409).json({
                message: error.message,
            });
        }
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { token, existingUser } = await loginUserService(req.body);
        res.cookie("token", token);
        return res.status(200).json({
            message: "Login Successfull",
            token,
            user: {
                email: existingUser.email,
            },
        });
    }
    catch (error) {
        if (error.message === "User Not Found") {
            return res.status(404).json({
                message: error.message,
            });
        }
        else if (error.message === "Invalid Credentials") {
            return res.status(403).json({
                message: error.message,
            });
        }
        else {
            console.log(error);
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
};
//# sourceMappingURL=user.auth.controller.js.map