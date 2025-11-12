import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

async function readContactsFile() {
    try {
        const data = await fs.readFile(contactsPath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        if (err.code === "ENOENT") return [];
        throw err;
    }
}

async function writeContactsFile(contacts) {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
}

export async function listContacts() {
    return await readContactsFile();
}

export async function getContactById(id) {
    const contacts = await readContactsFile();
    return contacts.find((c) => String(c.id) === String(id)) || null;
}

export async function addContact({ name, email, phone }) {
    const contacts = await readContactsFile();
    const newContact = { id: randomUUID(), name, email, phone };
    contacts.push(newContact);
    await writeContactsFile(contacts);
    return newContact;
}

export async function removeContact(id) {
    const contacts = await readContactsFile();
    const index = contacts.findIndex((c) => String(c.id) === String(id));
    if (index === -1) return null;
    const [removed] = contacts.splice(index, 1);
    await writeContactsFile(contacts);
    return removed;
}

export async function updateContact(id, data) {
    const contacts = await readContactsFile();
    const index = contacts.findIndex((c) => String(c.id) === String(id));
    if (index === -1) return null;
    const current = contacts[index];
    const updated = { ...current, ...data, id: current.id };
    contacts[index] = updated;
    await writeContactsFile(contacts);
    return updated;
}
