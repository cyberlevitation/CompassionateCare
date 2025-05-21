import { pgTable, text, serial, integer, boolean, timestamp, json, varchar, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  preferences: jsonb("preferences"),
  phone: varchar("phone"),
  address: varchar("address"),
  city: varchar("city"),
  postcode: varchar("postcode"),
  emergencyContactName: varchar("emergency_contact_name"),
  emergencyContactPhone: varchar("emergency_contact_phone"),
  medicalConditions: text("medical_conditions"),
  allergies: text("allergies"),
  medications: text("medications"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Alias to match the example
export type UpsertUser = InsertUser;

// Contact form submissions
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactSchema = createInsertSchema(contacts, {
  firstName: (schema) => schema.min(2, "First name must be at least 2 characters"),
  lastName: (schema) => schema.min(2, "Last name must be at least 2 characters"),
  email: (schema) => schema.email("Please enter a valid email address"),
  phone: (schema) => schema.min(6, "Please enter a valid phone number"),
  message: (schema) => schema.min(10, "Message must be at least 10 characters"),
});

export type InsertContact = z.infer<typeof contactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  relationship: text("relationship").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testimonialSchema = createInsertSchema(testimonials, {
  content: (schema) => schema.min(10, "Testimonial content must be at least 10 characters"),
  author: (schema) => schema.min(2, "Author name must be at least 2 characters"),
});

export type InsertTestimonial = z.infer<typeof testimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Services
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const serviceSchema = createInsertSchema(services, {
  title: (schema) => schema.min(3, "Title must be at least 3 characters"),
  description: (schema) => schema.min(10, "Description must be at least 10 characters"),
  slug: (schema) => schema.min(3, "Slug must be at least 3 characters"),
});

export type InsertService = z.infer<typeof serviceSchema>;
export type Service = typeof services.$inferSelect;

// Service Features
export const serviceFeatures = pgTable("service_features", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").notNull().references(() => services.id),
  feature: text("feature").notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
});

export const serviceFeatureSchema = createInsertSchema(serviceFeatures, {
  feature: (schema) => schema.min(3, "Feature must be at least 3 characters"),
});

export type InsertServiceFeature = z.infer<typeof serviceFeatureSchema>;
export type ServiceFeature = typeof serviceFeatures.$inferSelect;

// Booking Introduction form
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  postcode: text("postcode").notNull(),
  serviceNeeded: text("service_needed").notNull(),
  careFrequency: text("care_frequency").notNull(),
  startDate: text("start_date").notNull(),
  additionalInfo: text("additional_info"),
  contactPreference: text("contact_preference").notNull(),
  hearAboutUs: text("hear_about_us"),
  dataConsent: boolean("data_consent").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const bookingSchema = createInsertSchema(bookings, {
  fullName: (schema) => schema.min(2, "Full name is required"),
  email: (schema) => schema.email("Please enter a valid email"),
  phone: (schema) => schema.min(5, "Phone number is required"),
  address: (schema) => schema.min(5, "Address is required"),
  postcode: (schema) => schema.min(5, "Postcode is required"),
  serviceNeeded: (schema) => schema.min(1, "Service needed is required"),
  careFrequency: (schema) => schema.min(1, "Care frequency is required"),
  startDate: (schema) => schema.min(1, "Start date is required"),
  contactPreference: (schema) => schema.min(1, "Contact preference is required"),
  dataConsent: (schema) => schema.refine((val) => val === true, "You must consent to data processing"),
});

export type InsertBooking = z.infer<typeof bookingSchema>;
export type Booking = typeof bookings.$inferSelect;

// Job Applications table
export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  postcode: text("postcode").notNull(),
  position: text("position").notNull(),
  experience: text("experience").notNull(),
  availability: text("availability").notNull(),
  driversLicense: text("drivers_license").notNull(),
  rightToWork: text("right_to_work").notNull(),
  coverLetter: text("cover_letter").notNull(),
  cvFileName: text("cv_file_name"),
  referenceContact: boolean("reference_contact").notNull(),
  dataConsent: boolean("data_consent").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const jobApplicationSchema = createInsertSchema(jobApplications, {
  fullName: (schema) => schema.min(2, "Full name is required"),
  email: (schema) => schema.email("Please enter a valid email"),
  phone: (schema) => schema.min(5, "Phone number is required"),
  address: (schema) => schema.min(5, "Address is required"),
  postcode: (schema) => schema.min(5, "Postcode is required"),
  position: (schema) => schema.min(1, "Position is required"),
  experience: (schema) => schema.min(1, "Experience level is required"),
  availability: (schema) => schema.min(1, "Availability is required"),
  driversLicense: (schema) => schema.min(1, "Driver's license information is required"),
  rightToWork: (schema) => schema.min(1, "Right to work information is required"),
  coverLetter: (schema) => schema.min(10, "Cover letter is required"),
  referenceContact: (schema) => schema,
  dataConsent: (schema) => schema.refine((val) => val === true, "You must consent to data processing"),
});

export type InsertJobApplication = z.infer<typeof jobApplicationSchema>;
export type JobApplication = typeof jobApplications.$inferSelect;

// Detailed Application Forms table
export const detailedApplications = pgTable("detailed_applications", {
  id: serial("id").primaryKey(),
  personalDetails: json("personal_details").notNull(),
  furtherInformation: json("further_information").notNull(),
  nextOfKin: json("next_of_kin").notNull(),
  fitnessForWork: json("fitness_for_work").notNull(),
  disabilities: json("disabilities").notNull(),
  education: json("education").notNull(),
  employmentHistory: json("employment_history").notNull(),
  supportingStatement: text("supporting_statement").notNull(),
  equalityAct: text("equality_act").notNull(),
  referees: json("referees").notNull(),
  termsAndConditions: boolean("terms_and_conditions").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const detailedApplicationSchema = createInsertSchema(detailedApplications);

export type InsertDetailedApplication = z.infer<typeof detailedApplicationSchema>;
export type DetailedApplication = typeof detailedApplications.$inferSelect;
