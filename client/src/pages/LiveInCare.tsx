import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const LiveInCare = () => {
  return (
    <div className="py-20 mt-16">
      <Helmet>
        <title>Live-in Care Services | Super Health Care</title>
        <meta name="description" content="Comprehensive live-in care services from Super Health Care. Our dedicated carers provide 24-hour support, enabling clients to remain independent in their own homes." />
      </Helmet>
      
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Live-in Care Services</h1>
              <p className="text-lg text-neutral-700 mb-6">
                Round-the-clock care and companionship in the comfort of your own home, supporting independence, dignity, and quality of life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/book-an-introduction">Book an Introduction</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
                alt="Caregiver and elderly person at home" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
        
        {/* About Live-in Care */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">What is Live-in Care?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4">
                Live-in care provides 24-hour support from a dedicated carer who lives in your home, offering assistance, companionship, and peace of mind. This comprehensive care option allows individuals to maintain their independence and stay in familiar surroundings rather than moving to a care home.
              </p>
              <p className="mb-4">
                Your live-in carer becomes part of daily life, providing personalized support tailored to your specific needs and preferences. They're there not just to assist with physical care, but to be a companion and trusted presence in the home.
              </p>
              <p>
                At Super Health Care, our live-in carers are carefully selected and trained to provide exceptional care with compassion, respect, and professionalism. We ensure compatible matches between clients and carers to foster positive, supportive relationships.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">When Live-in Care May Be Right For You</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold">High Care Needs</span>
                    <p className="text-sm text-neutral-600">When regular visits aren't sufficient to meet your care requirements.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold">Desire to Remain at Home</span>
                    <p className="text-sm text-neutral-600">When staying in your own home is important to your wellbeing and happiness.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold">Need for Consistency</span>
                    <p className="text-sm text-neutral-600">When having the same carer providing regular support is beneficial.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold">Complex Conditions</span>
                    <p className="text-sm text-neutral-600">For managing conditions like dementia, Parkinson's, stroke recovery, or multiple health issues.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold">Couples Care</span>
                    <p className="text-sm text-neutral-600">When both partners need support but want to remain living together.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Live-in Care Services */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">What Our Live-in Care Includes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Personal Care</h3>
              <p className="text-neutral-600">
                Assistance with bathing, dressing, grooming, toileting, and other personal care needs, delivered with dignity and respect for privacy.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Medication Management</h3>
              <p className="text-neutral-600">
                Reminders and assistance with taking medications on schedule, monitoring for side effects, and liaising with healthcare professionals.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Meal Preparation</h3>
              <p className="text-neutral-600">
                Planning and preparing nutritious meals according to dietary requirements and preferences, encouraging healthy eating habits.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Household Management</h3>
              <p className="text-neutral-600">
                Light housekeeping to maintain a clean, safe living environment, including laundry, changing beds, and keeping living areas tidy.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Companionship</h3>
              <p className="text-neutral-600">
                Meaningful company and conversation, engaging in favorite activities, and providing emotional support to prevent loneliness and isolation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Mobility Support</h3>
              <p className="text-neutral-600">
                Assistance with moving safely around the home and when going out, helping maintain physical activity and independence.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Health Monitoring</h3>
              <p className="text-neutral-600">
                Observing changes in health and wellbeing, early identification of potential issues, and communication with healthcare professionals.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Social Activities</h3>
              <p className="text-neutral-600">
                Support to maintain hobbies, interests, and social connections, including accompanying on outings and visits to family and friends.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Shopping & Errands</h3>
              <p className="text-neutral-600">
                Assistance with grocery shopping, collecting prescriptions, and other essential errands to maintain household supplies and necessities.
              </p>
            </div>
          </div>
        </div>
        
        {/* How Live-in Care Works */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How Live-in Care Works</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 inset-y-0 w-0.5 bg-primary/30 hidden md:block"></div>
            
            <div className="space-y-12">
              <div className="relative">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex items-center">
                    <div className="bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center z-10">1</div>
                    <div className="hidden md:block w-8"></div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-md md:ml-2">
                    <h3 className="text-xl font-bold mb-2">Initial Assessment</h3>
                    <p className="text-neutral-600">
                      We begin with a thorough assessment of your needs, preferences, and lifestyle. This helps us understand your requirements and match you with the most suitable carer. We'll discuss your daily routines, health needs, interests, and any specific concerns.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex items-center">
                    <div className="bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center z-10">2</div>
                    <div className="hidden md:block w-8"></div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-md md:ml-2">
                    <h3 className="text-xl font-bold mb-2">Carer Matching</h3>
                    <p className="text-neutral-600">
                      We carefully select a live-in carer whose skills, experience, and personality are well-matched to your needs and preferences. The right match is essential for a successful live-in care arrangement, so we take this process very seriously.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex items-center">
                    <div className="bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center z-10">3</div>
                    <div className="hidden md:block w-8"></div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-md md:ml-2">
                    <h3 className="text-xl font-bold mb-2">Care Plan Development</h3>
                    <p className="text-neutral-600">
                      We create a detailed care plan tailored to your specific needs, outlining all aspects of your care and support requirements. This plan serves as a guide for your carer but is flexible and can be adjusted as your needs change.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex items-center">
                    <div className="bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center z-10">4</div>
                    <div className="hidden md:block w-8"></div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-md md:ml-2">
                    <h3 className="text-xl font-bold mb-2">Carer Introduction</h3>
                    <p className="text-neutral-600">
                      Before care begins, we'll introduce you to your selected carer to ensure you're comfortable with them. This meeting allows you to get to know each other and discuss your routines and preferences in more detail.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex items-center">
                    <div className="bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center z-10">5</div>
                    <div className="hidden md:block w-8"></div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-md md:ml-2">
                    <h3 className="text-xl font-bold mb-2">Ongoing Support</h3>
                    <p className="text-neutral-600">
                      Our care managers provide regular support and supervision to ensure your care is meeting your needs. We conduct regular reviews and are always available to address any concerns or make adjustments to your care plan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonial */}
        <div className="mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex flex-col items-center text-center">
              <svg className="h-12 w-12 text-primary mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z" />
              </svg>
              <p className="text-lg italic mb-6">
                "The live-in care provided by Super Health Care has transformed my parents' lives. They can remain in their own home together, with support that's flexible to their changing needs. Their carer, Emma, has become part of the family - she's attentive, professional, and genuinely cares about their wellbeing. The peace of mind this gives our whole family is priceless."
              </p>
              <div>
                <p className="font-bold">Jennifer Bailey</p>
                <p className="text-neutral-500">Daughter of clients</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">How much does live-in care cost?</h3>
              <p className="text-neutral-600">
                Live-in care costs vary depending on your specific needs and circumstances. We provide transparent pricing following our assessment. While it's often comparable to residential care, especially for couples, the benefits of one-to-one care in your own home often represent better value.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">What if I don't get along with my carer?</h3>
              <p className="text-neutral-600">
                The relationship between you and your carer is crucial. If for any reason the match isn't working, we'll work quickly to find a more suitable carer. Our careful matching process means this rarely happens, but we're committed to ensuring you're comfortable and happy with your care.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Do live-in carers get time off?</h3>
              <p className="text-neutral-600">
                Yes, live-in carers typically work on a rota system, with regular breaks throughout the day and longer periods off. We'll arrange cover during these times to ensure continuity of care, usually with a regular replacement carer who's familiar with your routines.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">What accommodation does my carer need?</h3>
              <p className="text-neutral-600">
                Your live-in carer will need their own bedroom with suitable furniture, access to bathroom facilities, and space for their belongings. They'll share other living spaces with you, but having their own private room is essential for rest and personal time.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Your Live-in Care Journey</h2>
          <p className="max-w-3xl mx-auto mb-6 text-lg">
            Discover how our live-in care services can support you or your loved one to live independently and comfortably at home. Contact us today for a free, no-obligation consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/book-an-introduction">Book an Introduction</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              <a href="tel:01234567890">Call 01234 567 890</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveInCare;