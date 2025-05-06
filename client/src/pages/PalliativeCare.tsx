import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const PalliativeCare = () => {
  return (
    <div className="py-20 mt-16">
      <Helmet>
        <title>Palliative Care Services | Super Health Care</title>
        <meta name="description" content="Compassionate palliative care services provided by Super Health Care. Our skilled carers offer dignified end-of-life support in the comfort of your own home." />
      </Helmet>
      
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Palliative Care Services</h1>
              <p className="text-lg text-neutral-700 mb-6">
                Compassionate, dignified care supporting individuals with life-limiting illnesses and their families, delivered with expertise and empathy in the comfort of home.
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
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
                alt="Caregiver providing compassionate support" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
        
        {/* About Palliative Care */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Understanding Palliative Care</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4">
                Palliative care focuses on providing relief from the symptoms and stress of a serious illness. The goal is to improve quality of life for both the patient and their family, regardless of the diagnosis or stage of disease.
              </p>
              <p className="mb-4">
                Unlike hospice care, which is specifically for end-of-life care, palliative care can be provided at any stage of a serious illness and alongside curative treatment.
              </p>
              <p>
                At Super Health Care, our palliative care services are delivered by specially trained carers who understand the complex physical, emotional, social, and spiritual needs of individuals with life-limiting conditions.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">When Palliative Care May Be Needed</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold">Terminal Illness</span>
                    <p className="text-sm text-neutral-600">For individuals with conditions such as advanced cancer, end-stage heart disease, or other terminal diagnoses.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold">Chronic Progressive Illness</span>
                    <p className="text-sm text-neutral-600">For those with progressive conditions such as advanced COPD, Parkinson's disease, or heart failure.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold">Complex Symptom Management</span>
                    <p className="text-sm text-neutral-600">When symptoms such as pain, breathlessness, or nausea need specialized management.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold">End-of-Life Care</span>
                    <p className="text-sm text-neutral-600">Providing comfort, dignity, and support during the final stages of life.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Our Palliative Care Services */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Palliative Care Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Personal Care & Comfort</h3>
              <p className="text-neutral-600">
                Assistance with personal hygiene, positioning for comfort, managing symptoms, and general physical care needs with dignity and respect.
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
                Assistance with administering medications, monitoring effectiveness, and communicating with healthcare professionals about symptom control.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Emotional Support</h3>
              <p className="text-neutral-600">
                Providing companionship, a listening ear, and emotional care to both the individual and their family members during a challenging time.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Home Environment Management</h3>
              <p className="text-neutral-600">
                Keeping the living space clean, comfortable, and suitable for care needs, including light housekeeping and meal preparation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Respite for Family Carers</h3>
              <p className="text-neutral-600">
                Providing planned breaks for family members who are providing care, allowing them time to rest and recharge.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Coordination with Healthcare Team</h3>
              <p className="text-neutral-600">
                Working alongside other healthcare professionals such as district nurses, GPs, and specialist palliative care teams to ensure integrated care.
              </p>
            </div>
          </div>
        </div>
        
        {/* Our Approach */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Approach to Palliative Care</h2>
          <div className="bg-neutral-50 p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Holistic Care</h3>
                <p className="text-neutral-600 mb-4">
                  We recognize that palliative care must address the whole person – physical, emotional, social, and spiritual needs. Our approach is comprehensive, focusing on enhancing quality of life across all these dimensions.
                </p>
                <p className="text-neutral-600 mb-4">
                  Our carers are trained to be attentive to all aspects of wellbeing, not just physical symptoms, ensuring truly holistic support.
                </p>
                <h3 className="text-xl font-bold mb-4 mt-6">Person-Centered Support</h3>
                <p className="text-neutral-600">
                  Each individual's needs, preferences, and wishes are at the heart of our care planning. We take time to understand what matters most to the person and their family, and tailor our support accordingly.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Dignity and Compassion</h3>
                <p className="text-neutral-600 mb-4">
                  We believe that everyone deserves to be treated with the utmost dignity and compassion, especially during challenging times. Our carers provide support with sensitivity, respect, and genuine care.
                </p>
                <h3 className="text-xl font-bold mb-4">Family Support</h3>
                <p className="text-neutral-600 mb-4">
                  We recognize that palliative care affects the whole family. Our support extends to family members, providing practical assistance, emotional support, and guidance throughout the journey.
                </p>
                <h3 className="text-xl font-bold mb-4">Collaborative Care</h3>
                <p className="text-neutral-600">
                  We work closely with other healthcare professionals involved in the person's care to ensure a coordinated approach. This multidisciplinary collaboration ensures comprehensive support for complex needs.
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
                "When my father needed palliative care, Super Health Care provided not just practical support but emotional support for our whole family. Their compassionate, skilled carers made his final months comfortable and dignified, allowing him to remain in his own home as he wished. Their sensitivity and professionalism made a difficult time more bearable."
              </p>
              <div>
                <p className="font-bold">Michael Wilson</p>
                <p className="text-neutral-500">Son of client</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Discuss Your Palliative Care Needs</h2>
          <p className="max-w-3xl mx-auto mb-6 text-lg">
            Our compassionate palliative care team is here to provide the support you and your family need. Contact us today for a free, no-obligation consultation.
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

export default PalliativeCare;