import { useState } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "@/contexts/AuthContext";
import UserLayout from "@/components/UserLayout";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getQueryFn, queryClient } from "@/lib/queryClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, AlertTriangle, Bell } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Schema for personal information form
const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  postcode: z.string().min(5, "Please enter a valid postcode"),
  emergencyContactName: z.string().min(2, "Name must be at least 2 characters"),
  emergencyContactPhone: z.string().min(10, "Please enter a valid phone number"),
  medicalConditions: z.string().optional(),
  allergies: z.string().optional(),
  medications: z.string().optional(),
});

// Schema for preferences form
const preferencesSchema = z.object({
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
type PreferencesFormValues = z.infer<typeof preferencesSchema>;

export default function AccountSettings() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  
  // Fetch user profile data
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["/api/profile"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: !!currentUser,
  });

  // Personal information form
  const personalInfoForm = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: currentUser?.email || "",
      phone: "",
      address: "",
      city: "",
      postcode: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      medicalConditions: "",
      allergies: "",
      medications: "",
    },
  });

  // Update form values when profile data is loaded
  useState(() => {
    if (profile) {
      personalInfoForm.reset({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || currentUser?.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        city: profile.city || "",
        postcode: profile.postcode || "",
        emergencyContactName: profile.emergencyContactName || "",
        emergencyContactPhone: profile.emergencyContactPhone || "",
        medicalConditions: profile.medicalConditions || "",
        allergies: profile.allergies || "",
        medications: profile.medications || "",
      });
      
      preferencesForm.reset({
        emailNotifications: profile.preferences?.emailNotifications ?? true,
        smsNotifications: profile.preferences?.smsNotifications ?? false,
        marketingEmails: profile.preferences?.marketingEmails ?? false,
      });
    }
  });

  // Preferences form
  const preferencesForm = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: false,
    },
  });

  // Update personal information mutation
  const updatePersonalInfoMutation = useMutation({
    mutationFn: async (data: PersonalInfoFormValues) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update personal information");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Profile updated",
        description: "Your personal information has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update preferences mutation
  const updatePreferencesMutation = useMutation({
    mutationFn: async (data: PreferencesFormValues) => {
      const response = await fetch("/api/profile/preferences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ preferences: data }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update preferences");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Preferences updated",
        description: "Your notification preferences have been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
    },
    onError: (error) => {
      console.error("Error updating preferences:", error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your preferences. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmitPersonalInfo = (data: PersonalInfoFormValues) => {
    updatePersonalInfoMutation.mutate(data);
  };

  const onSubmitPreferences = (data: PreferencesFormValues) => {
    updatePreferencesMutation.mutate(data);
  };

  return (
    <UserLayout>
      <Helmet>
        <title>Account Settings | Super Health Care</title>
        <meta name="description" content="Manage your account settings and personal information." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container max-w-4xl mx-auto py-8 px-4"
      >
        <h1 className="text-3xl font-bold text-primary mb-2">Account Settings</h1>
        <p className="text-gray-600 mb-8">
          Manage your personal information, preferences, and account settings
        </p>

        <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="personal" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Personal Information
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Preferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and emergency contact information
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingProfile ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <Form {...personalInfoForm}>
                    <form 
                      onSubmit={personalInfoForm.handleSubmit(onSubmitPersonalInfo)} 
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={personalInfoForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="First name" {...field} />
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
                                <Input placeholder="Last name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={personalInfoForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your.email@example.com"
                                  {...field}
                                  disabled
                                />
                              </FormControl>
                              <FormDescription>
                                Your email address cannot be changed
                              </FormDescription>
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
                                <Input placeholder="Phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <FormField
                          control={personalInfoForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Your address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={personalInfoForm.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="City" {...field} />
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
                                  <Input placeholder="Postcode" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <h3 className="font-medium text-lg mb-4">Emergency Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={personalInfoForm.control}
                            name="emergencyContactName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Contact Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Emergency contact name" {...field} />
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
                                  <Input placeholder="Emergency contact phone" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <h3 className="font-medium text-lg mb-4">Medical Information</h3>
                        <div className="space-y-4">
                          <FormField
                            control={personalInfoForm.control}
                            name="medicalConditions"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Medical Conditions</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="List any medical conditions..."
                                    className="min-h-[80px]"
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
                                    placeholder="List any allergies..."
                                    className="min-h-[80px]"
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
                                    placeholder="List any medications you are currently taking..."
                                    className="min-h-[80px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <Alert variant="outline" className="bg-blue-50 border-blue-200">
                        <AlertTriangle className="h-4 w-4 text-blue-600" />
                        <AlertTitle className="text-blue-800">Privacy Notice</AlertTitle>
                        <AlertDescription className="text-blue-800">
                          Your medical information is kept confidential and only shared with your care team.
                        </AlertDescription>
                      </Alert>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={updatePersonalInfoMutation.isPending}
                      >
                        {updatePersonalInfoMutation.isPending ? "Saving..." : "Save Personal Information"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications from us
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingProfile ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <Form {...preferencesForm}>
                    <form 
                      onSubmit={preferencesForm.handleSubmit(onSubmitPreferences)} 
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <FormField
                          control={preferencesForm.control}
                          name="emailNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Email Notifications</FormLabel>
                                <FormDescription>
                                  Receive appointment reminders and important updates via email
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
                                  Receive appointment reminders and important updates via text message
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
                                  Receive news, promotions, and offers about our services
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

                      <Alert variant="outline" className="bg-amber-50 border-amber-200">
                        <Bell className="h-4 w-4 text-amber-600" />
                        <AlertTitle className="text-amber-800">Important</AlertTitle>
                        <AlertDescription className="text-amber-800">
                          We'll always send critical notifications related to your care and 
                          appointments regardless of these settings.
                        </AlertDescription>
                      </Alert>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={updatePreferencesMutation.isPending}
                      >
                        {updatePreferencesMutation.isPending ? "Saving..." : "Save Preferences"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </UserLayout>
  );
}