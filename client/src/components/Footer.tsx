import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/">
              <img src="/logo.svg" alt="Super Health Care" className="h-12 mb-4 bg-white rounded-md p-1" />
            </Link>
            <p className="mb-4 opacity-90">
              Providing exceptional home care services across the UK. Our dedicated team is committed to enhancing the quality of life for those we care for.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-raleway font-bold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="opacity-90 hover:opacity-100 hover:underline">Home</Link></li>
              <li><Link href="/about" className="opacity-90 hover:opacity-100 hover:underline">About Us</Link></li>
              <li><Link href="/services" className="opacity-90 hover:opacity-100 hover:underline">Our Services</Link></li>
              <li><Link href="/contact" className="opacity-90 hover:opacity-100 hover:underline">Contact Us</Link></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:underline">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-raleway font-bold text-xl mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="opacity-90 hover:opacity-100 hover:underline">Personal Care</Link></li>
              <li><Link href="/services" className="opacity-90 hover:opacity-100 hover:underline">Live-in Care</Link></li>
              <li><Link href="/services" className="opacity-90 hover:opacity-100 hover:underline">Domestic Support</Link></li>
              <li><Link href="/services" className="opacity-90 hover:opacity-100 hover:underline">Companionship</Link></li>
              <li><Link href="/services" className="opacity-90 hover:opacity-100 hover:underline">Specialized Care</Link></li>
              <li><Link href="/services" className="opacity-90 hover:opacity-100 hover:underline">Respite Care</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-raleway font-bold text-xl mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                <span>123 Care Street, London, SW1A 1AA, UK</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                <span>01234 567 890</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                <span>info@superhealthcare.co.uk</span>
              </li>
            </ul>
            
            <div className="mt-4 flex items-center">
              <div className="bg-white p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
                <span className="text-primary text-xs font-semibold text-center block mt-1">CQC Registered</span>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="border-white/20 mb-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm opacity-90">
            &copy; {currentYear} Super Health Care Ltd. All rights reserved.
          </div>
          <div className="text-sm opacity-90 flex flex-wrap justify-center gap-4">
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:underline">Terms & Conditions</Link>
            <a href="#" className="hover:underline">Cookie Policy</a>
            <a href="#" className="hover:underline">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
