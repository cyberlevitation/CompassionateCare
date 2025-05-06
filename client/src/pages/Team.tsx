import { Helmet } from "react-helmet";

const Team = () => {
  return (
    <div className="py-20 mt-16">
      <Helmet>
        <title>Our Team | Super Health Care</title>
        <meta name="description" content="Meet our dedicated team of care professionals at Super Health Care, committed to providing exceptional home care services across the UK." />
      </Helmet>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h1>
          <p className="max-w-3xl mx-auto text-lg text-neutral-600">
            Meet the dedicated professionals who make Super Health Care the trusted provider of home care services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Management Team */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary h-40 flex items-center justify-center">
              <span className="text-white text-5xl font-bold">SD</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Sarah Dodge</h3>
              <p className="text-primary font-medium mb-3">Managing Director</p>
              <p className="text-neutral-600 mb-4">
                With over 15 years of experience in the care sector, Sarah leads the company with a focus on quality care and continuous improvement.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary h-40 flex items-center justify-center">
              <span className="text-white text-5xl font-bold">JT</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">James Thompson</h3>
              <p className="text-primary font-medium mb-3">Care Manager</p>
              <p className="text-neutral-600 mb-4">
                James ensures that our care delivery meets the highest standards, overseeing the care plans and service delivery for all clients.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary h-40 flex items-center justify-center">
              <span className="text-white text-5xl font-bold">MP</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Maria Patel</h3>
              <p className="text-primary font-medium mb-3">Training Coordinator</p>
              <p className="text-neutral-600 mb-4">
                Maria develops and delivers comprehensive training programs for our care staff, ensuring they have the skills to provide exceptional care.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary h-40 flex items-center justify-center">
              <span className="text-white text-5xl font-bold">RK</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Robert Kelly</h3>
              <p className="text-primary font-medium mb-3">Quality Assurance Manager</p>
              <p className="text-neutral-600 mb-4">
                Robert is responsible for monitoring and improving our care delivery systems, ensuring we meet regulatory requirements.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary h-40 flex items-center justify-center">
              <span className="text-white text-5xl font-bold">EJ</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Emily Johnson</h3>
              <p className="text-primary font-medium mb-3">Client Services Coordinator</p>
              <p className="text-neutral-600 mb-4">
                Emily is the first point of contact for our clients and their families, coordinating care assessments and service arrangements.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary h-40 flex items-center justify-center">
              <span className="text-white text-5xl font-bold">DW</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">David Wilson</h3>
              <p className="text-primary font-medium mb-3">HR Manager</p>
              <p className="text-neutral-600 mb-4">
                David oversees the recruitment and retention of our care staff, ensuring we have the right people to deliver excellent care.
              </p>
            </div>
          </div>
        </div>
        
        {/* Our Values Section */}
        <div className="bg-neutral-50 p-8 rounded-lg mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Compassion</h3>
              <p className="text-neutral-600">
                We provide care with kindness, empathy, and respect, treating each person as an individual.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Reliability</h3>
              <p className="text-neutral-600">
                We deliver consistent, dependable care that our clients and their families can count on.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-neutral-600">
                We strive for the highest standards in everything we do, continuously improving our services.
              </p>
            </div>
          </div>
        </div>
        
        {/* Recruitment CTA */}
        <div className="bg-primary text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="max-w-3xl mx-auto mb-6 text-lg">
            We're always looking for compassionate individuals who want to make a difference in people's lives. If you're interested in a rewarding career in care, we'd love to hear from you.
          </p>
          <a href="/recruitment" className="inline-block bg-white text-primary font-bold py-3 px-6 rounded-md hover:bg-neutral-100 transition-colors">
            View Career Opportunities
          </a>
        </div>
      </div>
    </div>
  );
};

export default Team;