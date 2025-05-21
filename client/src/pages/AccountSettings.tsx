import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { Helmet } from "react-helmet";
import { useAuth } from "@/hooks/useAuth";
import { PageTransition } from "@/lib/transitions";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

// Contact preferences form schema
const preferencesSchema = z.object({
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
});

// Personal information form schema
const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().min(5, "Phone number is required"),
  address: z.string().min(5, "Address is required").optional(),
  city: z.string().min(2, "City is required").optional(),
  postcode: z.string().min(5, "Postcode is required").optional(),
  emergencyContactName: z.string().min(2, "Contact name is required").optional(),
  emergencyContactPhone: z.string().min(5, "Contact phone is required").optional(),
  medicalConditions: z.string().optional(),
  allergies: z.string().optional(),
  medications: z.string().optional(),
});

// Form types
type PreferencesFormValues = z.infer<typeof preferencesSchema>;
type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

export default function AccountSettings() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("personal-info");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/api/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  // Personal Information Form
  const personalInfoForm = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: "",
      address: "",
      city: "",
      postcode: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      medicalConditions: "",
      allergies: "",
      medications: "",
    }
  });

  // Update form values when user data loads
  useEffect(() => {
    if (user) {
      personalInfoForm.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: "",
        address: "",
        city: "",
        postcode: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        medicalConditions: "",
        allergies: "",
        medications: "",
      });
    }
  }, [user, personalInfoForm]);

  // Preferences Form
  const preferencesForm = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: true,
      marketingEmails: false,
    }
  });

  // Handle personal info update
  const personalInfoMutation = useMutation({
    mutationFn: async (data: PersonalInfoFormValues) => {
      return await apiRequest("PATCH", "/api/user/profile", data);
    },
    onSuccess: () => {
      toast({
        title: "Profile Updated",
        description: "Your personal information has been updated successfully.",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    }
  });

  // Handle preferences update
  const preferencesMutation = useMutation({
    mutationFn: async (data: PreferencesFormValues) => {
      return await apiRequest("PATCH", "/api/user/preferences", data);
    },
    onSuccess: () => {
      toast({
        title: "Preferences Updated",
        description: "Your communication preferences have been updated successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    }
  });

  // Submit handlers
  const onSubmitPersonalInfo = (data: PersonalInfoFormValues) => {
    personalInfoMutation.mutate(data);
  };

  const onSubmitPreferences = (data: PreferencesFormValues) => {
    preferencesMutation.mutate(data);
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
        <title>Account Settings | Super Health Care</title>
        <meta name="description" content="Manage your account settings and preferences." />
      </Helmet>

      <PageTransition>
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Account Settings</h1>
                <p className="text-neutral-600">Manage your profile information and preferences</p>
              </div>
              <Button variant="outline" onClick={() => setLocation("/dashboard")}>
                Back to Dashboard
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={user?.profileImageUrl} alt={user?.firstName || 'User'} />
                      <AvatarFallback className="bg-primary text-white text-xl">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-center">{user?.firstName} {user?.lastName}</CardTitle>
                    <CardDescription className="text-center mt-1">{user?.email}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <TabsList className="grid w-full grid-cols-1 gap-2">
                    <TabsTrigger 
                      value="personal-info" 
                      onClick={() => setActiveTab("personal-info")}
                      className={activeTab === "personal-info" ? "bg-primary text-white" : ""}
                    >
                      Personal Information
                    </TabsTrigger>
                    <TabsTrigger 
                      value="preferences" 
                      onClick={() => setActiveTab("preferences")}
                      className={activeTab === "preferences" ? "bg-primary text-white" : ""}
                    >
                      Preferences
                    </TabsTrigger>
                    <TabsTrigger 
                      value="security" 
                      onClick={() => setActiveTab("security")}
                      className={activeTab === "security" ? "bg-primary text-white" : ""}
                    >
                      Security
                    </TabsTrigger>
                  </TabsList>
                </CardContent>
              </Card>

              <div className="lg:col-span-3">
                {activeTab === "personal-info" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details and emergency contact information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...personalInfoForm}>
                        <form onSubmit={personalInfoForm.handleSubmit(onSubmitPersonalInfo)} className="space-y-8">
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-medium">Basic Information</h3>
                              <p className="text-sm text-muted-foreground">
                                Your personal details that will be used across the platform.
                              </p>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={personalInfoForm.control}
                                name="firstName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={personalInfoForm.control}
                                name="lastName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={personalInfoForm.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-medium">Address</h3>
                              <p className="text-sm text-muted-foreground">
                                Your home address where care services will be provided.
                              </p>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-1 gap-6">
                              <FormField
                                control={personalInfoForm.control}
                                name="address"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Street Address</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                  control={personalInfoForm.control}
                                  name="city"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>City</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={personalInfoForm.control}
                                  name="postcode"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Postcode</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-medium">Emergency Contact</h3>
                              <p className="text-sm text-muted-foreground">
                                Person to contact in case of emergency.
                              </p>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={personalInfoForm.control}
                                name="emergencyContactName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Contact Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={personalInfoForm.control}
                                name="emergencyContactPhone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Contact Phone</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-medium">Medical Information</h3>
                              <p className="text-sm text-muted-foreground">
                                Important health information for your care team.
                              </p>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-1 gap-6">
                              <FormField
                                control={personalInfoForm.control}
                                name="medicalConditions"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Medical Conditions</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="List any medical conditions our carers should be aware of"
                                        className="resize-none"
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={personalInfoForm.control}
                                name="allergies"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Allergies</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="List any allergies you have"
                                        className="resize-none"
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={personalInfoForm.control}
                                name="medications"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Current Medications</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="List any medications you are currently taking"
                                        className="resize-none"
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <Button 
                              type="submit" 
                              disabled={personalInfoMutation.isPending}
                              className="bg-primary hover:bg-primary/90"
                            >
                              {personalInfoMutation.isPending ? "Saving..." : "Save Changes"}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                )}

                {activeTab === "preferences" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Communication Preferences</CardTitle>
                      <CardDescription>
                        Manage how and when we contact you
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...preferencesForm}>
                        <form onSubmit={preferencesForm.handleSubmit(onSubmitPreferences)} className="space-y-8">
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-medium">Notification Settings</h3>
                              <p className="text-sm text-muted-foreground">
                                Choose how you would like to receive updates and reminders.
                              </p>
                            </div>
                            <Separator />
                            <div className="space-y-4">
                              <FormField
                                control={preferencesForm.control}
                                name="emailNotifications"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-base">Email Notifications</FormLabel>
                                      <FormDescription>
                                        Receive appointment reminders and updates via email
                                      </FormDescription>
                                    </div>
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={preferencesForm.control}
                                name="smsNotifications"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-base">SMS Notifications</FormLabel>
                                      <FormDescription>
                                        Receive appointment reminders and updates via text message
                                      </FormDescription>
                                    </div>
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={preferencesForm.control}
                                name="marketingEmails"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-base">Marketing Emails</FormLabel>
                                      <FormDescription>
                                        Receive newsletters and promotional content
                                      </FormDescription>
                                    </div>
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <Button 
                              type="submit" 
                              disabled={preferencesMutation.isPending}
                              className="bg-primary hover:bg-primary/90"
                            >
                              {preferencesMutation.isPending ? "Saving..." : "Save Preferences"}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                )}

                {activeTab === "security" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>
                        Manage your account security and authentication
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium text-lg mb-2">Authentication</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          You're logged in with your Replit account. This provides secure authentication without the need for additional passwords.
                        </p>
                      </div>
                      
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium text-lg mb-2">Data Access</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          You have the right to access, modify or delete your personal data at any time.
                        </p>
                        <div className="space-x-2">
                          <Button variant="outline">Download My Data</Button>
                          <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                            Request Account Deletion
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}