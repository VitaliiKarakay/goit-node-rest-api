import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema, resendVerifyEmailSchema } from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import { login } from "../controllers/authLoginController.js";
import { logout } from "../controllers/authLogoutController.js";
import { register } from "../controllers/authController.js";
import { current } from "../controllers/authCurrentController.js";
import { updateAvatar } from "../controllers/authAvatarController.js";
import { verify } from "../controllers/authVerifyController.js";
import { resendVerify } from "../controllers/authResendVerifyController.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.post("/logout", authenticate, logout);
authRouter.get("/current", authenticate, current);
authRouter.get("/verify/:verificationToken", verify);
authRouter.post("/verify", validateBody(resendVerifyEmailSchema), resendVerify);
authRouter.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

export default authRouter;