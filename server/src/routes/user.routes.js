import { Router } from "express";
import {
  loginUser,
  registerUser,
} from "../controllers/user/user.auth.controller.js";
import { validateData } from "../middlewares/auth.middleware.js";
import { userRegisterSchema } from "../types/user.js";

const router = Router();

router.post("/user/register", validateData(userRegisterSchema), registerUser);
router.post("/user/login", validateData(userRegisterSchema), loginUser);

export default router;
