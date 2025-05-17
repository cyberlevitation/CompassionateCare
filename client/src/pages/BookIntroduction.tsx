import { Helmet } from "react-helmet";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(5, { message: "Please enter a valid phone number." }),
  careType: z.string().min(1, { message: "Please select a care type." }),
  location: z.string().min(2, { message: "Please enter a valid location." }),
  preferredDate: z.string().min(1, { message: "Please select a preferred date." }),
  preferredTime: z.string().min(1, { message: "Please select a preferred time." }),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, { message: "You must agree to the privacy policy." }),
});

type FormValues = z.infer<typeof formSchema>;

const BookIntroduction = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      careType: "",
      location: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Form data submitted:", data);
      
      toast({
        title: "Introduction Request Sent",
        description: "We've received your request and will contact you shortly to confirm your introduction meeting.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Unable to submit your request. Please try again later.",
        variant: "destructive",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 mt-16">
      <Helmet>
        <title>Book an Introduction | Super Health Care</title>
        <meta name="description" content="Schedule a no-obligation introduction with Super Health Care to discuss your home care needs and how we can support you or your loved one." />
      </Helmet>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Book an Introduction</h1>
            <p className="text-lg text-neutral-600">
              Schedule a free, no-obligation introduction to discuss your care needs and how we can help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2 bg-neutral-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">What to Expect</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Initial Consultation</h3>
                    <p className="text-neutral-600 text-sm">
                      We'll discuss your specific care needs and requirements in detail.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Care Options</h3>
                    <p className="text-neutral-600 text-sm">
                      Our care specialist will explain the different care services available to you.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Costs & Funding</h3>
                    <p className="text-neutral-600 text-sm">
                      We'll provide clear information about costs and potential funding options.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Next Steps</h3>
                    <p className="text-neutral-600 text-sm">
                      If you wish to proceed, we'll create a personalized care plan tailored to your needs.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-primary/10 p-4 rounded-lg">
                <h3 className="font-bold mb-2">No Obligation</h3>
                <p className="text-neutral-600 text-sm">
                  Our introductory meeting is completely free with no obligation to proceed with our services.
                </p>
              </div>
            </div>
            
            <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-6">Request an Introduction</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            <Input placeholder="john.smith@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      name="careType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type of Care Needed</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select care type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="personal">Personal Care</SelectItem>
                              <SelectItem value="live-in">Live-in Care</SelectItem>
                              <SelectItem value="dementia">Dementia Care</SelectItem>
                              <SelectItem value="respite">Respite Care</SelectItem>
                              <SelectItem value="palliative">Palliative Care</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location (Town/City)</FormLabel>
                        <FormControl>
                          <Input placeholder="London" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="preferredTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                              <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                              <SelectItem value="evening">Evening (5PM - 7PM)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please share any additional information that would help us prepare for our meeting."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="consent"
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
                            I agree to the <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> and consent to being contacted about my care needs.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Request Introduction"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Prefer to talk to someone directly?</h2>
            <p className="text-neutral-600 mb-4">
              If you'd prefer to speak with a care specialist immediately, please call us on:
            </p>
            <a href="tel:01234567890" className="text-2xl font-bold text-primary hover:underline flex items-center justify-center md:justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              01702333120
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookIntroduction;