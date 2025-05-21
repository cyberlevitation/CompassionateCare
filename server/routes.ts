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
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
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

async function sendBookingNotificationEmail(booking: InsertBooking) {
  try {
    // In a production environment, you would configure this with real SMTP credentials
    // For now, we're just logging what would be sent
    console.log(`
      New booking introduction submission:
      Name: ${booking.fullName}
      Email: ${booking.email}
      Phone: ${booking.phone}
      Address: ${booking.address}
      Postcode: ${booking.postcode}
      Service Needed: ${booking.serviceNeeded}
      Care Frequency: ${booking.careFrequency}
      Start Date: ${booking.startDate}
      Additional Info: ${booking.additionalInfo || 'None provided'}
      Contact Preference: ${booking.contactPreference}
      Heard About Us: ${booking.hearAboutUs || 'Not specified'}
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
      to: "bookings@superhealthcare.co.uk",
      subject: "New Booking Introduction Request",
      text: `
        Name: ${booking.fullName}
        Email: ${booking.email}
        Phone: ${booking.phone}
        Address: ${booking.address}
        Postcode: ${booking.postcode}
        Service Needed: ${booking.serviceNeeded}
        Care Frequency: ${booking.careFrequency}
        Start Date: ${booking.startDate}
        Additional Info: ${booking.additionalInfo || 'None provided'}
        Contact Preference: ${booking.contactPreference}
        Heard About Us: ${booking.hearAboutUs || 'Not specified'}
      `,
      html: `
        <h1>New Booking Introduction Request</h1>
        <p><strong>Name:</strong> ${booking.fullName}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Address:</strong> ${booking.address}</p>
        <p><strong>Postcode:</strong> ${booking.postcode}</p>
        <p><strong>Service Needed:</strong> ${booking.serviceNeeded}</p>
        <p><strong>Care Frequency:</strong> ${booking.careFrequency}</p>
        <p><strong>Start Date:</strong> ${booking.startDate}</p>
        <p><strong>Additional Info:</strong> ${booking.additionalInfo || 'None provided'}</p>
        <p><strong>Contact Preference:</strong> ${booking.contactPreference}</p>
        <p><strong>Heard About Us:</strong> ${booking.hearAboutUs || 'Not specified'}</p>
      `,
    });
    */
    
    return true;
  } catch (error) {
    console.error("Error sending booking notification email:", error);
    return false;
  }
}

async function sendJobApplicationNotificationEmail(application: InsertJobApplication) {
  try {
    // In a production environment, you would configure this with real SMTP credentials
    // For now, we're just logging what would be sent
    console.log(`
      New job application submission:
      Name: ${application.fullName}
      Email: ${application.email}
      Phone: ${application.phone}
      Address: ${application.address}
      Postcode: ${application.postcode}
      Position: ${application.position}
      Experience: ${application.experience}
      Availability: ${application.availability}
      Driver's License: ${application.driversLicense}
      Right to Work: ${application.rightToWork}
      Reference Contact Permission: ${application.referenceContact ? 'Yes' : 'No'}
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
      to: "recruitment@superhealthcare.co.uk",
      subject: "New Job Application",
      text: `
        Name: ${application.fullName}
        Email: ${application.email}
        Phone: ${application.phone}
        Address: ${application.address}
        Postcode: ${application.postcode}
        Position: ${application.position}
        Experience: ${application.experience}
        Availability: ${application.availability}
        Driver's License: ${application.driversLicense}
        Right to Work: ${application.rightToWork}
        Cover Letter: ${application.coverLetter}
        CV Filename: ${application.cvFileName || 'Not uploaded'}
        Reference Contact Permission: ${application.referenceContact ? 'Yes' : 'No'}
      `,
      html: `
        <h1>New Job Application</h1>
        <p><strong>Name:</strong> ${application.fullName}</p>
        <p><strong>Email:</strong> ${application.email}</p>
        <p><strong>Phone:</strong> ${application.phone}</p>
        <p><strong>Address:</strong> ${application.address}</p>
        <p><strong>Postcode:</strong> ${application.postcode}</p>
        <p><strong>Position:</strong> ${application.position}</p>
        <p><strong>Experience:</strong> ${application.experience}</p>
        <p><strong>Availability:</strong> ${application.availability}</p>
        <p><strong>Driver's License:</strong> ${application.driversLicense}</p>
        <p><strong>Right to Work:</strong> ${application.rightToWork}</p>
        <p><strong>Cover Letter:</strong> ${application.coverLetter}</p>
        <p><strong>CV Filename:</strong> ${application.cvFileName || 'Not uploaded'}</p>
        <p><strong>Reference Contact Permission:</strong> ${application.referenceContact ? 'Yes' : 'No'}</p>
      `,
    });
    */
    
    return true;
  } catch (error) {
    console.error("Error sending job application notification email:", error);
    return false;
  }
}
