import { useEffect } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useAuth } from "@/hooks/useAuth";
import { PageTransition } from "@/lib/transitions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarClock, FileText, Heart, Home, MessageSquare, Settings } from "lucide-react";

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
                    <CardHeader>
                      <CardTitle>Upcoming Appointments</CardTitle>
                      <CardDescription>Your scheduled care visits</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Care Assessment</h4>
                              <p className="text-sm text-muted-foreground">Thursday, June 4, 2023 - 10:00 AM</p>
                            </div>
                            <Button variant="outline" size="sm">Reschedule</Button>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">View All Appointments</Button>
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
                  <CardHeader>
                    <CardTitle>Your Appointments</CardTitle>
                    <CardDescription>Manage your care visits and schedules</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Your appointments will be shown here.</p>
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