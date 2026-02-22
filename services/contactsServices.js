import { Contact } from "../models/contact.js";

/**
 * Отримати всі контакти для конкретного користувача
 */
export async function listContacts(userId) {
    return await Contact.findAll({ where: { owner: userId } });
}

/**
 * Отримати один контакт по ID (з перевіркою власника)
 */
export async function getContactById(id, userId) {
    return await Contact.findOne({ where: { id, owner: userId } });
}

/**
 * Створити новий контакт
 */
export async function addContact(data, userId) {
    const { name, email, phone, favorite = false } = data;
    return await Contact.create({ name, email, phone, favorite, owner: userId });
}

/**
 * Видалити контакт
 */
export async function removeContact(id, userId) {
    const deletedCount = await Contact.destroy({ where: { id, owner: userId } });
    return deletedCount > 0;
}

/**
 * Оновити контакт (повне оновлення)
 */
export async function updateContact(id, data, userId) {
    const contact = await Contact.findOne({ where: { id, owner: userId } });
    if (!contact) return null;

    await contact.update(data);
    return contact;
}

/**
 * Оновити статус favorite
 */
export async function updateStatusContact(id, body, userId) {
    const { favorite } = body;
    const contact = await Contact.findOne({ where: { id, owner: userId } });
    if (!contact) return null;

    await contact.update({ favorite });
    return contact;
}
