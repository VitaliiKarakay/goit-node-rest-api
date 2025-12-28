import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { initUserModel } from "../models/user.js";
import { sequelize } from "../db/index.js";

const User = sequelize.models.User || initUserModel(sequelize);
const { JWT_SECRET = "dev_secret" } = process.env;

export default async function authenticate(req, res, next) {
    try {
        const { authorization = "" } = req.headers;
        const [scheme, token] = authorization.split(" ");

        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({ message: "Not authorized" });
        }

        let payload;
        try {
            payload = jwt.verify(token, JWT_SECRET);
        } catch {
            return res.status(401).json({ message: "Not authorized" });
        }

        const user = await User.findByPk(payload.id);
        if (!user || user.token !== token) {
            return res.status(401).json({ message: "Not authorized" });
        }

        req.user = { id: user.id, email: user.email, subscription: user.subscription };
        next();
    } catch (err) {
        next(err);
    }
}