import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { initUserModel } from "../models/user.js";
import { sequelize } from "../db/index.js";

const User = sequelize.models.User || initUserModel(sequelize);

const { JWT_SECRET = "dev_secret", JWT_EXPIRES_IN = "1h" } = process.env;

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw HttpError(401, "Email or password is wrong");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw HttpError(401, "Email or password is wrong");
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await user.update({ token });

        return res.status(200).json({
            token,
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