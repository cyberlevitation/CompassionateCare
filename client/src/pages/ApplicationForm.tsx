import { useState } from "react";
import { Helmet } from "react-helmet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    nationalInsuranceNumber: z
      .string()
      .min(1, "National Insurance number is required"),
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
  termsAndConditions: z.boolean().refine((value) => value === true, {
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
        termsAndConditions: data.termsAndConditions,
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
        description:
          "Thank you for your application. Our recruitment team will review your details and contact you shortly.",
      });

      // Set form as submitted for visual feedback
      setFormSubmitted(true);

      // Scroll to top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Reset form
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Application Submission Failed",
        description:
          error instanceof Error
            ? error.message
            : "There was an error submitting your application. Please try again.",
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
        <meta
          name="description"
          content="Apply to join our team of professional carers at Super Health Care. Fill out our application form to start your journey with us."
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-primary">
          Application Form
        </h1>
        <p className="text-center mb-8 text-lg">
          Please complete all sections of this application form to apply for a
          position with Super Health Care.
        </p>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-bold text-lg">
                  Application Submitted Successfully!
                </h3>
                <p className="mt-1">
                  Thank you for your interest in joining our team. Our
                  recruitment team will review your application and contact you
                  shortly about the next steps.
                </p>
                <div className="mt-3">
                  <Button
                    onClick={() => (window.location.href = "/recruitment")}
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
          <>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Details Section */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <h2 className="text-2xl font-semibold border-b pb-2 text-primary">
                  Personal Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="personalDetails.title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
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
                  {/* Forename */}
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
                  {/* Surname */}
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
                  {/* Birth Name */}
                  <FormField
                    control={form.control}
                    name="personalDetails.birthName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Birth Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Birth Name (if different)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Address */}
                  <FormField
                    control={form.control}
                    name="personalDetails.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address*</FormLabel>
                        <FormControl>
                          <Input placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Postcode */}
                  <FormField
                    control={form.control}
                    name="personalDetails.postcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postcode*</FormLabel>
                        <FormControl>
                          <Input placeholder="Postcode" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Telephone */}
                  <FormField
                    control={form.control}
                    name="personalDetails.telephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telephone</FormLabel>
                        <FormControl>
                          <Input placeholder="Telephone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Mobile */}
                  <FormField
                    control={form.control}
                    name="personalDetails.mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile*</FormLabel>
                        <FormControl>
                          <Input placeholder="Mobile" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="personalDetails.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Nationality */}
                  <FormField
                    control={form.control}
                    name="personalDetails.nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nationality*</FormLabel>
                        <FormControl>
                          <Input placeholder="Nationality" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Passport Number */}
                  <FormField
                    control={form.control}
                    name="personalDetails.passportNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passport Number*</FormLabel>
                        <FormControl>
                          <Input placeholder="Passport Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Birth Date */}
                  <FormField
                    control={form.control}
                    name="personalDetails.birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Birth Date*</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Passport Expiry Date */}
                  <FormField
                    control={form.control}
                    name="personalDetails.passportExpiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passport Expiry Date*</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* National Insurance Number */}
                  <FormField
                    control={form.control}
                    name="personalDetails.nationalInsuranceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>National Insurance Number*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="National Insurance Number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Further Information Section */}
                <h2 className="text-2xl font-semibold border-b pb-2 text-primary mt-8">
                  Further Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Driving License */}
                  <FormField
                    control={form.control}
                    name="furtherInformation.drivingLicense"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Do you have a full UK driving license?*
                        </FormLabel>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-row gap-4"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value="yes"
                              id="drivingLicenseYes"
                            />
                            <FormLabel htmlFor="drivingLicenseYes">
                              Yes
                            </FormLabel>
                          </FormControl>
                          <FormControl>
                            <RadioGroupItem value="no" id="drivingLicenseNo" />
                            <FormLabel htmlFor="drivingLicenseNo">No</FormLabel>
                          </FormControl>
                        </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Endorsements */}
                  <FormField
                    control={form.control}
                    name="furtherInformation.endorsements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endorsements (if any)</FormLabel>
                        <FormControl>
                          <Input placeholder="Endorsements" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* License Issued Location */}
                  <FormField
                    control={form.control}
                    name="furtherInformation.licenseIssuedLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License Issued Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="License Issued Location"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Own Vehicle */}
                  <FormField
                    control={form.control}
                    name="furtherInformation.ownVehicle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do you own a vehicle?*</FormLabel>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-row gap-4"
                        >
                          <FormControl>
                            <RadioGroupItem value="yes" id="ownVehicleYes" />
                            <FormLabel htmlFor="ownVehicleYes">Yes</FormLabel>
                          </FormControl>
                          <FormControl>
                            <RadioGroupItem value="no" id="ownVehicleNo" />
                            <FormLabel htmlFor="ownVehicleNo">No</FormLabel>
                          </FormControl>
                        </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Manual Driver */}
                  <FormField
                    control={form.control}
                    name="furtherInformation.manualDriver"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Manual Driver</FormLabel>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Automatic Driver */}
                  <FormField
                    control={form.control}
                    name="furtherInformation.automaticDriver"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Automatic Driver</FormLabel>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Drive Client Vehicle */}
                  <FormField
                    control={form.control}
                    name="furtherInformation.driveClientVehicle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Willing to drive client vehicle?*</FormLabel>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-row gap-4"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value="yes"
                              id="driveClientVehicleYes"
                            />
                            <FormLabel htmlFor="driveClientVehicleYes">
                              Yes
                            </FormLabel>
                          </FormControl>
                          <FormControl>
                            <RadioGroupItem
                              value="no"
                              id="driveClientVehicleNo"
                            />
                            <FormLabel htmlFor="driveClientVehicleNo">
                              No
                            </FormLabel>
                          </FormControl>
                        </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Business Insurance */}
                  <FormField
                    control={form.control}
                    name="furtherInformation.businessInsurance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do you have business insurance?*</FormLabel>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-row gap-4"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value="yes"
                              id="businessInsuranceYes"
                            />
                            <FormLabel htmlFor="businessInsuranceYes">
                              Yes
                            </FormLabel>
                          </FormControl>
                          <FormControl>
                            <RadioGroupItem
                              value="no"
                              id="businessInsuranceNo"
                            />
                            <FormLabel htmlFor="businessInsuranceNo">
                              No
                            </FormLabel>
                          </FormControl>
                        </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Previously Applied */}
                  <FormField
                    control={form.control}
                    name="furtherInformation.previouslyApplied"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Have you previously applied?*</FormLabel>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-row gap-4"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value="yes"
                              id="previouslyAppliedYes"
                            />
                            <FormLabel htmlFor="previouslyAppliedYes">
                              Yes
                            </FormLabel>
                          </FormControl>
                          <FormControl>
                            <RadioGroupItem
                              value="no"
                              id="previouslyAppliedNo"
                            />
                            <FormLabel htmlFor="previouslyAppliedNo">
                              No
                            </FormLabel>
                          </FormControl>
                        </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Previously Worked */}
                  <FormField
                    control={form.control}
                    name="furtherInformation.previouslyWorked"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Have you previously worked for us?*
                        </FormLabel>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-row gap-4"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value="yes"
                              id="previouslyWorkedYes"
                            />
                            <FormLabel htmlFor="previouslyWorkedYes">
                              Yes
                            </FormLabel>
                          </FormControl>
                          <FormControl>
                            <RadioGroupItem
                              value="no"
                              id="previouslyWorkedNo"
                            />
                            <FormLabel htmlFor="previouslyWorkedNo">
                              No
                            </FormLabel>
                          </FormControl>
                        </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Worked Other Agency */}
                  <FormField
                    control={form.control}
                    name="furtherInformation.workedOtherAgency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Worked for another agency?*</FormLabel>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-row gap-4"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value="yes"
                              id="workedOtherAgencyYes"
                            />
                            <FormLabel htmlFor="workedOtherAgencyYes">
                              Yes
                            </FormLabel>
                          </FormControl>
                          <FormControl>
                            <RadioGroupItem
                              value="no"
                              id="workedOtherAgencyNo"
                            />
                            <FormLabel htmlFor="workedOtherAgencyNo">
                              No
                            </FormLabel>
                          </FormControl>
                        </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Other Agency Name */}
                  <FormField
                    control={form.control}
                    name="furtherInformation.otherAgencyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Other Agency Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Other Agency Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Next of Kin Section */}
                <h2 className="text-2xl font-semibold border-b pb-2 text-primary mt-8">
                  Next of Kin
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="nextOfKin.title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title*</FormLabel>
                        <FormControl>
                          <Input placeholder="Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Forename */}
                  <FormField
                    control={form.control}
                    name="nextOfKin.forename"
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
                  {/* Surname */}
                  <FormField
                    control={form.control}
                    name="nextOfKin.surname"
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
                  {/* Address */}
                  <FormField
                    control={form.control}
                    name="nextOfKin.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address*</FormLabel>
                        <FormControl>
                          <Input placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Postcode */}
                  <FormField
                    control={form.control}
                    name="nextOfKin.postcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postcode*</FormLabel>
                        <FormControl>
                          <Input placeholder="Postcode" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Contact Number */}
                  <FormField
                    control={form.control}
                    name="nextOfKin.contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number*</FormLabel>
                        <FormControl>
                          <Input placeholder="Contact Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="nextOfKin.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Relationship */}
                  <FormField
                    control={form.control}
                    name="nextOfKin.relationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship*</FormLabel>
                        <FormControl>
                          <Input placeholder="Relationship" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Fitness for Work Section */}
                <h2 className="text-2xl font-semibold border-b pb-2 text-primary mt-8">
                  Fitness for Work
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="fitnessForWork.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Date */}
                  <FormField
                    control={form.control}
                    name="fitnessForWork.date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date*</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Disabilities Section */}
                <h2 className="text-2xl font-semibold border-b pb-2 text-primary mt-8">
                  Disabilities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Special Arrangements */}
                  <FormField
                    control={form.control}
                    name="disabilities.specialArrangements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Arrangements Needed?*</FormLabel>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-row gap-4"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value="yes"
                              id="specialArrangementsYes"
                            />
                            <FormLabel htmlFor="specialArrangementsYes">
                              Yes
                            </FormLabel>
                          </FormControl>
                          <FormControl>
                            <RadioGroupItem
                              value="no"
                              id="specialArrangementsNo"
                            />
                            <FormLabel htmlFor="specialArrangementsNo">
                              No
                            </FormLabel>
                          </FormControl>
                        </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Details */}
                  <FormField
                    control={form.control}
                    name="disabilities.details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Details</FormLabel>
                        <FormControl>
                          <Input placeholder="Details" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Education Section */}
                <h2 className="text-2xl font-semibold border-b pb-2 text-primary mt-8">
                  Education
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Education History */}
                  <FormField
                    control={form.control}
                    name="education.educationHistory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education History*</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Education History"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Manual Handling */}
                  <FormField
                    control={form.control}
                    name="education.manualHandling"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Manual Handling</FormLabel>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* First Aid */}
                  <FormField
                    control={form.control}
                    name="education.firstAid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Aid</FormLabel>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Food Hygiene */}
                  <FormField
                    control={form.control}
                    name="education.foodHygiene"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Food Hygiene</FormLabel>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Infection Control */}
                  <FormField
                    control={form.control}
                    name="education.infectionControl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Infection Control</FormLabel>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Fire Prevention */}
                  <FormField
                    control={form.control}
                    name="education.firePrevention"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fire Prevention</FormLabel>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* SOVA */}
                  <FormField
                    control={form.control}
                    name="education.sova"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SOVA</FormLabel>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Dementia */}
                  <FormField
                    control={form.control}
                    name="education.dementia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dementia</FormLabel>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Health and Safety */}
                  <FormField
                    control={form.control}
                    name="education.healthAndSafety"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Health and Safety</FormLabel>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Employment History Section */}
                <h2 className="text-2xl font-semibold border-b pb-2 text-primary mt-8">
                  Employment History
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* History */}
                  <FormField
                    control={form.control}
                    name="employmentHistory.history"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment History*</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Employment History"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Formal Investigation */}
                  <FormField
                    control={form.control}
                    name="employmentHistory.formalInvestigation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Formal Investigation?*</FormLabel>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-row gap-4"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value="yes"
                              id="formalInvestigationYes"
                            />
                            <FormLabel htmlFor="formalInvestigationYes">
                              Yes
                            </FormLabel>
                          </FormControl>
                          <FormControl>
                            <RadioGroupItem
                              value="no"
                              id="formalInvestigationNo"
                            />
                            <FormLabel htmlFor="formalInvestigationNo">
                              No
                            </FormLabel>
                          </FormControl>
                        </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Investigation Details */}
                  <FormField
                    control={form.control}
                    name="employmentHistory.investigationDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investigation Details</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Investigation Details"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Supporting Statement Section */}
                <h2 className="text-2xl font-semibold border-b pb-2 text-primary mt-8">
                  Supporting Statement
                </h2>
                <FormField
                  control={form.control}
                  name="supportingStatement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supporting Statement*</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide a supporting statement"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Equality Act Section */}
                <h2 className="text-2xl font-semibold border-b pb-2 text-primary mt-8">
                  Equality Act
                </h2>
                <FormField
                  control={form.control}
                  name="equalityAct"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Do you consider yourself to have a disability under the
                        Equality Act 2010?*
                      </FormLabel>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-row gap-4"
                      >
                        <FormControl>
                          <RadioGroupItem value="yes" id="equalityActYes" />
                          <FormLabel htmlFor="equalityActYes">Yes</FormLabel>
                        </FormControl>
                        <FormControl>
                          <RadioGroupItem value="no" id="equalityActNo" />
                          <FormLabel htmlFor="equalityActNo">No</FormLabel>
                        </FormControl>
                        <FormControl>
                          <RadioGroupItem
                            value="prefer"
                            id="equalityActPrefer"
                          />
                          <FormLabel htmlFor="equalityActPrefer">
                            Prefer not to say
                          </FormLabel>
                        </FormControl>
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Referees Section */}
                <h2 className="text-2xl font-semibold border-b pb-2 text-primary mt-8">
                  Referees
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Current Employer */}
                  <FormField
                    control={form.control}
                    name="referees.currentEmployerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Employer Name*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Current Employer Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="referees.currentEmployerAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Employer Address*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Current Employer Address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="referees.currentEmployerPostcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Employer Postcode*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Current Employer Postcode"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="referees.currentEmployerTelephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Employer Telephone*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Current Employer Telephone"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="referees.currentEmployerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Employer Email*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Current Employer Email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Previous Employer */}
                  <FormField
                    control={form.control}
                    name="referees.previousEmployerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous Employer Name*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Previous Employer Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="referees.previousEmployerAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous Employer Address*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Previous Employer Address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="referees.previousEmployerPostcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous Employer Postcode*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Previous Employer Postcode"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="referees.previousEmployerTelephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous Employer Telephone*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Previous Employer Telephone"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="referees.previousEmployerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous Employer Email*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Previous Employer Email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Terms and Conditions Section */}
                <h2 className="text-2xl font-semibold border-b pb-2 text-primary mt-8">
                  Terms and Conditions
                </h2>
                <FormField
                  control={form.control}
                  name="termsAndConditions"
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
                          I agree to the terms and conditions and confirm that
                          the information provided is accurate.*
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
          </>
        </Form>
      </motion.div>
    </motion.div>
  );
}
