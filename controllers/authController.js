import bcrypt from "bcryptjs";
import HttpError from "../helpers/HttpError.js";
import { initUserModel } from "../models/user.js";
import {sequelize} from "../db/index.js";

const User = sequelize.models.User || initUserModel(sequelize);

export async function register(req, res, next) {
    try {
        const { email, password } = req.body;

        const existing = await User.findOne({ where: { email } });
        if (existing) {
            throw HttpError(409, "Email in use");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            password: hashedPassword,
            subscription: "starter",
            token: null,
        });

        return res.status(201).json({
            user: {
                email: user.email,
                subscription: user.subscription,
            },
        });
    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({ message: err.message });
        }
        next(err);
    }
}