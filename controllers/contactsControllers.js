import { Contact } from "../models/contact.js";

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: String(error) });
  }
};

export const getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) return res.status(404).json({ message: "Not found" });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: String(error) });
  }
};

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, favorite = false } = req.body;
    const created = await Contact.create({ name, email, phone, favorite });
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: "Bad request", error: String(error) });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) return res.status(404).json({ message: "Not found" });
    await contact.update(req.body);
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: "Bad request", error: String(error) });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Contact.destroy({ where: { id } });
    if (!deletedCount) return res.status(404).json({ message: "Not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: String(error) });
  }
};