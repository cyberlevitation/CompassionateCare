import { Helmet } from "react-helmet";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Super Health Care</title>
        <meta name="description" content="Learn about Super Health Care's mission, values, and experienced team of dedicated care professionals." />
        <meta property="og:title" content="About Super Health Care" />
        <meta property="og:description" content="With over 15 years of experience, we've dedicated ourselves to providing exceptional care that enhances the quality of life for our clients." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://superhealthcare.co.uk/about" />
      </Helmet>
      <div className="pt-20 md:pt-24 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="font-raleway font-bold text-3xl md:text-4xl lg:text-5xl text-primary leading-tight mb-6 text-center">About Our Care Services</h1>
          <p className="text-lg text-center max-w-3xl mx-auto mb-6">
            Discover the team and values behind our commitment to exceptional care.
          </p>
        </div>
      </div>
      <AboutSection />
      <div className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-raleway font-bold text-3xl md:text-4xl text-primary mb-4">Our History</h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              A journey of compassion and excellence in home care.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-neutral-100 p-8 rounded-xl shadow-sm">
              <p className="mb-4 text-neutral-700">
                Super Health Care was founded in 2008 with a simple mission: to provide exceptional care that enhances the quality of life for our clients in the comfort of their own homes.
              </p>
              <p className="mb-4 text-neutral-700">
                What began as a small team of dedicated care professionals has grown into a trusted provider of home care services across the UK. Throughout our journey, we've remained committed to our founding principles of compassion, dignity, and excellence.
              </p>
              <p className="mb-4 text-neutral-700">
                Our growth has been driven by our reputation for person-centered care and the meaningful relationships we build with our clients and their families. We continually invest in our team's training and development to ensure we provide the highest standard of care.
              </p>
              <p className="text-neutral-700">
                Today, we're proud to be a CQC-registered provider with a team of over 100 dedicated care professionals serving communities throughout the UK. While we've grown, our focus remains unchanged: enhancing the lives of those we care for, one person at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
      <CTASection />
    </>
  );
};

export default About;
