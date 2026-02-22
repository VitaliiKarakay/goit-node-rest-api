import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import { initUserModel } from "../models/user.js";
import { sequelize } from "../db/index.js";
import HttpError from "../helpers/HttpError.js";

const User = sequelize.models.User || initUserModel(sequelize);
const { JWT_SECRET = "dev_secret" } = process.env;

export async function registerUser(email, password) {
    const existing = await User.findOne({ where: { email } });
    if (existing) {
        throw HttpError(409, "Email in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const avatarURL = gravatar.url(email, { s: '250', d: 'retro' }, true);

    const user = await User.create({
        email,
        password: hashedPassword,
        subscription: "starter",
        token: null,
        avatarURL,
    });

    return {
        email: user.email,
        subscription: user.subscription,
    };
}

export async function loginUser(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw HttpError(401, "Email or password is wrong");
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });
    await user.update({ token });

    return {
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    };
}

export async function logoutUser(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
        throw HttpError(401, "Not authorized");
    }

    await user.update({ token: null });
}

export async function getCurrentUser(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
        throw HttpError(401, "Not authorized");
    }

    return {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
    };
}

export async function updateUserAvatar(userId, avatarURL) {
    await User.update({ avatarURL }, { where: { id: userId } });
    return avatarURL;
}

