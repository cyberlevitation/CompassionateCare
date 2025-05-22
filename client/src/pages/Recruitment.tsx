import { Helmet } from "react-helmet";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(5, { message: "Please enter a valid phone number." }),
  address: z.string().min(5, { message: "Please enter your full address." }),
  postcode: z.string().min(5, { message: "Please enter a valid postcode." }),
  position: z.string().min(1, { message: "Please select a position." }),
  experience: z
    .string()
    .min(1, { message: "Please select your experience level." }),
  availability: z
    .string()
    .min(1, { message: "Please select your availability." }),
  driversLicense: z.enum(["yes", "no"]),
  rightToWork: z.enum(["yes", "no"]),
  coverLetter: z
    .string()
    .min(10, { message: "Please enter a brief cover letter." }),
  cvFile: z.any().optional(),
  referenceContact: z.boolean(),
  dataConsent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must consent to data processing.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

const Recruitment = () => {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      postcode: "",
      position: "",
      experience: "",
      availability: "",
      driversLicense: "no",
      rightToWork: "no",
      coverLetter: "",
      referenceContact: false,
      dataConsent: false,
    },
  });

  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: async (data: FormValues) => {
      return await apiRequest('POST', '/api/job-application', data);
    },
    onSuccess: () => {
      // Show toast notification
      toast({
        title: "Application Submitted",
        description:
          "We've received your application and will contact you shortly about the next steps.",
      });
      
      // Visual success state
      setFormSubmitted(true);
      
      // Reset form
      form.reset();
      
      // Scroll to application form section to see the success message
      const applicationForm = document.getElementById('application-form');
      if (applicationForm) {
        applicationForm.scrollIntoView({ behavior: 'smooth' });
      }
    },
    onError: (error) => {
      console.error("Form submission error:", error);
      toast({
        title: "An error occurred",
        description:
          "Unable to submit your application. Please try again later.",
        variant: "destructive",
      });
      setFormSubmitted(false);
    }
  });

  const onSubmit = async (data: FormValues) => {
    // Convert file to filename if needed (in a real app, you'd upload the file)
    const submissionData = {
      ...data,
      cvFileName: data.cvFile?.name || undefined
    };
    
    // Submit the form data to the API
    mutate(submissionData);
  };

  const positions = [
    "Home Care Assistant",
    "Senior Carer",
    "Care Coordinator",
    "Live-in Carer",
    "Dementia Specialist",
    "Team Leader",
    "Registered Nurse",
    "Administrative Support",
  ];

  return (
    <div className="py-20 mt-16">
      <Helmet>
        <title>Careers & Recruitment | Super Health Care</title>
        <meta
          name="description"
          content="Join the Super Health Care team. We're looking for compassionate individuals who want to make a difference in people's lives through quality home care."
        />
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Care Team
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-neutral-600 mb-6">
            Build a rewarding career making a real difference in people's lives.
            We're looking for compassionate, dedicated individuals to join our
            team.
          </p>
          <div className="flex justify-center mb-8">
            <a
              href="/application-form"
              className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition-colors inline-flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Complete Detailed Application Form</span>
            </a>
          </div>
        </div>

        {/* Why Work With Us */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Why Work With Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Rewarding Work</h3>
              <p className="text-neutral-600">
                Make a genuine difference in people's lives every day. Our
                carers build meaningful relationships with clients and see the
                direct impact of their care.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Career Development</h3>
              <p className="text-neutral-600">
                We invest in your growth with comprehensive training,
                professional qualifications, and clear pathways for career
                progression within the organization.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Competitive Benefits</h3>
              <p className="text-neutral-600">
                Enjoy competitive pay rates, mileage allowances, paid training,
                flexible working hours, and a supportive team environment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Supportive Team</h3>
              <p className="text-neutral-600">
                Join a team that values collaboration, respect, and mutual
                support. Our managers provide regular supervision and are always
                available when needed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Ongoing Training</h3>
              <p className="text-neutral-600">
                Benefit from comprehensive initial training and continuous
                professional development to enhance your skills and knowledge.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Flexible Scheduling</h3>
              <p className="text-neutral-600">
                We offer flexible working patterns that can be adapted to fit
                around your personal commitments and lifestyle needs.
              </p>
            </div>
          </div>
        </div>

        {/* Current Vacancies */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Current Vacancies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Home Care Assistant</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                  Full-Time
                </span>
                <span className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded">
                  Part-Time
                </span>
                <span className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded">
                  Flexible Hours
                </span>
              </div>
              <p className="text-neutral-600 mb-4">
                Provide person-centered care to our clients in their own homes,
                including personal care, medication support, meal preparation,
                and companionship.
              </p>
              <ul className="list-disc list-inside mb-4 text-neutral-600">
                <li>Competitive hourly rate</li>
                <li>Mileage allowance</li>
                <li>Paid training</li>
                <li>Flexible working patterns</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Live-in Carer</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                  Full-Time
                </span>
                <span className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded">
                  Long-Term
                </span>
                <span className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded">
                  Residential
                </span>
              </div>
              <p className="text-neutral-600 mb-4">
                Provide round-the-clock care and support to clients in their own
                homes, enabling them to maintain independence and quality of
                life.
              </p>
              <ul className="list-disc list-inside mb-4 text-neutral-600">
                <li>Competitive weekly pay</li>
                <li>Accommodation and meals provided</li>
                <li>Regular breaks and time off</li>
                <li>Comprehensive training</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Care Coordinator</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                  Full-Time
                </span>
                <span className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded">
                  Office-Based
                </span>
                <span className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded">
                  Administrative
                </span>
              </div>
              <p className="text-neutral-600 mb-4">
                Coordinate care schedules, manage client needs, and support our
                care team to ensure the delivery of high-quality care services.
              </p>
              <ul className="list-disc list-inside mb-4 text-neutral-600">
                <li>Competitive salary</li>
                <li>Office hours (with some on-call responsibilities)</li>
                <li>Career progression opportunities</li>
                <li>Comprehensive training</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">
                Dementia Care Specialist
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                  Full-Time
                </span>
                <span className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded">
                  Part-Time
                </span>
                <span className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded">
                  Specialized
                </span>
              </div>
              <p className="text-neutral-600 mb-4">
                Provide specialist care for clients living with dementia,
                implementing person-centered approaches to enhance wellbeing and
                quality of life.
              </p>
              <ul className="list-disc list-inside mb-4 text-neutral-600">
                <li>Enhanced hourly rate</li>
                <li>Specialist training provided</li>
                <li>Regular supervision and support</li>
                <li>Mileage allowance</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="mb-4 text-neutral-600">
              Don't see a position that matches your skills? We're always
              looking for talented individuals to join our team.
            </p>
            <a
              href="/application-form"
              className="inline-block bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary/90 transition-colors"
            >
              Submit a General Application
            </a>
          </div>
        </div>

        {/* Application Form */}
        <div id="application-form" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Application Form
          </h2>

          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            {formSubmitted && (
              <div className="mb-8 bg-green-50 border border-green-200 text-green-800 rounded-md p-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-bold">Application Submitted Successfully!</h3>
                    <p>Thank you for your application. Our recruitment team will review your details and contact you shortly about the next steps.</p>
                  </div>
                </div>
              </div>
            )}
            
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john.smith@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="07123 456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="postcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postcode</FormLabel>
                        <FormControl>
                          <Input placeholder="SW1A 1AA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your full address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position Applied For</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a position" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {positions.map((position, index) => (
                              <SelectItem
                                key={index}
                                value={position
                                  .toLowerCase()
                                  .replace(/ /g, "-")}
                              >
                                {position}
                              </SelectItem>
                            ))}
                            <SelectItem value="general">
                              General Application
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Care Experience</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">
                              No experience (willing to train)
                            </SelectItem>
                            <SelectItem value="less-than-1">
                              Less than 1 year
                            </SelectItem>
                            <SelectItem value="1-2">1-2 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5-plus">
                              More than 5 years
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Availability</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select availability" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="full-time">Full Time</SelectItem>
                            <SelectItem value="part-time">Part Time</SelectItem>
                            <SelectItem value="weekends">
                              Weekends Only
                            </SelectItem>
                            <SelectItem value="evenings">
                              Evenings Only
                            </SelectItem>
                            <SelectItem value="flexible">
                              Flexible Hours
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="driversLicense"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Driver's License</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="drivers-yes" />
                                <label htmlFor="drivers-yes">Yes</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="drivers-no" />
                                <label htmlFor="drivers-no">No</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rightToWork"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Right to Work in UK</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="work-yes" />
                                <label htmlFor="work-yes">Yes</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="work-no" />
                                <label htmlFor="work-no">No</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="coverLetter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Cover Letter / Additional Information
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please tell us why you're interested in this role and any relevant skills or experience you have."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cvFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload CV (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files
                              ? e.target.files[0]
                              : null;
                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Accepted formats: PDF, DOC, DOCX (Max 5MB)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="referenceContact"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree that Super Health Care can contact my
                          references if my application progresses.
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dataConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I consent to Super Health Care processing my data for
                          recruitment purposes in accordance with the{" "}
                          <a
                            href="/privacy-policy"
                            className="text-primary hover:underline"
                          >
                            Privacy Policy
                          </a>
                          .
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Our Recruitment Process */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Our Recruitment Process
          </h2>

          <div className="bg-neutral-50 p-8 rounded-lg">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 inset-y-0 w-0.5 bg-primary/30 hidden md:block"></div>

              <div className="space-y-12">
                <div className="relative">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex items-center">
                      <div className="bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center z-10">
                        1
                      </div>
                      <div className="hidden md:block w-8"></div>
                    </div>
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md md:ml-2">
                      <h3 className="text-xl font-bold mb-2">Application</h3>
                      <p className="text-neutral-600">
                        Submit your application through our online form or by
                        contacting our recruitment team directly. We'll
                        acknowledge receipt of your application within 48 hours.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex items-center">
                      <div className="bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center z-10">
                        2
                      </div>
                      <div className="hidden md:block w-8"></div>
                    </div>
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md md:ml-2">
                      <h3 className="text-xl font-bold mb-2">
                        Initial Screening
                      </h3>
                      <p className="text-neutral-600">
                        Our recruitment team will review your application and
                        conduct a brief telephone interview to discuss your
                        experience, availability, and suitability for the role.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex items-center">
                      <div className="bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center z-10">
                        3
                      </div>
                      <div className="hidden md:block w-8"></div>
                    </div>
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md md:ml-2">
                      <h3 className="text-xl font-bold mb-2">
                        Face-to-Face Interview
                      </h3>
                      <p className="text-neutral-600">
                        Successful candidates will be invited for a face-to-face
                        interview at our office, where we'll explore your
                        experience, values, and approach to care in more detail.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex items-center">
                      <div className="bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center z-10">
                        4
                      </div>
                      <div className="hidden md:block w-8"></div>
                    </div>
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md md:ml-2">
                      <h3 className="text-xl font-bold mb-2">
                        Pre-Employment Checks
                      </h3>
                      <p className="text-neutral-600">
                        We'll conduct thorough background checks, including DBS
                        (criminal record) checks, reference verification, and
                        right to work validation to ensure suitability for care
                        work.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex items-center">
                      <div className="bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center z-10">
                        5
                      </div>
                      <div className="hidden md:block w-8"></div>
                    </div>
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md md:ml-2">
                      <h3 className="text-xl font-bold mb-2">
                        Induction & Training
                      </h3>
                      <p className="text-neutral-600">
                        Successful applicants will receive comprehensive
                        induction training covering care standards, health and
                        safety, medication management, and our policies and
                        procedures.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex items-center">
                      <div className="bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center z-10">
                        6
                      </div>
                      <div className="hidden md:block w-8"></div>
                    </div>
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md md:ml-2">
                      <h3 className="text-xl font-bold mb-2">
                        Probation Period
                      </h3>
                      <p className="text-neutral-600">
                        New team members will have a three-month probation
                        period with regular supervision and support to ensure a
                        successful transition into their role.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                SM
              </div>
              <div>
                <svg
                  className="h-8 w-8 text-primary mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z" />
                </svg>
                <p className="text-lg mb-4">
                  "Joining Super Health Care was the best career move I've ever
                  made. The training is excellent, the team is supportive, and
                  the work is genuinely rewarding. I've developed professionally
                  and personally since starting here, and I truly feel like I'm
                  making a difference in people's lives every day."
                </p>
                <div>
                  <p className="font-bold">Sarah Mitchell</p>
                  <p className="text-neutral-500">
                    Home Care Assistant, with Super Health Care for 2 years
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Start Your Care Career Today
          </h2>
          <p className="max-w-3xl mx-auto mb-6 text-lg">
            Join our dedicated team and make a real difference in people's
            lives. Apply now or contact our recruitment team to discuss
            opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#application-form"
              className="bg-white text-primary font-bold py-3 px-6 rounded-md hover:bg-neutral-100 transition-colors"
            >
              Apply Now
            </a>
            <a
              href="tel:01234567890"
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-md hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call Recruitment: 01702333120
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruitment;
