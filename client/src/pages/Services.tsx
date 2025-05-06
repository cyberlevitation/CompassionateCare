import { Helmet } from "react-helmet";
import { Check } from "lucide-react";
import { Link } from "wouter";
import ServicesSection from "@/components/ServicesSection";
import FeaturedService from "@/components/FeaturedService";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      id: "personal-care",
      title: "Personal Care",
      description: "Our personal care services are tailored to meet your individual needs with dignity and respect.",
      features: [
        "Assistance with bathing, dressing, and grooming",
        "Support with mobility and transfers",
        "Medication reminders and management",
        "Continence care and support",
        "Assistance with eating and drinking"
      ],
      image: "https://images.unsplash.com/photo-1556911073-38141963c9e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
    },
    {
      id: "live-in-care",
      title: "Live-in Care",
      description: "Round-the-clock support in the comfort of your own home, providing peace of mind for you and your loved ones.",
      features: [
        "24/7 continuous care and support",
        "Dedicated one-to-one attention",
        "Personalized care plans",
        "Support with all daily activities",
        "Companionship and emotional support"
      ],
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
    },
    {
      id: "domestic-support",
      title: "Domestic Support",
      description: "We help maintain a comfortable, clean living environment so you can focus on enjoying life.",
      features: [
        "Meal planning and preparation",
        "Light housekeeping and cleaning",
        "Laundry and ironing",
        "Shopping and errands",
        "Home organization"
      ],
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
    },
    {
      id: "companionship",
      title: "Companionship",
      description: "We provide meaningful companionship that enriches lives and prevents loneliness.",
      features: [
        "Friendly conversation and company",
        "Accompaniment to social events",
        "Support with hobbies and interests",
        "Assistance with correspondence",
        "Stimulating activities and games"
      ],
      image: "https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg?auto=compress&cs=tinysrgb&w=800&h=500"
    },
    {
      id: "specialized-care",
      title: "Specialized Care",
      description: "Expert care for specific health conditions, delivered with knowledge and compassion.",
      features: [
        "Dementia and Alzheimer's care",
        "Parkinson's support",
        "Stroke recovery assistance",
        "End-of-life and palliative care",
        "Cancer care support"
      ],
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
    },
    {
      id: "respite-care",
      title: "Respite Care",
      description: "Temporary support that allows family caregivers to take a well-deserved break.",
      features: [
        "Short-term care arrangements",
        "Flexible scheduling options",
        "Maintenance of regular routines",
        "Peace of mind for family caregivers",
        "Seamless continuation of care"
      ],
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Services | Super Health Care</title>
        <meta name="description" content="Explore Super Health Care's range of home care services including personal care, live-in care, domestic support, companionship, specialized care, and respite care." />
        <meta property="og:title" content="Home Care Services | Super Health Care" />
        <meta property="og:description" content="We offer a comprehensive range of home care services designed to meet your unique needs and preferences." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://superhealthcare.co.uk/services" />
      </Helmet>
      <div className="pt-20 md:pt-24 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="font-raleway font-bold text-3xl md:text-4xl lg:text-5xl text-primary leading-tight mb-6 text-center">Our Care Services</h1>
          <p className="text-lg text-center max-w-3xl mx-auto mb-6">
            We offer a comprehensive range of home care services designed to meet your unique needs and preferences.
          </p>
        </div>
      </div>
      
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <ul className="flex flex-wrap justify-center gap-4 mb-12">
            {services.map((service) => (
              <li key={service.id}>
                <a 
                  href={`#${service.id}`} 
                  className="inline-block bg-neutral-100 hover:bg-neutral-200 text-primary font-medium px-4 py-2 rounded-full transition"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {services.map((service, index) => (
        <div key={service.id} id={service.id} className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}>
          <div className="container mx-auto px-4">
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
              <div className="w-full md:w-1/2">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="rounded-xl shadow-lg w-full h-auto object-cover"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="font-raleway font-bold text-2xl md:text-3xl text-primary mb-4">{service.title}</h2>
                <p className="text-neutral-700 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-300">
                    Enquire About {service.title}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <FeaturedService />
      <CTASection />
    </>
  );
};

export default Services;
