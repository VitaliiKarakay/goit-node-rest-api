import path from "path";
import fs from "fs/promises";
import * as authServices from "../services/authServices.js";

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

        // Переміщуємо файл з tmp в public/avatars
        await fs.rename(tmpPath, resultPath);

        // Формуємо URL для аватарки
        const avatarURL = `/avatars/${filename}`;

        // Оновлюємо користувача через сервіс
        await authServices.updateUserAvatar(id, avatarURL);

        return res.status(200).json({ avatarURL });
    } catch (err) {
        next(err);
    }
}

