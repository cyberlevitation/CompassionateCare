import { db } from "@db";
import {
  contacts,
  type InsertContact,
  type Contact
} from "@shared/schema";
import { eq } from "drizzle-orm";

export const storage = {
  // Contacts
  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db.insert(contacts).values(contact).returning();
    return newContact;
  },

  async getContactById(id: number): Promise<Contact | undefined> {
    const result = await db.query.contacts.findFirst({
      where: eq(contacts.id, id)
    });
    return result;
  },

  async getAllContacts(): Promise<Contact[]> {
    return await db.query.contacts.findMany();
  }
};
