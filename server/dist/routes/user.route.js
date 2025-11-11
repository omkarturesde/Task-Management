import { Router } from "express";
import { loginUser, registerUser, } from "../controllers/user/user.auth.controller";
import { validateData } from "../middlewares/auth.middleware";
import { userRegisterSchema } from "../types/user";
const router = Router();
router.post("/user/register", validateData(userRegisterSchema), registerUser);
router.post("/user/login", validateData(userRegisterSchema), loginUser);
export default router;
//# sourceMappingURL=user.route.js.map