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
  type DetailedApplication,
  users,
  type User,
  type UpsertUser,
  appointments,
  type InsertAppointment,
  type Appointment,
  careProviders,
  type InsertCareProvider,
  type CareProvider
} from "@shared/schema";
import { eq, desc, and, gte, lte } from "drizzle-orm";

export const storage = {
  // User operations for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  },

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  },
  
  async updateUserProfile(userId: string, userData: any): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        ...userData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  },

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
  },

  // Appointments
  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const [newAppointment] = await db.insert(appointments).values(appointment).returning();
    return newAppointment;
  },

  async getAppointmentById(id: number): Promise<Appointment | undefined> {
    const result = await db.query.appointments.findFirst({
      where: eq(appointments.id, id)
    });
    return result;
  },

  async getUserAppointments(userId: string): Promise<Appointment[]> {
    return await db.select().from(appointments)
      .where(eq(appointments.userId, userId))
      .orderBy(desc(appointments.date));
  },

  async getUpcomingUserAppointments(userId: string): Promise<Appointment[]> {
    const now = new Date();
    return await db.select().from(appointments)
      .where(and(
        eq(appointments.userId, userId),
        gte(appointments.date, now)
      ))
      .orderBy(appointments.date);
  },

  async updateAppointment(id: number, data: Partial<Appointment>): Promise<Appointment> {
    const [updatedAppointment] = await db.update(appointments)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(appointments.id, id))
      .returning();
    return updatedAppointment;
  },

  async cancelAppointment(id: number): Promise<Appointment> {
    const [canceledAppointment] = await db.update(appointments)
      .set({
        status: 'cancelled',
        updatedAt: new Date()
      })
      .where(eq(appointments.id, id))
      .returning();
    return canceledAppointment;
  },

  // Care Providers
  async createCareProvider(provider: InsertCareProvider): Promise<CareProvider> {
    const [newProvider] = await db.insert(careProviders).values(provider).returning();
    return newProvider;
  },

  async getCareProviderById(id: number): Promise<CareProvider | undefined> {
    const result = await db.query.careProviders.findFirst({
      where: eq(careProviders.id, id)
    });
    return result;
  },

  async getAllActiveCareProviders(): Promise<CareProvider[]> {
    return await db.select().from(careProviders)
      .where(eq(careProviders.isActive, true))
      .orderBy(careProviders.lastName);
  },

  async getCareProviderAvailability(providerId: number, startDate: Date, endDate: Date): Promise<{ date: Date, available: boolean }[]> {
    // Get all existing appointments for this provider in the date range
    const existingAppointments = await db.select().from(appointments)
      .where(and(
        eq(appointments.careProviderId, providerId),
        gte(appointments.date, startDate),
        lte(appointments.date, endDate),
        eq(appointments.status, 'scheduled')
      ));
    
    // Create a map of dates that are booked
    const bookedDates = new Map();
    existingAppointments.forEach(appointment => {
      const dateKey = appointment.date.toISOString().split('T')[0];
      bookedDates.set(dateKey, true);
    });
    
    // Generate availability for each day in the range
    const availability = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateKey = currentDate.toISOString().split('T')[0];
      availability.push({
        date: new Date(currentDate),
        available: !bookedDates.has(dateKey)
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return availability;
  }
};
