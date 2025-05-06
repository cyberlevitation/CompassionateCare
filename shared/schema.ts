import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
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
