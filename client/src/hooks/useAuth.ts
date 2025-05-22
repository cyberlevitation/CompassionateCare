import { useQuery } from "@tanstack/react-query";

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
  const { data: user, isLoading } = useQuery<AuthUser>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}