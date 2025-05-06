import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMobile();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

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
            <img src="/logo.svg" alt="Super Health Care" className="h-12" />
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
        
        <nav className={`${isMenuOpen || !isMobile ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-6`}>
          <Link 
            href="/" 
            onClick={closeMenu}
            className={`font-raleway font-medium ${isActive('/') ? 'text-primary border-b-2 border-primary' : 'text-neutral-700 hover:text-primary'} py-1`}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            onClick={closeMenu}
            className={`font-raleway font-medium ${isActive('/about') ? 'text-primary border-b-2 border-primary' : 'text-neutral-700 hover:text-primary'} py-1`}
          >
            About Us
          </Link>
          <Link 
            href="/services" 
            onClick={closeMenu}
            className={`font-raleway font-medium ${isActive('/services') ? 'text-primary border-b-2 border-primary' : 'text-neutral-700 hover:text-primary'} py-1`}
          >
            Services
          </Link>
          <Link 
            href="/contact" 
            onClick={closeMenu}
            className={`font-raleway font-medium ${isActive('/contact') ? 'text-primary border-b-2 border-primary' : 'text-neutral-700 hover:text-primary'} py-1`}
          >
            Contact
          </Link>
          <a 
            href="tel:01234567890" 
            className="font-raleway font-bold text-primary hover:text-secondary md:ml-6 flex items-center"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            01234 567 890
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
