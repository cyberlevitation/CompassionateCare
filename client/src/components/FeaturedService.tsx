import { Link } from "wouter";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedService = () => {
  const features = [
    "Personal care and medication management",
    "Meal preparation and household tasks",
    "Companionship and emotional support",
    "Specialized care for various conditions",
    "24/7 peace of mind for family members"
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-primary/5 rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-block bg-primary/10 text-primary font-medium px-4 py-2 rounded-full mb-4">
                Featured Service
              </div>
              <h2 className="font-raleway font-bold text-2xl md:text-3xl text-primary mb-4">Live-in Care Services</h2>
              <p className="text-neutral-700 mb-6">
                Our live-in care service provides continuous support in the comfort of your own home. A dedicated caregiver lives in your home to provide personalized assistance day and night, helping with:
              </p>
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-300 text-center md:w-auto">
                  Enquire About Live-in Care
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Live-in caregiver providing personalized care at home" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedService;
