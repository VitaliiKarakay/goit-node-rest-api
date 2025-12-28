import HttpError from "../helpers/HttpError.js";
import { initUserModel } from "../models/user.js";
import { sequelize } from "../db/index.js";

const User = sequelize.models.User || initUserModel(sequelize);

export async function logout(req, res, next) {
    try {
        const { id } = req.user || {};
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await user.update({ token: null });
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}