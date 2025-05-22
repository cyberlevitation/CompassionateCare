import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { signInWithGoogle, signOutUser } from "@/lib/firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMobile();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, loading } = useAuth();
  const isAuthenticated = !!currentUser;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className={`bg-white shadow-md fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" onClick={closeMenu} className="flex items-center">
            <img src="/images/super-health-care-logo.svg" alt="Super Health Care" className="h-14" />
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu} 
            className="md:hidden text-neutral-700"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
        
        <nav className={`${isMenuOpen || !isMobile ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-4`}>
          <Link 
            href="/" 
            onClick={closeMenu}
            className={`font-raleway font-medium ${isActive('/') ? 'text-primary border-b-2 border-primary' : 'text-neutral-700 hover:text-primary'} py-1`}
          >
            Home
          </Link>
          <div className="relative group">
            <button className={`font-raleway font-medium ${isActive('/about') || isActive('/about-us') || isActive('/team') ? 'text-primary border-b-2 border-primary' : 'text-neutral-700 hover:text-primary'} py-1 flex items-center`}>
              About
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50">
              <div className="py-1">
                <Link 
                  href="/about" 
                  onClick={closeMenu}
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  About Us
                </Link>
                <Link 
                  href="/team" 
                  onClick={closeMenu}
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  Our Team
                </Link>
                <Link 
                  href="/testimonials" 
                  onClick={closeMenu}
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  Testimonials
                </Link>
                <Link 
                  href="/gallery" 
                  onClick={closeMenu}
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  Gallery
                </Link>
              </div>
            </div>
          </div>
          <div className="relative group">
            <button className={`font-raleway font-medium ${isActive('/services') || isActive('/dementia-care') || isActive('/palliative-care') || isActive('/live-in-care') || isActive('/respite-care') ? 'text-primary border-b-2 border-primary' : 'text-neutral-700 hover:text-primary'} py-1 flex items-center`}>
              Services
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50">
              <div className="py-1">
                <Link 
                  href="/services" 
                  onClick={closeMenu}
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  All Services
                </Link>
                <Link 
                  href="/dementia-care" 
                  onClick={closeMenu}
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  Dementia Care
                </Link>
                <Link 
                  href="/palliative-care" 
                  onClick={closeMenu}
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  Palliative Care
                </Link>
                <Link 
                  href="/live-in-care" 
                  onClick={closeMenu}
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  Live-in Care
                </Link>
                <Link 
                  href="/respite-care" 
                  onClick={closeMenu}
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  Respite Care
                </Link>
              </div>
            </div>
          </div>
          <Link 
            href="/blog" 
            onClick={closeMenu}
            className={`font-raleway font-medium ${isActive('/blog') ? 'text-primary border-b-2 border-primary' : 'text-neutral-700 hover:text-primary'} py-1`}
          >
            Blog
          </Link>
          <Link 
            href="/recruitment" 
            onClick={closeMenu}
            className={`font-raleway font-medium ${isActive('/recruitment') ? 'text-primary border-b-2 border-primary' : 'text-neutral-700 hover:text-primary'} py-1`}
          >
            Careers
          </Link>
          <Link 
            href="/contact" 
            onClick={closeMenu}
            className={`font-raleway font-medium ${isActive('/contact') || isActive('/contact-us') ? 'text-primary border-b-2 border-primary' : 'text-neutral-700 hover:text-primary'} py-1`}
          >
            Contact
          </Link>
          <Link
            href="/book-an-introduction"
            onClick={closeMenu}
            className="bg-primary text-white font-raleway font-medium px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Book Intro
          </Link>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser?.photoURL || undefined} alt={currentUser?.displayName || 'User'} />
                    <AvatarFallback className="bg-primary text-white">
                      {currentUser?.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser?.displayName || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center w-full cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/appointments" className="flex items-center w-full cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Appointments</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account-settings" className="flex items-center w-full cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Account Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={() => login()}
              className="font-raleway font-medium bg-secondary text-white hover:bg-secondary/90 transition-colors"
            >
              Log In
            </Button>
          )}
          <a 
            href="tel:01702333120" 
            className="font-raleway font-bold text-primary hover:text-secondary md:ml-2 flex items-center"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            01702333120
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
