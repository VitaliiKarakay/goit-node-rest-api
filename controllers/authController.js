import * as authServices from "../services/authServices.js";

export async function register(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await authServices.registerUser(email, password);
        return res.status(201).json({ user });
    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({ message: err.message });
        }
        next(err);
    }
}