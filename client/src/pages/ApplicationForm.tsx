import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  personalDetails: z.object({
    title: z.string().min(1, "Title is required"),
    forename: z.string().min(1, "Forename is required"),
    surname: z.string().min(1, "Surname is required"),
    birthName: z.string().optional(),
    address: z.string().min(1, "Address is required"),
    postcode: z.string().min(1, "Postcode is required"),
    telephone: z.string().optional(),
    mobile: z.string().min(1, "Mobile number is required"),
    email: z.string().email("Invalid email address"),
    nationality: z.string().min(1, "Nationality is required"),
    passportNumber: z.string().min(1, "Passport number is required"),
    birthDate: z.string().min(1, "Birth date is required"),
    passportExpiryDate: z.string().min(1, "Passport expiry date is required"),
    nationalInsuranceNumber: z.string().min(1, "National Insurance number is required"),
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
    title: z.string().min(1, "Title is required"),
    forename: z.string().min(1, "Forename is required"),
    surname: z.string().min(1, "Surname is required"),
    address: z.string().min(1, "Address is required"),
    postcode: z.string().min(1, "Postcode is required"),
    contactNumber: z.string().min(1, "Contact number is required"),
    email: z.string().email("Invalid email address").optional(),
    relationship: z.string().min(1, "Relationship is required"),
  }),
  fitnessForWork: z.object({
    name: z.string().min(1, "Name is required"),
    date: z.string().min(1, "Date is required"),
  }),
  disabilities: z.object({
    specialArrangements: z.enum(["yes", "no"]),
    details: z.string().optional(),
  }),
  education: z.object({
    educationHistory: z.string().min(1, "Education history is required"),
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
    history: z.string().min(1, "Employment history is required"),
    formalInvestigation: z.enum(["yes", "no"]),
    investigationDetails: z.string().optional(),
  }),
  supportingStatement: z.string().min(1, "Supporting statement is required"),
  equalityAct: z.enum(["yes", "no", "prefer"]),
  referees: z.object({
    currentEmployerName: z.string().min(1, "Name is required"),
    currentEmployerAddress: z.string().min(1, "Address is required"),
    currentEmployerPostcode: z.string().min(1, "Postcode is required"),
    currentEmployerTelephone: z.string().min(1, "Telephone is required"),
    currentEmployerEmail: z.string().email("Invalid email address"),
    previousEmployerName: z.string().min(1, "Name is required"),
    previousEmployerAddress: z.string().min(1, "Address is required"),
    previousEmployerPostcode: z.string().min(1, "Postcode is required"),
    previousEmployerTelephone: z.string().min(1, "Telephone is required"),
    previousEmployerEmail: z.string().email("Invalid email address"),
  }),
  termsAndConditions: z.boolean().refine(value => value === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ApplicationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalDetails: {
        title: "",
        forename: "",
        surname: "",
        birthName: "",
        address: "",
        postcode: "",
        telephone: "",
        mobile: "",
        email: "",
        nationality: "",
        passportNumber: "",
        birthDate: "",
        passportExpiryDate: "",
        nationalInsuranceNumber: "",
      },
      furtherInformation: {
        drivingLicense: "no",
        endorsements: "",
        licenseIssuedLocation: "",
        ownVehicle: "no",
        manualDriver: false,
        automaticDriver: false,
        driveClientVehicle: "no",
        businessInsurance: "no",
        previouslyApplied: "no",
        previouslyWorked: "no",
        workedOtherAgency: "no",
        otherAgencyName: "",
      },
      nextOfKin: {
        title: "",
        forename: "",
        surname: "",
        address: "",
        postcode: "",
        contactNumber: "",
        email: "",
        relationship: "",
      },
      fitnessForWork: {
        name: "",
        date: "",
      },
      disabilities: {
        specialArrangements: "no",
        details: "",
      },
      education: {
        educationHistory: "",
        manualHandling: false,
        firstAid: false,
        foodHygiene: false,
        infectionControl: false,
        firePrevention: false,
        sova: false,
        dementia: false,
        healthAndSafety: false,
      },
      employmentHistory: {
        history: "",
        formalInvestigation: "no",
        investigationDetails: "",
      },
      supportingStatement: "",
      equalityAct: "no",
      referees: {
        currentEmployerName: "",
        currentEmployerAddress: "",
        currentEmployerPostcode: "",
        currentEmployerTelephone: "",
        currentEmployerEmail: "",
        previousEmployerName: "",
        previousEmployerAddress: "",
        previousEmployerPostcode: "",
        previousEmployerTelephone: "",
        previousEmployerEmail: "",
      },
      termsAndConditions: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Format the data to match the database schema structure
      const formattedData = {
        personalDetails: data.personalDetails,
        furtherInformation: data.furtherInformation,
        nextOfKin: data.nextOfKin,
        fitnessForWork: data.fitnessForWork,
        disabilities: data.disabilities,
        education: data.education,
        employmentHistory: data.employmentHistory,
        supportingStatement: data.supportingStatement,
        equalityAct: data.equalityAct,
        referees: data.referees,
        termsAndConditions: data.termsAndConditions
      };
      
      console.log("Submitting application form data:", formattedData);
      
      const response = await fetch("/api/detailed-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
      
      const responseData = await response.json();
      console.log("Server response:", responseData);
      
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to submit application");
      }
      
      // Success! Show toast notification
      toast({
        title: "Application submitted successfully",
        description: "Thank you for your application. Our recruitment team will review your details and contact you shortly.",
      });
      
      // Set form as submitted for visual feedback
      setFormSubmitted(true);
      
      // Scroll to top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Reset form
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Application Submission Failed",
        description: error instanceof Error ? error.message : "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-16 px-4"
    >
      <Helmet>
        <title>Application Form | Super Health Care</title>
        <meta name="description" content="Apply to join our team of professional carers at Super Health Care. Fill out our application form to start your journey with us." />
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-primary">Application Form</h1>
        <p className="text-center mb-8 text-lg">Please complete all sections of this application form to apply for a position with Super Health Care.</p>
      </motion.div>
      
      <motion.div 
        className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {formSubmitted && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-green-50 border border-green-200 text-green-800 rounded-md p-4"
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-bold text-lg">Application Submitted Successfully!</h3>
                <p className="mt-1">Thank you for your interest in joining our team. Our recruitment team will review your application and contact you shortly about the next steps.</p>
                <div className="mt-3">
                  <Button 
                    onClick={() => window.location.href = "/recruitment"} 
                    variant="outline" 
                    className="mr-2"
                  >
                    Return to Careers
                  </Button>
                  <Button 
                    onClick={() => {
                      setFormSubmitted(false);
                      form.reset();
                    }}
                  >
                    Submit Another Application
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Details Section */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold border-b pb-2 text-primary">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="personalDetails.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select title" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Mr">Mr</SelectItem>
                          <SelectItem value="Mrs">Mrs</SelectItem>
                          <SelectItem value="Miss">Miss</SelectItem>
                          <SelectItem value="Ms">Ms</SelectItem>
                          <SelectItem value="Dr">Dr</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personalDetails.forename"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Forename*</FormLabel>
                      <FormControl>
                        <Input placeholder="Forename" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personalDetails.surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Surname*</FormLabel>
                      <FormControl>
                        <Input placeholder="Surname" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Truncated for brevity in this example but would contain all form fields */}
              
              <div className="mt-8">
                <Button 
                  type="submit" 
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </motion.div>
          </form>
        </Form>
      </motion.div>
    </motion.div>
  );
}