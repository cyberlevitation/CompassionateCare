import { db } from "@db";
import {
  contacts,
  type InsertContact,
  type Contact,
  bookings,
  type InsertBooking,
  type Booking,
  jobApplications,
  type InsertJobApplication,
  type JobApplication,
  detailedApplications,
  type InsertDetailedApplication,
  type DetailedApplication
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

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
  },

  // Bookings (Introduction Form)
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    return newBooking;
  },

  async getBookingById(id: number): Promise<Booking | undefined> {
    const result = await db.query.bookings.findFirst({
      where: eq(bookings.id, id)
    });
    return result;
  },

  async getAllBookings(): Promise<Booking[]> {
    return await db.query.bookings.findMany({
      orderBy: [desc(bookings.createdAt)]
    });
  },

  // Job Applications
  async createJobApplication(application: InsertJobApplication): Promise<JobApplication> {
    const [newApplication] = await db.insert(jobApplications).values(application).returning();
    return newApplication;
  },

  async getJobApplicationById(id: number): Promise<JobApplication | undefined> {
    const result = await db.query.jobApplications.findFirst({
      where: eq(jobApplications.id, id)
    });
    return result;
  },

  async getAllJobApplications(): Promise<JobApplication[]> {
    return await db.query.jobApplications.findMany({
      orderBy: [desc(jobApplications.createdAt)]
    });
  },

  // Detailed Applications
  async createDetailedApplication(application: InsertDetailedApplication): Promise<DetailedApplication> {
    const [newApplication] = await db.insert(detailedApplications).values(application).returning();
    return newApplication;
  },

  async getDetailedApplicationById(id: number): Promise<DetailedApplication | undefined> {
    const result = await db.query.detailedApplications.findFirst({
      where: eq(detailedApplications.id, id)
    });
    return result;
  },

  async getAllDetailedApplications(): Promise<DetailedApplication[]> {
    return await db.query.detailedApplications.findMany({
      orderBy: [desc(detailedApplications.createdAt)]
    });
  }
};
