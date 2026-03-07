import * as authServices from "../services/authServices.js";

export async function resendVerify(req, res, next) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "missing required field email",
            });
        }

        await authServices.resendVerificationEmail(email);

        return res.status(200).json({
            message: "Verification email sent",
        });
    } catch (err) {
        next(err);
    }
}

