import { Link } from "wouter";
import { Badge, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="pt-20 md:pt-24 bg-gradient-to-r from-primary/10 to-secondary/10 relative">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center md:flex-row md:items-start md:space-x-8">
        <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
          <h1 className="font-raleway font-bold text-3xl md:text-4xl lg:text-5xl text-primary leading-tight mb-4">
            Compassionate Care in the Comfort of Your Home
          </h1>
          <p className="text-lg md:text-xl text-neutral-700 mb-8 max-w-lg md:max-w-none">
            Providing exceptional home care services across the UK. Our dedicated team is committed to enhancing the quality of life for those we care for.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-white font-medium py-6 px-6 rounded-lg shadow-md transition duration-300 text-base w-full sm:w-auto">
                Request Care Today
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="bg-white hover:bg-neutral-100 text-primary border-2 border-primary font-medium py-6 px-6 rounded-lg transition duration-300 text-base w-full sm:w-auto">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
            alt="Caregiver assisting elderly client at home" 
            className="rounded-xl shadow-xl w-full h-auto object-cover"
          />
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <Badge className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-raleway font-semibold text-lg text-primary mb-2">CQC Registered</h3>
              <p className="text-neutral-700">Our services meet the high standards set by the Care Quality Commission.</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <div className="bg-secondary/10 p-3 rounded-full text-secondary">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-raleway font-semibold text-lg text-primary mb-2">Person-Centered Care</h3>
              <p className="text-neutral-700">Tailored care plans designed around your individual needs and preferences.</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <div className="bg-accent/10 p-3 rounded-full text-accent">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-raleway font-semibold text-lg text-primary mb-2">24/7 Support</h3>
              <p className="text-neutral-700">Round-the-clock care services available to support your needs at any time.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
