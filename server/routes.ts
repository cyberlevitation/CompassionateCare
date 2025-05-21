import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  contactSchema, 
  type InsertContact,
  bookingSchema,
  type InsertBooking,
  jobApplicationSchema,
  type InsertJobApplication 
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import nodemailer from "nodemailer";
import type { Response, Request } from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact API endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = contactSchema.parse(req.body);
      
      // Store in database
      const contact = await storage.createContact(validatedData);
      
      // Send email notification about the new contact
      await sendContactNotificationEmail(validatedData);
      
      return res.status(201).json({
        success: true,
        message: "Contact message sent successfully",
        data: contact
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validationError.details
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your request"
      });
    }
  });

  // Book Introduction API endpoint
  app.post("/api/book-introduction", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = bookingSchema.parse(req.body);
      
      // Store in database
      const booking = await storage.createBooking(validatedData);
      
      // Send email notification
      await sendBookingNotificationEmail(validatedData);
      
      return res.status(201).json({
        success: true,
        message: "Booking request sent successfully",
        data: booking
      });
    } catch (error) {
      console.error("Error processing booking form:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validationError.details
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your request"
      });
    }
  });

  // Job Application API endpoint
  app.post("/api/job-application", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = jobApplicationSchema.parse(req.body);
      
      // Store in database
      const application = await storage.createJobApplication(validatedData);
      
      // Send email notification
      await sendJobApplicationNotificationEmail(validatedData);
      
      return res.status(201).json({
        success: true,
        message: "Job application submitted successfully",
        data: application
      });
    } catch (error) {
      console.error("Error processing job application form:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validationError.details
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your request"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function sendContactNotificationEmail(contact: InsertContact) {
  try {
    // In a production environment, you would configure this with real SMTP credentials
    // For now, we're just logging what would be sent
    console.log(`
      New contact form submission:
      Name: ${contact.firstName} ${contact.lastName}
      Email: ${contact.email}
      Phone: ${contact.phone}
      Service: ${contact.service || 'Not specified'}
      Message: ${contact.message}
    `);
    
    // Example of how you would set up nodemailer in production
    /*
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Super Health Care" <no-reply@superhealthcare.co.uk>',
      to: "info@superhealthcare.co.uk",
      subject: "New Contact Form Submission",
      text: `
        Name: ${contact.firstName} ${contact.lastName}
        Email: ${contact.email}
        Phone: ${contact.phone}
        Service: ${contact.service || 'Not specified'}
        Message: ${contact.message}
      `,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${contact.firstName} ${contact.lastName}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Service:</strong> ${contact.service || 'Not specified'}</p>
        <p><strong>Message:</strong> ${contact.message}</p>
      `,
    });
    */
    
    return true;
  } catch (error) {
    console.error("Error sending email notification:", error);
    return false;
  }
}
