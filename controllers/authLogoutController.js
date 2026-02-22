import * as authServices from "../services/authServices.js";

export async function logout(req, res, next) {
    try {
        const { id } = req.user || {};
        await authServices.logoutUser(id);
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}