import { useLocation, Link } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  FileText, 
  LogOut,
  User,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const UserSidebar = () => {
  const { currentUser, logout } = useAuth();
  const [location] = useLocation();
  
  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5 mr-3" />,
    },
    {
      name: "Appointments",
      href: "/appointments",
      icon: <Calendar className="w-5 h-5 mr-3" />,
    },
    {
      name: "Book Appointment",
      href: "/book-appointment",
      icon: <FileText className="w-5 h-5 mr-3" />,
    },
    {
      name: "Care Journey",
      href: "/care-journey",
      icon: <Heart className="w-5 h-5 mr-3" />,
    },
    {
      name: "Account Settings",
      href: "/account-settings",
      icon: <Settings className="w-5 h-5 mr-3" />,
    },
  ];

  // Get the first letter of the first name and last name, if available
  const getInitials = () => {
    if (!currentUser || !currentUser.displayName) return "U";
    
    const nameParts = currentUser.displayName.split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };
  
  // Get first name to display
  const getFirstName = () => {
    if (!currentUser || !currentUser.displayName) return "User";
    return currentUser.displayName.split(" ")[0];
  };

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Avatar className="h-10 w-10">
            {currentUser?.photoURL ? (
              <AvatarImage src={currentUser.photoURL} alt={currentUser.displayName || "User"} />
            ) : (
              <AvatarFallback className="bg-primary text-white">{getInitials()}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <h3 className="font-medium">Welcome,</h3>
            <p className="text-sm text-gray-600">{getFirstName()}</p>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md w-full transition-colors",
                location === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-6">
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default UserSidebar;