import { CheckCircle, Heart, HandshakeIcon, Medal, ShieldCheck } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Compassion",
      description: "We provide care with kindness, empathy, and respect at all times."
    },
    {
      icon: <HandshakeIcon className="h-8 w-8" />,
      title: "Trust",
      description: "We build relationships based on reliability, honesty, and transparency."
    },
    {
      icon: <Medal className="h-8 w-8" />,
      title: "Excellence",
      description: "We strive to exceed expectations in everything we do."
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Dignity",
      description: "We preserve and protect the dignity of each person in our care."
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-raleway font-bold text-3xl md:text-4xl text-primary mb-4">About Super Health Care</h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
            With over 15 years of experience, we've dedicated ourselves to providing exceptional care that enhances the quality of life for our clients.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
          <div className="w-full md:w-1/2">
            <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Our dedicated team of care professionals" 
                className="rounded-xl shadow-lg w-full h-auto object-cover" />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="font-raleway font-semibold text-2xl text-primary mb-4">Our Mission</h3>
            <p className="text-neutral-700 mb-4">
              At Super Health Care, we believe everyone deserves to live with dignity and independence in their own home. Our mission is to provide compassionate, high-quality care that empowers our clients and gives peace of mind to their families.
            </p>
            <p className="text-neutral-700 mb-6">
              We take pride in our team of highly trained care professionals who are dedicated to making a positive difference in the lives of those we care for. Our person-centered approach ensures that each client receives care tailored to their unique needs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span>Fully trained care professionals</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span>Personalized care plans</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span>Regular quality assessments</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span>Family involvement and support</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-neutral-100 rounded-xl p-8 md:p-12">
          <h3 className="font-raleway font-semibold text-2xl text-primary mb-6 text-center">Our Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-primary text-3xl mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h4 className="font-raleway font-semibold text-lg mb-2">{value.title}</h4>
                <p className="text-neutral-700 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
