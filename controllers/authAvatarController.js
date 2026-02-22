import path from "path";
import fs from "fs/promises";
import { initUserModel } from "../models/user.js";
import { sequelize } from "../db/index.js";

const User = sequelize.models.User || initUserModel(sequelize);

export async function updateAvatar(req, res, next) {
    try {
        const { id } = req.user;

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { path: tmpPath, originalname } = req.file;
        const extension = path.extname(originalname);
        const filename = `${id}${extension}`;
        const avatarsDir = path.resolve("public", "avatars");
        const resultPath = path.join(avatarsDir, filename);

        await fs.rename(tmpPath, resultPath);

        const avatarURL = `/avatars/${filename}`;

        await User.update({ avatarURL }, { where: { id } });

        return res.status(200).json({ avatarURL });
    } catch (err) {
        next(err);
    }
}

