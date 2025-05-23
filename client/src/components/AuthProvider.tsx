import { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Create context
type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      
      // If user is authenticated, get and store the token
      if (user) {
        user.getIdToken().then((token) => {
          // Store token in localStorage or sessionStorage
          localStorage.setItem("authToken", token);
        });
      } else {
        // Clear token when user is not authenticated
        localStorage.removeItem("authToken");
      }
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};