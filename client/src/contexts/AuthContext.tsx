import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle, signOutUser } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

// Define the shape of our context
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  login: async () => {},
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

  // Login function
  const login = async () => {
    if (isLoggingIn) return;
    
    setIsLoggingIn(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        toast({
          title: "Login successful",
          description: `Welcome${user.displayName ? ', ' + user.displayName.split(' ')[0] : ''}!`,
        });
      } else {
        toast({
          title: "Login failed",
          description: "There was a problem logging in. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
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
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};