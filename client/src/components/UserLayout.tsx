import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import UserSidebar from "./UserSidebar";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const { isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, loading, setLocation]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <span className="ml-2 text-xl text-primary font-medium">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
      <div className="w-full md:w-64 md:min-h-[calc(100vh-80px)] border-b md:border-r border-gray-200">
        <UserSidebar />
      </div>
      <div className="flex-1 bg-gray-50">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;