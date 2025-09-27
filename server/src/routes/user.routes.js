import { Router } from "express";
import { registerUser } from "../controllers/user.auth.controller.js";
import { validateData } from "../middlewares/auth.middleware.js";
import { userRegisterSchema } from "../types/user.js";

const router = Router();

router.post("/user/auth", validateData(userRegisterSchema), registerUser);

export default router;
