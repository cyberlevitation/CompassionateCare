import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

const LoginButton = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await signInWithGoogle();
      toast({
        title: "Login successful",
        description: "You have been successfully logged in.",
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "There was a problem logging in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <Button 
      onClick={handleLogin}
      disabled={isLoggingIn}
      className="bg-secondary text-white font-raleway font-medium hover:bg-secondary/90 transition-colors"
    >
      {isLoggingIn ? "Logging in..." : "Log In"}
    </Button>
  );
};

export default LoginButton;