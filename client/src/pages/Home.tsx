import { Helmet } from "react-helmet";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturedService from "@/components/FeaturedService";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Super Health Care | Professional Home Care Services in the UK</title>
        <meta name="description" content="Super Health Care provides exceptional home care services across the UK. Our dedicated team is committed to enhancing the quality of life for those we care for." />
        <meta property="og:title" content="Super Health Care | Professional Home Care Services" />
        <meta property="og:description" content="Compassionate and professional home care services tailored to your needs. Personal care, live-in care, companionship and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://superhealthcare.co.uk" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Raleway:wght@300;400;500;700&display=swap" />
      </Helmet>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <FeaturedService />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
    </>
  );
};

export default Home;
