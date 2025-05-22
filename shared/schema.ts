import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (keeping the existing one)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

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
  firstName: (schema) =>
    schema.min(2, "First name must be at least 2 characters"),
  lastName: (schema) =>
    schema.min(2, "Last name must be at least 2 characters"),
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
  content: (schema) =>
    schema.min(10, "Testimonial content must be at least 10 characters"),
  author: (schema) =>
    schema.min(2, "Author name must be at least 2 characters"),
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
  description: (schema) =>
    schema.min(10, "Description must be at least 10 characters"),
  slug: (schema) => schema.min(3, "Slug must be at least 3 characters"),
});

export type InsertService = z.infer<typeof serviceSchema>;
export type Service = typeof services.$inferSelect;

// Service Features
export const serviceFeatures = pgTable("service_features", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id")
    .notNull()
    .references(() => services.id),
  feature: text("feature").notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
});

export const serviceFeatureSchema = createInsertSchema(serviceFeatures, {
  feature: (schema) => schema.min(3, "Feature must be at least 3 characters"),
});

export type InsertServiceFeature = z.infer<typeof serviceFeatureSchema>;
export type ServiceFeature = typeof serviceFeatures.$inferSelect;

// Application form submissions
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  // Personal Details
  personalDetails: text("personal_details").notNull(), // JSON string
  // Further Information
  furtherInformation: text("further_information").notNull(), // JSON string
  // Next of Kin
  nextOfKin: text("next_of_kin").notNull(), // JSON string
  // Fitness For Work
  fitnessForWork: text("fitness_for_work").notNull(), // JSON string
  // Disabilities
  disabilities: text("disabilities").notNull(), // JSON string
  // Education
  education: text("education").notNull(), // JSON string
  // Employment History
  employmentHistory: text("employment_history").notNull(), // JSON string
  // Supporting Statement
  supportingStatement: text("supporting_statement").notNull(),
  // Equality Act
  equalityAct: text("equality_act").notNull(),
  // Referees
  referees: text("referees").notNull(), // JSON string
  // Terms and Conditions
  termsAndConditions: boolean("terms_and_conditions").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const applicationSchema = z.object({
  personalDetails: z.object({
    title: z.string().min(1),
    forename: z.string().min(1),
    surname: z.string().min(1),
    birthName: z.string().optional(),
    address: z.string().min(1),
    postcode: z.string().min(1),
    telephone: z.string().optional(),
    mobile: z.string().min(1),
    email: z.string().email(),
    nationality: z.string().min(1),
    passportNumber: z.string().min(1),
    birthDate: z.string().min(1),
    passportExpiryDate: z.string().min(1),
    nationalInsuranceNumber: z.string().min(1),
  }),
  furtherInformation: z.object({
    drivingLicense: z.enum(["yes", "no"]),
    endorsements: z.string().optional(),
    licenseIssuedLocation: z.string().optional(),
    ownVehicle: z.enum(["yes", "no"]),
    manualDriver: z.boolean().optional(),
    automaticDriver: z.boolean().optional(),
    driveClientVehicle: z.enum(["yes", "no"]),
    businessInsurance: z.enum(["yes", "no"]),
    previouslyApplied: z.enum(["yes", "no"]),
    previouslyWorked: z.enum(["yes", "no"]),
    workedOtherAgency: z.enum(["yes", "no"]),
    otherAgencyName: z.string().optional(),
  }),
  nextOfKin: z.object({
    title: z.string().min(1),
    forename: z.string().min(1),
    surname: z.string().min(1),
    address: z.string().min(1),
    postcode: z.string().min(1),
    contactNumber: z.string().min(1),
    email: z.string().email().optional(),
    relationship: z.string().min(1),
  }),
  fitnessForWork: z.object({
    name: z.string().min(1),
    date: z.string().min(1),
  }),
  disabilities: z.object({
    specialArrangements: z.enum(["yes", "no"]),
    details: z.string().optional(),
  }),
  education: z.object({
    educationHistory: z.string().min(1),
    manualHandling: z.boolean().optional(),
    firstAid: z.boolean().optional(),
    foodHygiene: z.boolean().optional(),
    infectionControl: z.boolean().optional(),
    firePrevention: z.boolean().optional(),
    sova: z.boolean().optional(),
    dementia: z.boolean().optional(),
    healthAndSafety: z.boolean().optional(),
  }),
  employmentHistory: z.object({
    history: z.string().min(1),
    formalInvestigation: z.enum(["yes", "no"]),
    investigationDetails: z.string().optional(),
  }),
  supportingStatement: z.string().min(1),
  equalityAct: z.enum(["yes", "no", "prefer"]),
  referees: z.object({
    currentEmployerName: z.string().min(1),
    currentEmployerAddress: z.string().min(1),
    currentEmployerPostcode: z.string().min(1),
    currentEmployerTelephone: z.string().min(1),
    currentEmployerEmail: z.string().email(),
    previousEmployerName: z.string().min(1),
    previousEmployerAddress: z.string().min(1),
    previousEmployerPostcode: z.string().min(1),
    previousEmployerTelephone: z.string().min(1),
    previousEmployerEmail: z.string().email(),
  }),
  termsAndConditions: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type InsertApplication = z.infer<typeof applicationSchema>;
export type Application = typeof applications.$inferSelect;
