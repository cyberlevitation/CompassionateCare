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
  type CareProvider,
  careJourneys,
  careJourneyMilestones,
  type CareJourney,
  type InsertCareJourney,
  type CareJourneyMilestone,
  type InsertCareJourneyMilestone
} from "@shared/schema";
import { eq, desc, and, gte, lte } from "drizzle-orm";

interface CareJourneyWithMilestones {
  id: number;
  userId: string;
  startDate: Date | string;
  currentPhase: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  milestones: Array<{
    id: number;
    type: string;
    title: string;
    description: string;
    date: Date | string;
    completed: boolean;
    icon: string;
    celebration?: boolean;
  }>;
}

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
    try {
      console.log("Creating appointment in storage:", appointment);
      
      // Make sure we have the required fields
      const appointmentData = {
        userId: appointment.userId,
        date: appointment.date,
        appointmentType: appointment.appointmentType,
        duration: appointment.duration || 60,
        location: appointment.location,
        status: appointment.status || 'scheduled',
        notes: appointment.notes || '',
        careProviderId: appointment.careProviderId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const [newAppointment] = await db.insert(appointments).values(appointmentData).returning();
      console.log("Appointment created successfully:", newAppointment);
      return newAppointment;
    } catch (error) {
      console.error("Error creating appointment in storage:", error);
      throw error;
    }
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
  },

  // Care Journey operations 
  async getCareJourney(userId: string): Promise<CareJourneyWithMilestones | null> {
    try {
      // Temporary implementation to allow the feature to work while we debug
      console.log("Fetching care journey for user:", userId);
      // Return default journey for demo purposes
      return {
        id: 1,
        userId,
        startDate: new Date().toISOString(),
        currentPhase: "Initial Assessment",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        milestones: [
          {
            id: 1,
            type: "appointment",
            title: "Initial Consultation",
            description: "Your first meeting with our care team to discuss your needs.",
            date: new Date().toISOString(),
            completed: true,
            icon: "appointment",
            celebration: true
          },
          {
            id: 2,
            type: "assessment",
            title: "Care Assessment",
            description: "Comprehensive evaluation of your care requirements.",
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            completed: false,
            icon: "assessment"
          },
          {
            id: 3,
            type: "goal",
            title: "Care Plan Creation",
            description: "Development of your personalized care plan.",
            date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            completed: false,
            icon: "goal"
          },
          {
            id: 4,
            type: "achievement",
            title: "First Month Milestone",
            description: "Celebrating one month of successful care service.",
            date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            completed: false,
            icon: "achievement",
            celebration: true
          }
        ]
      };
    } catch (error) {
      console.error("Error fetching care journey:", error);
      return null;
    }
  },
  
  async createCareJourney(data: any): Promise<CareJourneyWithMilestones> {
    // Since we don't have the database tables set up yet, simply return the data
    return {
      id: Math.floor(Math.random() * 1000),
      userId: data.userId,
      startDate: data.startDate || new Date().toISOString(),
      currentPhase: data.currentPhase || 'Initial Assessment',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      milestones: data.milestones || []
    };
  },
  
  async updateCareJourney(userId: string, data: any): Promise<CareJourneyWithMilestones | null> {
    try {
      // Since we don't have the database tables set up yet, simply return the data
      return {
        id: data.id || Math.floor(Math.random() * 1000),
        userId: userId,
        startDate: data.startDate || new Date().toISOString(),
        currentPhase: data.currentPhase || 'Initial Assessment',
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        milestones: data.milestones || []
      };
    } catch (error) {
      console.error("Error updating care journey:", error);
      return null;
    }
  },
  
  async updateCareJourneyMilestone(milestoneId: number, data: any): Promise<any> {
    // Since we don't have the database tables set up yet, simply return the data
    return {
      id: milestoneId,
      ...data,
      updatedAt: new Date().toISOString()
    };
  }
};
