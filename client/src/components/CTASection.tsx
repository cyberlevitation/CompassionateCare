import { Link } from "wouter";
import { PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-raleway font-bold text-3xl md:text-4xl mb-6">Ready to Discuss Your Care Needs?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Our friendly team is here to help you find the perfect care solution for yourself or your loved one.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/contact">
            <Button className="bg-white text-primary hover:bg-neutral-100 font-medium py-6 px-8 rounded-lg shadow-md transition duration-300 text-base w-full sm:w-auto">
              Contact Us Today
            </Button>
          </Link>
          <a href="tel:01234567890">
            <Button variant="outline" className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-medium py-6 px-8 rounded-lg transition duration-300 text-base w-full sm:w-auto">
              <PhoneCall className="h-5 w-5 mr-2" /> Call 01234 567 890
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
