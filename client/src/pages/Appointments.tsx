import { useState } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn, queryClient } from "@/lib/queryClient";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

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
  careProvider?: {
    id: number;
    firstName: string;
    lastName: string;
    title: string;
  };
}

export default function Appointments() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Get user appointments
  const { data: appointments, isLoading } = useQuery({
    queryKey: ["/api/appointments"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: !!currentUser,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const cancelAppointment = async (id: number) => {
    try {
      await fetch(`/api/appointments/${id}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      toast({
        title: "Appointment cancelled",
        description: "Your appointment has been successfully cancelled.",
      });
      
      // Invalidate the appointments query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
      
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast({
        title: "Error",
        description: "There was a problem cancelling your appointment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <ProtectedRoute>
      <Helmet>
        <title>My Appointments | Super Health Care</title>
        <meta name="description" content="View and manage your scheduled appointments with Super Health Care." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container max-w-6xl mx-auto py-8 px-4"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">My Appointments</h1>
            <p className="text-gray-600">
              View and manage all your scheduled care appointments
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link to="/book-appointment">
              <Calendar className="mr-2 h-4 w-4" />
              Book New Appointment
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2 text-primary">Loading appointments...</span>
          </div>
        ) : appointments && Array.isArray(appointments) && appointments.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Your Appointments</CardTitle>
              <CardDescription>
                You have {appointments.length} appointment{appointments.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Care Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment: Appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.appointmentType}</TableCell>
                      <TableCell>{formatDate(appointment.date)}</TableCell>
                      <TableCell>{appointment.duration} mins</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                          {appointment.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        {appointment.careProvider ? (
                          `${appointment.careProvider.firstName} ${appointment.careProvider.lastName}`
                        ) : (
                          "Not assigned"
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {appointment.status.toLowerCase() !== 'cancelled' && 
                         appointment.status.toLowerCase() !== 'completed' && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => setSelectedAppointment(appointment)}
                              >
                                Cancel
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will cancel your appointment on {formatDate(selectedAppointment?.date || '')}. 
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>No, keep it</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => selectedAppointment && cancelAppointment(selectedAppointment.id)}
                                >
                                  Yes, cancel appointment
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-4">
                <Calendar className="h-12 w-12 text-gray-400" />
                <h3 className="text-xl font-medium text-gray-900">No appointments found</h3>
                <p className="text-gray-500 max-w-md">
                  You don't have any appointments scheduled. Book a new appointment to get started
                  with our care services.
                </p>
                <Button asChild>
                  <Link to="/book-appointment">Book Your First Appointment</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </ProtectedRoute>
  );
}