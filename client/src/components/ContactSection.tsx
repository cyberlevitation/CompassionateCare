import { useState } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { contactFormSchema } from "@/lib/validations";
import type { ContactFormData } from "@/lib/validations";
import { useMutation } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      privacyAgreement: false
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      // Show toast notification
      toast({
        title: "Message Sent!",
        description: "We'll be in touch with you soon.",
        variant: "default",
      });
      
      // Set success state for visual indicator
      setFormSubmitted(true);
      
      // Scroll to top of form
      const contactForm = document.getElementById('contact-form');
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Reset form
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
      setFormSubmitted(false);
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  const onSubmit = (data: ContactFormData) => {
    setIsSubmitting(true);
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-raleway font-bold text-3xl md:text-4xl text-primary mb-4">Contact Us</h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
            We're here to answer your questions and help you find the right care solution. Reach out to our team today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Form {...form}>
              <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)} className="bg-neutral-100 p-6 md:p-8 rounded-xl shadow-sm">
                {formSubmitted && (
                  <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-md p-4">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h3 className="font-bold">Message Sent Successfully!</h3>
                        <p>Thank you for contacting us. We'll be in touch with you soon.</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700 font-medium">First Name *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your first name" 
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700 font-medium">Last Name *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your last name" 
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700 font-medium">Email Address *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700 font-medium">Phone Number *</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="Enter your phone number" 
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mb-6">
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700 font-medium">Service of Interest</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                              <SelectValue placeholder="Please select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="personal_care">Personal Care</SelectItem>
                            <SelectItem value="live_in_care">Live-in Care</SelectItem>
                            <SelectItem value="domestic_support">Domestic Support</SelectItem>
                            <SelectItem value="companionship">Companionship</SelectItem>
                            <SelectItem value="specialized_care">Specialized Care</SelectItem>
                            <SelectItem value="respite_care">Respite Care</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mb-6">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700 font-medium">Your Message *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please tell us about your care needs" 
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                            rows={4}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mb-6">
                  <FormField
                    control={form.control}
                    name="privacyAgreement"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-neutral-700">
                            I agree to the <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> and consent to Super Health Care contacting me about my enquiry. *
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
          
          <div>
            <div className="mb-8">
              <h3 className="font-raleway font-semibold text-2xl text-primary mb-4">Our Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-primary mt-1 mr-4">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900 mb-1">Address</h4>
                    <p className="text-neutral-700">
                      Super Health Care Ltd.<br />
                      201 Hamlet Court Road<br />
                      Westcliff-on-Sea, Essex, SS0 7EL<br />
                      United Kingdom
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-primary mt-1 mr-4">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900 mb-1">Phone</h4>
                    <p className="text-neutral-700">
                      <a href="tel:01234567890" className="hover:text-primary">01702333120</a><br />
                      <span className="text-sm">Monday to Friday, 8am to 8pm</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-primary mt-1 mr-4">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900 mb-1">Email</h4>
                    <p className="text-neutral-700">
                      <a href="mailto:info@superhealthcare.co.uk" className="hover:text-primary">info@superhealthcare.co.uk</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-raleway font-semibold text-2xl text-primary mb-4">Our Location</h3>
              <div className="w-full h-64 bg-neutral-200 rounded-lg overflow-hidden relative">
                <iframe
                  title="Map of Super Health Care"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.552956376775!2d-0.12985902357727863!3d51.50064047181573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ce54547155%3A0x70e8ffa1ce0bccc7!2sHouses%20of%20Parliament!5e0!3m2!1sen!2suk!4v1689256693279!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <p className="text-neutral-700">
                    <strong>CQC Registered Provider</strong><br />
                    Registration No: 12345678
                  </p>
                </div>
                <div className="flex space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">
                    <Facebook className="h-6 w-6" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">
                    <Twitter className="h-6 w-6" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">
                    <Linkedin className="h-6 w-6" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
