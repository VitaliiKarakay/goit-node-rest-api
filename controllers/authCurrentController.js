import * as authServices from "../services/authServices.js";

export async function current(req, res, next) {
    try {
        const { id } = req.user || {};
        if (!id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const user = await authServices.getCurrentUser(id);
        return res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}