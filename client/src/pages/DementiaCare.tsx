import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const DementiaCare = () => {
  return (
    <div className="py-20 mt-16">
      <Helmet>
        <title>Dementia Care Services | Super Health Care</title>
        <meta name="description" content="Specialist dementia care services provided by Super Health Care. Our trained carers provide compassionate support for individuals living with dementia." />
      </Helmet>
      
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Specialist Dementia Care</h1>
              <p className="text-lg text-neutral-700 mb-6">
                Compassionate, person-centered care for individuals living with dementia, provided in the comfort and familiarity of their own home.
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
                src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
                alt="Caregiver helping elderly person" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
        
        {/* Understanding Dementia */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Understanding Dementia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4">
                Dementia is an umbrella term for a range of progressive conditions that affect the brain. Each person's experience with dementia is unique and they may experience symptoms differently.
              </p>
              <p className="mb-4">
                Common symptoms include memory loss, difficulty with problem-solving, language, and sometimes changes in mood or behavior. Dementia can affect anyone, although it's more common as people age.
              </p>
              <p>
                At Super Health Care, we understand that dementia affects not just the individual but their entire family. Our approach to dementia care focuses on maintaining dignity, independence, and quality of life while providing the specialized support needed.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Common Types of Dementia</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold">Alzheimer's Disease</span>
                    <p className="text-sm text-neutral-600">The most common form, causing memory loss and cognitive decline.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold">Vascular Dementia</span>
                    <p className="text-sm text-neutral-600">Caused by reduced blood flow to the brain, often from stroke or small vessel disease.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold">Lewy Body Dementia</span>
                    <p className="text-sm text-neutral-600">Characterized by abnormal protein deposits affecting thinking, movement, and behavior.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold">Frontotemporal Dementia</span>
                    <p className="text-sm text-neutral-600">Affecting the frontal and temporal lobes, often impacting behavior and language.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold">Mixed Dementia</span>
                    <p className="text-sm text-neutral-600">A combination of two or more types of dementia occurring simultaneously.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Our Dementia Care Services */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Dementia Care Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Care Plans</h3>
              <p className="text-neutral-600">
                We develop individualized care plans that address specific needs, preferences, and routines. These plans evolve as needs change, ensuring appropriate support at every stage.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Specialist Trained Carers</h3>
              <p className="text-neutral-600">
                Our carers receive specialized training in dementia care, understanding the complexities of the condition and how to provide compassionate, effective support.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Familiar Environment</h3>
              <p className="text-neutral-600">
                Providing care at home helps maintain familiar surroundings and routines, which can reduce confusion and anxiety often associated with dementia.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Daily Living Support</h3>
              <p className="text-neutral-600">
                Assistance with personal care, medication management, meal preparation, and household tasks, tailored to maintain independence where possible.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Meaningful Activities</h3>
              <p className="text-neutral-600">
                Engaging in activities that promote cognitive stimulation, reminiscence, and enjoyment, based on personal interests and abilities.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Family Support</h3>
              <p className="text-neutral-600">
                Offering guidance, education, and emotional support to family members, helping them understand dementia and how to interact effectively.
              </p>
            </div>
          </div>
        </div>
        
        {/* Our Approach */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Approach to Dementia Care</h2>
          <div className="bg-neutral-50 p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Person-Centered Care</h3>
                <p className="text-neutral-600 mb-4">
                  We focus on the individual, not just their condition. Our care approach recognizes that each person with dementia has a unique life history, preferences, and needs.
                </p>
                <p className="text-neutral-600 mb-4">
                  By taking the time to understand the person behind the dementia, we can provide care that respects their dignity, supports their remaining abilities, and enhances their quality of life.
                </p>
                <h3 className="text-xl font-bold mb-4 mt-6">Dignity and Respect</h3>
                <p className="text-neutral-600">
                  We believe in treating every individual with the utmost dignity and respect. Our carers understand the importance of preserving identity and self-worth, even as cognitive abilities decline.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Continuity of Care</h3>
                <p className="text-neutral-600 mb-4">
                  Consistency is crucial for individuals with dementia. We aim to provide the same carers whenever possible to build meaningful relationships and establish trusted routines.
                </p>
                <h3 className="text-xl font-bold mb-4">Enabling Independence</h3>
                <p className="text-neutral-600 mb-4">
                  We focus on what people can do, rather than what they cannot. Our care promotes independence and autonomy wherever possible, supporting individuals to make choices and maintain control.
                </p>
                <h3 className="text-xl font-bold mb-4">Holistic Support</h3>
                <p className="text-neutral-600">
                  We address not just physical needs but also emotional and social wellbeing. Our care encompasses all aspects of a person's life to ensure comprehensive support.
                </p>
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
                "The dementia care team from Super Health Care has been exceptional in looking after my father. Their patience, understanding, and specialized knowledge have made such a difference. They've created a safe, calm environment for him and helped our family understand his needs better. I cannot recommend them highly enough."
              </p>
              <div>
                <p className="font-bold">Sarah Thompson</p>
                <p className="text-neutral-500">Daughter of client</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Discuss Your Dementia Care Needs</h2>
          <p className="max-w-3xl mx-auto mb-6 text-lg">
            Our specialist dementia care team is here to provide the support you and your loved one need. Contact us today for a free, no-obligation consultation.
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

export default DementiaCare;