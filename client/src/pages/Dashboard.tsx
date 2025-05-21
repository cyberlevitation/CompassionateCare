import { useEffect } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useAuth } from "@/hooks/useAuth";
import { PageTransition } from "@/lib/transitions";
import { useQuery } from "@tanstack/react-query";
import { format, addDays, parseISO } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarClock, FileText, Heart, Home, MapPin, MessageSquare, Settings } from "lucide-react";

export default function Dashboard() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/api/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

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
        <title>My Dashboard | Super Health Care</title>
        <meta name="description" content="Manage your care services, appointments, and account details." />
      </Helmet>

      <PageTransition>
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome, {user?.firstName || 'Friend'}!</h1>
              <p className="text-neutral-600">Manage your care services, appointments, and account details.</p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8 flex flex-wrap gap-2">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Home className="h-4 w-4" /> Overview
                </TabsTrigger>
                <TabsTrigger value="appointments" className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4" /> Appointments
                </TabsTrigger>
                <TabsTrigger value="care-plans" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" /> Care Plans
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Documents
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" /> Messages
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" /> Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle>Upcoming Appointments</CardTitle>
                        <CardDescription>Your scheduled care visits</CardDescription>
                      </div>
                      <Button onClick={() => setLocation("/book-appointment")} className="ml-auto" size="sm">
                        Book New
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Care Assessment</h4>
                              <p className="text-sm text-muted-foreground">{format(addDays(new Date(), 3), "EEEE, MMMM d, yyyy")} - 10:00 AM</p>
                              <div className="flex items-center gap-x-2 mt-1">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">Your Home</span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setLocation("/appointments")}
                              >
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setLocation("/appointments")}
                        >
                          View All Appointments
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Care Plan</CardTitle>
                      <CardDescription>Your current care services</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-3">
                          <h4 className="font-medium">Weekly Home Care</h4>
                          <p className="text-sm text-muted-foreground">Personal care and household support</p>
                          <p className="text-sm text-muted-foreground mt-2">3 visits per week</p>
                        </div>
                        <Button variant="outline" className="w-full">View Care Plan Details</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Documents</CardTitle>
                      <CardDescription>Care plans and assessments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-3">
                          <h4 className="font-medium">Care Assessment Report</h4>
                          <p className="text-sm text-muted-foreground">Added May 26, 2023</p>
                          <div className="mt-2">
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">View</Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">Download</Button>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">View All Documents</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Care Team</CardTitle>
                    <CardDescription>Your dedicated healthcare professionals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="flex items-center gap-4 p-3 rounded-lg border">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <span className="text-lg font-semibold">SS</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Sarah Smith</h4>
                          <p className="text-sm text-muted-foreground">Care Coordinator</p>
                          <Button variant="link" className="h-8 px-0 py-0 text-sm">Contact</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-3 rounded-lg border">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <span className="text-lg font-semibold">JD</span>
                        </div>
                        <div>
                          <h4 className="font-medium">John Davies</h4>
                          <p className="text-sm text-muted-foreground">Primary Carer</p>
                          <Button variant="link" className="h-8 px-0 py-0 text-sm">Contact</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-3 rounded-lg border">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <span className="text-lg font-semibold">AP</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Anna Peterson</h4>
                          <p className="text-sm text-muted-foreground">Care Manager</p>
                          <Button variant="link" className="h-8 px-0 py-0 text-sm">Contact</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences and personal information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button variant="outline" onClick={() => setLocation("/account-settings")}>
                        Go to Account Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appointments">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle>Your Appointments</CardTitle>
                      <CardDescription>Manage your care visits and schedules</CardDescription>
                    </div>
                    <Button onClick={() => setLocation("/appointments")} className="ml-auto">View All</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Upcoming Appointments Preview */}
                      <div className="space-y-4">
                        {/* Sample appointment items - these will be replaced with real data */}
                        {[0, 1].map((index) => (
                          <div key={index} className="flex items-start rounded-lg border p-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mr-4">
                              <CalendarClock className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">{index === 0 ? "Initial Assessment" : "Regular Care Visit"}</p>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Scheduled</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {index === 0 
                                  ? format(addDays(new Date(), 3), "MMMM d, yyyy") + " at 10:00 AM" 
                                  : format(addDays(new Date(), 7), "MMMM d, yyyy") + " at 2:00 PM"}
                              </p>
                              <div className="flex items-center gap-x-2 pt-1">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">Your Home</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button onClick={() => setLocation("/book-appointment")} variant="default" className="w-full bg-primary hover:bg-primary/90">
                          Book New Appointment
                        </Button>
                        <Button onClick={() => setLocation("/appointments")} variant="outline" className="w-full">
                          Manage Your Appointments
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="care-plans">
                <Card>
                  <CardHeader>
                    <CardTitle>Care Plans</CardTitle>
                    <CardDescription>View and manage your personalized care plans</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Your care plans will be shown here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                    <CardDescription>Important documents related to your care</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Your documents will be shown here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages">
                <Card>
                  <CardHeader>
                    <CardTitle>Messages</CardTitle>
                    <CardDescription>Communication with your care team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Your messages will be shown here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </PageTransition>
    </>
  );
}