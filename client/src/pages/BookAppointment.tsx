import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useAuth } from "@/hooks/useAuth";
import { PageTransition } from "@/lib/transitions";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, addDays, isBefore, parseISO, addMinutes } from "date-fns";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronLeft, Clock, Home, MapPin } from "lucide-react";

interface CareProvider {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  specialization?: string;
  bio?: string;
  imageUrl?: string;
}

interface AppointmentFormValues {
  appointmentType: string;
  date: Date;
  time: string;
  duration: number;
  careProviderId: number;
  location: string;
  notes: string;
}

const appointmentTypeOptions = [
  { value: "initial_assessment", label: "Initial Assessment" },
  { value: "regular_care", label: "Regular Care Visit" },
  { value: "medical_check", label: "Medical Check" },
  { value: "therapy_session", label: "Therapy Session" },
  { value: "social_visit", label: "Social Visit" }
];

const durationOptions = [
  { value: 30, label: "30 minutes" },
  { value: 60, label: "1 hour" },
  { value: 90, label: "1 hour 30 minutes" },
  { value: 120, label: "2 hours" },
  { value: 180, label: "3 hours" },
  { value: 240, label: "4 hours" }
];

const locationOptions = [
  { value: "client_home", label: "Your Home" },
  { value: "care_center", label: "Care Center" },
  { value: "virtual", label: "Virtual Appointment" }
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30"
];

// Form schema
const appointmentFormSchema = z.object({
  appointmentType: z.string().min(1, "Please select an appointment type"),
  date: z.date({
    required_error: "Please select a date"
  }),
  time: z.string().min(1, "Please select a time"),
  duration: z.coerce.number().min(30, "Please select a duration"),
  careProviderId: z.coerce.number().optional(),
  location: z.string().min(1, "Please select a location"),
  notes: z.string().optional()
});

export default function BookAppointment() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Form state
  const [selectedProvider, setSelectedProvider] = useState<CareProvider | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/api/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  // Fetch care providers
  const { 
    data: careProviders = [],
    isLoading: isLoadingProviders
  } = useQuery<CareProvider[]>({
    queryKey: ["/api/care-providers"],
    enabled: isAuthenticated
  });

  // Initialize form with default values
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      appointmentType: "",
      date: new Date(),
      time: "",
      duration: 60,
      location: "client_home",
      notes: ""
    }
  });

  // Watch form values for validation and UI updates
  const selectedDate = form.watch("date");
  const selectedCareProviderId = form.watch("careProviderId");

  // When provider selection changes
  useEffect(() => {
    if (selectedCareProviderId && careProviders.length > 0) {
      const provider = careProviders.find(p => p.id === selectedCareProviderId);
      setSelectedProvider(provider || null);
    } else {
      setSelectedProvider(null);
    }
  }, [selectedCareProviderId, careProviders]);

  // Mutation for creating appointments
  const appointmentMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/appointments", data);
    },
    onSuccess: () => {
      toast({
        title: "Appointment Scheduled",
        description: "Your appointment has been successfully scheduled.",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/appointments/upcoming"] });
      // Redirect to appointments list
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast({
        title: "Scheduling Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    }
  });

  // Handle form submission
  const onSubmit = (data: AppointmentFormValues) => {
    // Combine date and time into a single Date object
    const [hours, minutes] = data.time.split(':').map(Number);
    const appointmentDate = new Date(data.date);
    appointmentDate.setHours(hours, minutes, 0, 0);
    
    // Prepare data for API
    const appointmentData = {
      ...data,
      date: appointmentDate.toISOString(),
    };
    
    // Submit data to API
    appointmentMutation.mutate(appointmentData);
  };

  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 w-full max-w-4xl bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <>
      <Helmet>
        <title>Book Appointment | Super Health Care</title>
        <meta name="description" content="Schedule a home care appointment with our professional care providers." />
      </Helmet>

      <PageTransition>
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <Button 
                  variant="outline" 
                  onClick={() => setLocation("/dashboard")}
                  className="mb-4"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Book an Appointment</h1>
                <p className="text-neutral-600">Schedule your care visit with one of our professional care providers</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Appointment Details</CardTitle>
                    <CardDescription>
                      Fill in the details below to schedule your appointment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="appointmentType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Appointment Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select appointment type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {appointmentTypeOptions.map(option => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  Choose the type of care you need
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="careProviderId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Care Provider</FormLabel>
                                <Select 
                                  onValueChange={(value) => field.onChange(parseInt(value))}
                                  defaultValue={field.value?.toString()}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a care provider" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {isLoadingProviders ? (
                                      <SelectItem value="loading" disabled>
                                        Loading providers...
                                      </SelectItem>
                                    ) : (
                                      careProviders.map(provider => (
                                        <SelectItem 
                                          key={provider.id} 
                                          value={provider.id.toString()}
                                        >
                                          {provider.firstName} {provider.lastName} - {provider.title}
                                        </SelectItem>
                                      ))
                                    )}
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  Optional: Choose a specific care provider
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) => 
                                        isBefore(date, new Date()) || 
                                        isBefore(date, addDays(new Date(), -1))
                                      }
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormDescription>
                                  Select your preferred appointment date
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Time</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select appointment time" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {timeSlots.map(time => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  Choose your preferred time slot
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Duration</FormLabel>
                                <Select 
                                  onValueChange={(value) => field.onChange(parseInt(value))}
                                  defaultValue={field.value.toString()}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select duration" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {durationOptions.map(option => (
                                      <SelectItem 
                                        key={option.value} 
                                        value={option.value.toString()}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  How long do you need the care provider?
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select location" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {locationOptions.map(option => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  Where would you like the appointment to take place?
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="notes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Special Requirements or Notes</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Please let us know if you have any special requirements or information the care provider should know"
                                  className="resize-none"
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Optional: Include any additional information or requirements
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end">
                          <Button 
                            type="submit" 
                            disabled={appointmentMutation.isPending}
                            className="bg-primary hover:bg-primary/90"
                          >
                            {appointmentMutation.isPending ? "Scheduling..." : "Schedule Appointment"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Appointment Summary</CardTitle>
                    <CardDescription>
                      Your appointment details at a glance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-medium text-sm">Date & Time</h3>
                          <p className="text-sm text-muted-foreground">
                            {selectedDate ? format(selectedDate, "PPP") : "Select a date"} {" "}
                            {form.watch("time") ? `at ${form.watch("time")}` : ""}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-medium text-sm">Duration</h3>
                          <p className="text-sm text-muted-foreground">
                            {form.watch("duration") ? `${form.watch("duration")} minutes` : "Select duration"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-medium text-sm">Location</h3>
                          <p className="text-sm text-muted-foreground">
                            {form.watch("location") === "client_home" ? "Your Home" : 
                             form.watch("location") === "care_center" ? "Care Center" : 
                             form.watch("location") === "virtual" ? "Virtual Appointment" : 
                             "Select location"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {selectedProvider && (
                      <div className="border-t pt-3">
                        <h3 className="font-medium mb-2">Care Provider</h3>
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span className="text-lg font-semibold">
                              {selectedProvider.firstName[0]}{selectedProvider.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium">{selectedProvider.firstName} {selectedProvider.lastName}</h4>
                            <p className="text-sm text-muted-foreground">{selectedProvider.title}</p>
                            {selectedProvider.specialization && (
                              <p className="text-sm text-muted-foreground mt-1">{selectedProvider.specialization}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col items-start">
                    <p className="text-sm text-muted-foreground mb-2">
                      Need to reschedule or cancel? You can manage your appointments from your dashboard after booking.
                    </p>
                    <p className="text-sm font-medium">
                      Questions? Call us at 01702333120
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}