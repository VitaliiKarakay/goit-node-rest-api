import * as authServices from "../services/authServices.js";

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const result = await authServices.loginUser(email, password);
        return res.status(200).json(result);
    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({ message: err.message });
        }
        next(err);
    }
}