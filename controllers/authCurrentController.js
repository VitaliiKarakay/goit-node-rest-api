import { initUserModel } from "../models/user.js";
import { sequelize } from "../db/index.js";

const User = sequelize.models.User || initUserModel(sequelize);

export async function current(req, res, next) {
    try {
        const { id } = req.user || {};
        if (!id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        return res.status(200).json({
            email: user.email,
            subscription: user.subscription,
        });
    } catch (err) {
        next(err);
    }
}