import * as contactsServices from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await contactsServices.listContacts(userId);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const contact = await contactsServices.getContactById(id, userId);
    if (!contact) return res.status(404).json({ message: "Not found" });
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const created = await contactsServices.addContact(req.body, userId);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updated = await contactsServices.updateContact(id, req.body, userId);
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const deleted = await contactsServices.removeContact(id, userId);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateContactStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updated = await contactsServices.updateStatusContact(id, req.body, userId);
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};