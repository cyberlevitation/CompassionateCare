import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  privacyAgreement: z.boolean().refine(val => val === true, {
    message: "You must agree to the privacy policy"
  })
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
