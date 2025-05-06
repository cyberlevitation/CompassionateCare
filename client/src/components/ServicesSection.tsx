import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const services = [
    {
      id: "personal-care",
      title: "Personal Care",
      description: "Assistance with daily activities including bathing, dressing, grooming, medication reminders, and mobility support.",
      image: "https://images.unsplash.com/photo-1556911073-38141963c9e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      alt: "Personal care assistance"
    },
    {
      id: "live-in-care",
      title: "Live-in Care",
      description: "Round-the-clock support from a dedicated caregiver who lives in your home, providing continuous assistance and companionship.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      alt: "Live-in care services"
    },
    {
      id: "domestic-support",
      title: "Domestic Support",
      description: "Help with household tasks including meal preparation, light cleaning, laundry, shopping, and other everyday activities.",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      alt: "Domestic support services"
    },
    {
      id: "companionship",
      title: "Companionship",
      description: "Friendly company, conversation, and emotional support, along with assistance for social activities and outings.",
      image: "https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Companionship care services"
    },
    {
      id: "specialized-care",
      title: "Specialized Care",
      description: "Tailored support for conditions such as dementia, Parkinson's, stroke recovery, and end-of-life care.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      alt: "Specialized care services"
    },
    {
      id: "respite-care",
      title: "Respite Care",
      description: "Temporary support that allows regular family caregivers to take a break and recharge while knowing their loved one is in good hands.",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      alt: "Respite care services"
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-raleway font-bold text-3xl md:text-4xl text-primary mb-4">Our Care Services</h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
            We offer a comprehensive range of home care services designed to meet your unique needs and preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <img 
                src={service.image} 
                alt={service.alt} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <h3 className="font-raleway font-semibold text-xl text-primary mb-3">{service.title}</h3>
                <p className="text-neutral-700 mb-4">
                  {service.description}
                </p>
                <Link href={`/services#${service.id}`} className="text-primary font-medium flex items-center hover:text-secondary">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/contact">
            <Button className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-lg shadow-md transition duration-300">
              Discuss Your Care Needs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
