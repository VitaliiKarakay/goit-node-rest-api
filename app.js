import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import { initDb, sequelize } from "./db/index.js";
import "./models/contact.js";

const app = express();
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

(async () => {
  try {
    await initDb();
    await sequelize.sync();
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running. Use our API on port:", process.env.PORT || 3000);
    });
  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
})();