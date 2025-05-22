import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { signInWithGoogle, logOut } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "wouter";

export const LoginButton = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await signInWithGoogle();
      // The redirect will happen automatically, so we don't need to handle success here
    } catch (error) {
      console.error("Login error:", error);
      setIsLoggingIn(false);
    }
  };

  return (
    <Button 
      onClick={handleLogin}
      disabled={isLoggingIn}
      variant="outline" 
      className="text-primary hover:bg-primary hover:text-white transition-colors"
    >
      {isLoggingIn ? "Logging in..." : "Login"}
    </Button>
  );
};

export const UserMenu = () => {
  const { user, isLoading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  if (isLoading) {
    return <Button variant="ghost" disabled>Loading...</Button>;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logOut();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Get initials for avatar fallback
  const getInitials = () => {
    if (!user) return "U";
    const firstNameInitial = user.firstName?.charAt(0) || '';
    const lastNameInitial = user.lastName?.charAt(0) || '';
    return (firstNameInitial + lastNameInitial).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.profileImageUrl} alt={user?.firstName || 'User'} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/appointments">My Appointments</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account-settings">Account Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="text-red-600 cursor-pointer"
        >
          {isLoggingOut ? "Logging out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};