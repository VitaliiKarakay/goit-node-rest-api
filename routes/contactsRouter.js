import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js";
import { updateStatusContact } from "../services/contactsServices.js";

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

contactsRouter.put("/:id", ensureBodyHasAtLeastOneField, validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/:id/favorite", validateBody(updateFavoriteSchema), async (req, res, next) => {
  try {
    const updated = await updateStatusContact(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

export default contactsRouter;