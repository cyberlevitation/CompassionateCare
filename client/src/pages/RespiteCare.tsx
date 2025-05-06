import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const RespiteCare = () => {
  return (
    <div className="py-20 mt-16">
      <Helmet>
        <title>Respite Care Services | Super Health Care</title>
        <meta name="description" content="Reliable respite care services from Super Health Care. Our temporary care services give family caregivers the break they need while ensuring continued quality care." />
      </Helmet>
      
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Respite Care Services</h1>
              <p className="text-lg text-neutral-700 mb-6">
                Dependable, high-quality temporary care that gives family caregivers a well-deserved break while ensuring their loved ones receive the same level of attentive support.
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
                src="https://images.unsplash.com/photo-1562887009-92ca32b341c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
                alt="Caregiver assisting elderly person" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
        
        {/* About Respite Care */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Understanding Respite Care</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4">
                Respite care provides temporary relief for primary caregivers, giving them a chance to take a break from the demands of caregiving. It's an essential service that supports the wellbeing of both the caregiver and the person receiving care.
              </p>
              <p className="mb-4">
                Whether it's for a few hours, several days, or longer periods, our respite care ensures continuity of support while allowing family caregivers time to rest, attend to personal matters, or simply recharge their batteries.
              </p>
              <p>
                At Super Health Care, we understand the challenges of caring for a loved one and recognize that even the most dedicated caregivers need regular breaks to maintain their own health and wellbeing. Our respite care services are designed to provide peace of mind, knowing your loved one is in capable, compassionate hands.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Benefits of Respite Care</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold">Prevents Caregiver Burnout</span>
                    <p className="text-sm text-neutral-600">Regular breaks help prevent exhaustion, stress, and health problems for family caregivers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold">Enhances Relationships</span>
                    <p className="text-sm text-neutral-600">Time apart can improve the relationship between caregivers and their loved ones.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold">Provides New Experiences</span>
                    <p className="text-sm text-neutral-600">Care recipients benefit from interacting with different people and experiencing new approaches to care.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold">Maintains Caregiver Health</span>
                    <p className="text-sm text-neutral-600">Allows time for caregivers to attend to their own health appointments and self-care needs.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold">Emergency Backup</span>
                    <p className="text-sm text-neutral-600">Provides a safety net for times when family caregivers have unexpected events or emergencies.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Our Respite Care Services */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Respite Care Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Short-Term Care</h3>
              <p className="text-neutral-600">
                Temporary care provided in the home for a few hours or days, allowing family caregivers time for appointments, errands, or simply rest.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Extended Breaks</h3>
              <p className="text-neutral-600">
                Longer term care covering several weeks, enabling family caregivers to take vacations or extended periods of rest and recuperation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Regular Scheduled Relief</h3>
              <p className="text-neutral-600">
                Planned, regular respite sessions (e.g., weekly or monthly) that give family caregivers predictable breaks they can rely on.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Emergency Respite</h3>
              <p className="text-neutral-600">
                Urgent care support provided at short notice when family caregivers face unexpected situations or emergencies.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Specialized Care Respite</h3>
              <p className="text-neutral-600">
                Respite services delivered by carers with specific training for conditions like dementia, Parkinson's, or other complex needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Overnight Care</h3>
              <p className="text-neutral-600">
                Support provided during the night, allowing family caregivers to get uninterrupted sleep and proper rest.
              </p>
            </div>
          </div>
        </div>
        
        {/* How Our Respite Care Works */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How Our Respite Care Works</h2>
          
          <div className="bg-neutral-50 p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="bg-primary text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">1</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Assessment</h3>
                <p className="text-neutral-600">
                  We begin with a comprehensive assessment to understand the care needs, preferences, and routines of your loved one. This helps us maintain continuity of care during respite periods.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="bg-primary text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">2</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Matching</h3>
                <p className="text-neutral-600">
                  We carefully select carers who match both the practical care requirements and the personality preferences of your loved one, ensuring they feel comfortable during respite periods.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="bg-primary text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">3</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Planning</h3>
                <p className="text-neutral-600">
                  We develop a detailed care plan for the respite period, including all routines, medications, preferences, and emergency contacts to ensure seamless care.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="bg-primary text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">4</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Introduction</h3>
                <p className="text-neutral-600">
                  We introduce the respite carer to both the care recipient and family caregiver before the respite period begins, facilitating a smooth transition.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="bg-primary text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">5</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Care Delivery</h3>
                <p className="text-neutral-600">
                  Our trained carers provide the agreed support, maintaining routines and delivering care according to the established plan while family caregivers take their break.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="bg-primary text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">6</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Follow-up</h3>
                <p className="text-neutral-600">
                  After the respite period, we review how the care went, gather feedback, and make notes for future respite visits to continuously improve the service.
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
                "The respite care service has been a lifeline for our family. After caring for my husband with dementia for three years, I was exhausted. Super Health Care's respite service gave me the chance to take regular breaks knowing he was in expert hands. The carers are wonderful - professional, kind, and they maintain all his routines just as I would. The difference these breaks have made to my wellbeing is immeasurable."
              </p>
              <div>
                <p className="font-bold">Patricia Brown</p>
                <p className="text-neutral-500">Wife and primary caregiver</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Signs You May Need Respite */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Signs You May Need Respite Care</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Physical Exhaustion
              </h3>
              <p className="text-neutral-600">
                If you're constantly tired, experiencing sleep problems, or finding it difficult to keep up with physical demands of caregiving, your body is signaling a need for rest.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Emotional Changes
              </h3>
              <p className="text-neutral-600">
                Increased irritability, anxiety, depression, or feeling emotionally drained are common signs of caregiver stress that can benefit from regular breaks.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Neglecting Personal Needs
              </h3>
              <p className="text-neutral-600">
                If you've been postponing your own medical appointments, stopping hobbies, or no longer socializing, it's time to consider respite support.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Changing Relationship
              </h3>
              <p className="text-neutral-600">
                When the caring role begins to overshadow your relationship with your loved one, respite can help restore balance and perspective.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Arrange Respite Care Support</h2>
          <p className="max-w-3xl mx-auto mb-6 text-lg">
            Taking regular breaks is not a luxury for caregivers – it's a necessity. Let us help you maintain your wellbeing while ensuring your loved one continues to receive excellent care.
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

export default RespiteCare;