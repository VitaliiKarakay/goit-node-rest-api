import { Sequelize } from "sequelize";
import { initUserModel } from "../models/user.js";
import { initContactModel } from "../models/contact.js";

const {
    PG_HOST,
    PG_PORT,
    PG_DATABASE,
    PG_USER,
    PG_PASSWORD,
    PG_SSL = "false",
} = process.env;

export const sequelize = new Sequelize(PG_DATABASE, PG_USER, PG_PASSWORD, {
    host: PG_HOST,
    port: Number(PG_PORT),
    dialect: "postgres",
    logging: false,
    dialectOptions: PG_SSL === "true" ? { ssl: { require: true } } : {},
});

initUserModel(sequelize);
initContactModel(sequelize);

export async function initDb() {
    try {
        await sequelize.authenticate();
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}