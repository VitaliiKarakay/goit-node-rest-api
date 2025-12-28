import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema } from "../schemas/authSchemas.js";
import { register } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);

export default authRouter;