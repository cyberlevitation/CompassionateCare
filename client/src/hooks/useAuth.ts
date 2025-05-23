import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export interface UserPreferences {
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  marketingEmails?: boolean;
}

export interface AuthUser {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  preferences?: UserPreferences;
  phone?: string;
  address?: string;
  city?: string;
  postcode?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  medicalConditions?: string;
  allergies?: string;
  medications?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function useAuth() {
  // Use the Firebase AuthContext directly
  const auth = useContext(AuthContext);
  
  // Query the user profile from our backend if authenticated with Firebase
  const { data: userProfile, isLoading: isProfileLoading } = useQuery<AuthUser>({
    queryKey: ["/api/auth/user"],
    retry: false,
    enabled: !!auth.currentUser, // Only query if Firebase shows the user is authenticated
  });

  return {
    // Include all Firebase auth properties
    ...auth,
    
    // Also include the database user profile
    user: userProfile,
    isProfileLoading,
  };
}