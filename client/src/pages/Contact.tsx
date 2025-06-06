import { Helmet } from "react-helmet";
import ContactSection from "@/components/ContactSection";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Super Health Care</title>
        <meta name="description" content="Get in touch with Super Health Care. We're here to answer your questions and help you find the right care solution for your needs." />
        <meta property="og:title" content="Contact Super Health Care" />
        <meta property="og:description" content="Contact our friendly team to discuss your care needs. We provide professional home care services across the UK." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://superhealthcare.co.uk/contact" />
      </Helmet>
      <div className="pt-20 md:pt-24 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 py-16 md:py-24">

        </div>
      </div>
      <ContactSection />
    </>
  );
};

export default Contact;
