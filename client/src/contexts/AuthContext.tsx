import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithEmail, signUpWithEmail, signOutUser } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

// Define the shape of our context
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  signup: (email: string, password: string, displayName: string) => Promise<User | null>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  login: async () => null,
  signup: async () => null,
  logout: async () => {},
  isAuthenticated: false
});

// Create a hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user ? "User logged in" : "User logged out");
      setCurrentUser(user);
      setLoading(false);
      
      // Invalidate queries when auth state changes
      if (user) {
        queryClient.invalidateQueries();
      }
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, [queryClient]);

  // Login function with email and password
  const login = async (email: string, password: string): Promise<User | null> => {
    if (isLoggingIn) return null;
    
    setIsLoggingIn(true);
    try {
      const user = await signInWithEmail(email, password);
      if (user) {
        toast({
          title: "Login successful",
          description: `Welcome${user.displayName ? ', ' + user.displayName.split(' ')[0] : ''}!`,
        });
        return user;
      } else {
        toast({
          title: "Login failed",
          description: "There was a problem logging in. Please check your email and password.",
          variant: "destructive",
        });
        return null;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoggingIn(false);
    }
  };
  
  // Sign up function with email, password and display name
  const signup = async (email: string, password: string, displayName: string): Promise<User | null> => {
    setIsLoggingIn(true);
    try {
      const user = await signUpWithEmail(email, password, displayName);
      if (user) {
        toast({
          title: "Sign up successful",
          description: `Welcome to Super Health Care, ${displayName}!`,
        });
        return user;
      } else {
        toast({
          title: "Sign up failed",
          description: "There was a problem creating your account. Please try again.",
          variant: "destructive",
        });
        return null;
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Sign up error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOutUser();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      queryClient.clear();
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};