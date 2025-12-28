import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema } from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import { login } from "../controllers/authLoginController.js";
import { logout } from "../controllers/authLogoutController.js";
import { register } from "../controllers/authController.js";
import { loginSchema } from "../schemas/authSchemas.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.post("/logout", authenticate, logout);

export default authRouter;