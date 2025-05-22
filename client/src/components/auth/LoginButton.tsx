import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const LoginButton = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (isAuthenticated) {
    return null; // Don't show login button if user is authenticated
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline"
          className="bg-secondary text-white font-medium hover:bg-secondary/90 transition-colors"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Log In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-primary">
            Welcome to Super Health Care
          </DialogTitle>
          <DialogDescription className="text-center">
            Login or create an account to access personalized care services
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="pt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="p-1">
            <LoginForm onSuccess={() => setIsOpen(false)} />
          </TabsContent>
          <TabsContent value="signup" className="p-1">
            <SignupForm onSuccess={() => setIsOpen(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginButton;