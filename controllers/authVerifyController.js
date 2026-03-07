import * as authServices from "../services/authServices.js";

export async function verify(req, res, next) {
    try {
        const { verificationToken } = req.params;
        await authServices.verifyUserEmail(verificationToken);

        return res.status(200).json({
            message: "Verification successful",
        });
    } catch (err) {
        next(err);
    }
}

