import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useAuth } from "@/hooks/useAuth";
import { PageTransition } from "@/lib/transitions";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format, parseISO, differenceInMinutes, addMinutes } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Calendar, Clock, Edit, MapPin, MoreHorizontal, User, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface CareProvider {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
}

interface Appointment {
  id: number;
  userId: string;
  appointmentType: string;
  date: string;
  duration: number;
  status: string;
  notes?: string;
  careProviderId?: number;
  location: string;
  createdAt: string;
  updatedAt: string;
  careProvider?: CareProvider;
}

// Helper function to get human-readable appointment type
const getAppointmentTypeLabel = (type: string): string => {
  const types: Record<string, string> = {
    initial_assessment: "Initial Assessment",
    regular_care: "Regular Care Visit",
    medical_check: "Medical Check",
    therapy_session: "Therapy Session",
    social_visit: "Social Visit"
  };
  return types[type] || type;
};

// Helper function to get human-readable location
const getLocationLabel = (location: string): string => {
  const locations: Record<string, string> = {
    client_home: "Your Home",
    care_center: "Care Center",
    virtual: "Virtual Appointment"
  };
  return locations[location] || location;
};

// Status badge colors
const getStatusColor = (status: string): string => {
  switch (status) {
    case "scheduled":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "rescheduled":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function Appointments() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeAppointment, setActiveAppointment] = useState<Appointment | null>(null);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/api/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  // Fetch all appointments
  const { 
    data: allAppointments = [],
    isLoading: isLoadingAppointments,
    refetch: refetchAppointments
  } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments"],
    enabled: isAuthenticated
  });

  // Fetch upcoming appointments
  const { 
    data: upcomingAppointments = [],
    isLoading: isLoadingUpcoming,
  } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments/upcoming"],
    enabled: isAuthenticated
  });

  // Filter appointments by status
  const pastAppointments = allAppointments.filter(
    appointment => appointment.status === "completed" || 
    new Date(appointment.date) < new Date()
  );

  // Appointment cancellation mutation
  const cancelMutation = useMutation({
    mutationFn: async (appointmentId: number) => {
      return await apiRequest("POST", `/api/appointments/${appointmentId}/cancel`, {});
    },
    onSuccess: () => {
      toast({
        title: "Appointment Cancelled",
        description: "Your appointment has been successfully cancelled.",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/appointments/upcoming"] });
    },
    onError: (error) => {
      toast({
        title: "Cancellation Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    }
  });

  const handleCancelAppointment = (appointment: Appointment) => {
    cancelMutation.mutate(appointment.id);
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
        <title>Your Appointments | Super Health Care</title>
        <meta name="description" content="Manage your care appointments and schedule new visits." />
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
                  Back to Dashboard
                </Button>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Appointments</h1>
                <p className="text-neutral-600">View and manage your care appointments</p>
              </div>
              <Button 
                onClick={() => setLocation("/book-appointment")}
                className="bg-primary hover:bg-primary/90"
              >
                Book New Appointment
              </Button>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past Appointments</TabsTrigger>
                <TabsTrigger value="all">All Appointments</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>
                      Your scheduled care visits for the future
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingUpcoming ? (
                      <div className="py-8 text-center">
                        <div className="animate-pulse flex flex-col items-center">
                          <div className="h-4 w-48 bg-gray-200 rounded mb-4"></div>
                          <div className="h-4 w-64 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ) : upcomingAppointments.length === 0 ? (
                      <div className="py-8 text-center">
                        <p className="text-muted-foreground">You don't have any upcoming appointments.</p>
                        <Button
                          variant="outline"
                          onClick={() => setLocation("/book-appointment")}
                          className="mt-4"
                        >
                          Book an Appointment
                        </Button>
                      </div>
                    ) : (
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date & Time</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Location</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {upcomingAppointments.map((appointment) => (
                              <TableRow key={appointment.id}>
                                <TableCell>
                                  <div className="font-medium">
                                    {format(parseISO(appointment.date), "PPP")}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {format(parseISO(appointment.date), "h:mm a")}
                                  </div>
                                </TableCell>
                                <TableCell>{getAppointmentTypeLabel(appointment.appointmentType)}</TableCell>
                                <TableCell>{getLocationLabel(appointment.location)}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem onClick={() => setActiveAppointment(appointment)}>
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem onClick={() => setLocation(`/edit-appointment/${appointment.id}`)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Reschedule
                                      </DropdownMenuItem>
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <DropdownMenuItem 
                                            onSelect={(e) => e.preventDefault()}
                                            className="text-red-600 focus:text-red-600"
                                          >
                                            <X className="mr-2 h-4 w-4" />
                                            Cancel Appointment
                                          </DropdownMenuItem>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              Are you sure you want to cancel this appointment? This action cannot be undone.
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
                                            <AlertDialogAction
                                              onClick={() => handleCancelAppointment(appointment)}
                                              className="bg-red-600 hover:bg-red-700"
                                            >
                                              Cancel Appointment
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="past">
                <Card>
                  <CardHeader>
                    <CardTitle>Past Appointments</CardTitle>
                    <CardDescription>
                      Your previous care visits and completed sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingAppointments ? (
                      <div className="py-8 text-center">
                        <div className="animate-pulse flex flex-col items-center">
                          <div className="h-4 w-48 bg-gray-200 rounded mb-4"></div>
                          <div className="h-4 w-64 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ) : pastAppointments.length === 0 ? (
                      <div className="py-8 text-center">
                        <p className="text-muted-foreground">You don't have any past appointments.</p>
                      </div>
                    ) : (
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date & Time</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Location</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {pastAppointments.map((appointment) => (
                              <TableRow key={appointment.id}>
                                <TableCell>
                                  <div className="font-medium">
                                    {format(parseISO(appointment.date), "PPP")}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {format(parseISO(appointment.date), "h:mm a")}
                                  </div>
                                </TableCell>
                                <TableCell>{getAppointmentTypeLabel(appointment.appointmentType)}</TableCell>
                                <TableCell>{getLocationLabel(appointment.location)}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button 
                                    variant="ghost" 
                                    className="h-8 w-8 p-0"
                                    onClick={() => setActiveAppointment(appointment)}
                                  >
                                    <span className="sr-only">View details</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="all">
                <Card>
                  <CardHeader>
                    <CardTitle>All Appointments</CardTitle>
                    <CardDescription>
                      Complete history of your care appointments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingAppointments ? (
                      <div className="py-8 text-center">
                        <div className="animate-pulse flex flex-col items-center">
                          <div className="h-4 w-48 bg-gray-200 rounded mb-4"></div>
                          <div className="h-4 w-64 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ) : allAppointments.length === 0 ? (
                      <div className="py-8 text-center">
                        <p className="text-muted-foreground">You don't have any appointments yet.</p>
                        <Button
                          variant="outline"
                          onClick={() => setLocation("/book-appointment")}
                          className="mt-4"
                        >
                          Book an Appointment
                        </Button>
                      </div>
                    ) : (
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date & Time</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Location</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {allAppointments.map((appointment) => (
                              <TableRow key={appointment.id}>
                                <TableCell>
                                  <div className="font-medium">
                                    {format(parseISO(appointment.date), "PPP")}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {format(parseISO(appointment.date), "h:mm a")}
                                  </div>
                                </TableCell>
                                <TableCell>{getAppointmentTypeLabel(appointment.appointmentType)}</TableCell>
                                <TableCell>{getLocationLabel(appointment.location)}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button 
                                    variant="ghost" 
                                    className="h-8 w-8 p-0"
                                    onClick={() => setActiveAppointment(appointment)}
                                  >
                                    <span className="sr-only">View details</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Appointment details dialog */}
            {activeAppointment && (
              <Dialog open={!!activeAppointment} onOpenChange={(open) => !open && setActiveAppointment(null)}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Appointment Details</DialogTitle>
                    <DialogDescription>
                      Complete information about your appointment
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        Date & Time
                      </h4>
                      <p className="text-sm">
                        {format(parseISO(activeAppointment.date), "PPP")} at {format(parseISO(activeAppointment.date), "h:mm a")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Duration: {activeAppointment.duration} minutes (until {format(addMinutes(parseISO(activeAppointment.date), activeAppointment.duration), "h:mm a")})
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        Location
                      </h4>
                      <p className="text-sm">{getLocationLabel(activeAppointment.location)}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Appointment Type</h4>
                      <p className="text-sm">{getAppointmentTypeLabel(activeAppointment.appointmentType)}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Status</h4>
                      <p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activeAppointment.status)}`}>
                          {activeAppointment.status.charAt(0).toUpperCase() + activeAppointment.status.slice(1)}
                        </span>
                      </p>
                    </div>
                    
                    {activeAppointment.notes && (
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">Notes</h4>
                        <p className="text-sm">{activeAppointment.notes}</p>
                      </div>
                    )}
                  </div>
                  <DialogFooter className="sm:justify-between">
                    <DialogClose asChild>
                      <Button variant="secondary">Close</Button>
                    </DialogClose>
                    {activeAppointment.status === "scheduled" && new Date(activeAppointment.date) > new Date() && (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setLocation(`/edit-appointment/${activeAppointment.id}`);
                          }}
                        >
                          Reschedule
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive">Cancel Appointment</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to cancel this appointment? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  handleCancelAppointment(activeAppointment);
                                  setActiveAppointment(null);
                                }}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Cancel Appointment
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </PageTransition>
    </>
  );
}