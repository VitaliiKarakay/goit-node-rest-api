import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

const ensureBodyHasAtLeastOneField = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Body must have at least one field" });
  }
  next();
};

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put(
  "/:id",
  ensureBodyHasAtLeastOneField,
  validateBody(updateContactSchema),
  updateContact
);

export default contactsRouter;
