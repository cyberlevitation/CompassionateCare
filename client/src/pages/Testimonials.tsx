import { Helmet } from "react-helmet";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      content: "The care and support provided by Super Health Care has been outstanding. My mother's quality of life has improved dramatically since they began caring for her. The carers are compassionate, reliable, and truly care about her wellbeing.",
      author: "Margaret Johnson",
      relationship: "Daughter of client",
      location: "London"
    },
    {
      id: 2,
      content: "I was apprehensive about having someone come into my home, but the staff at Super Health Care have been wonderful. They respect my independence while providing the support I need. I'm so grateful for their kindness and professionalism.",
      author: "Thomas Williams",
      relationship: "Client",
      location: "Manchester"
    },
    {
      id: 3,
      content: "The team has been exceptional in caring for my father who has dementia. Their patience and understanding have made such a difference, and they've built a genuine rapport with him. They go above and beyond what we expected.",
      author: "Sarah Thompson",
      relationship: "Daughter of client",
      location: "Birmingham"
    },
    {
      id: 4,
      content: "As someone with complex care needs, finding the right support has been challenging. Super Health Care has provided consistently excellent care tailored to my specific requirements. Their staff are well-trained and truly professional.",
      author: "David Roberts",
      relationship: "Client",
      location: "Leeds"
    },
    {
      id: 5,
      content: "The live-in carer who looks after my aunt has become like family to us. Her dedication and genuine care have made what was a difficult situation into a positive experience. We couldn't ask for better support.",
      author: "Elizabeth Parker",
      relationship: "Niece of client",
      location: "Bristol"
    },
    {
      id: 6,
      content: "After my stroke, I was worried about losing my independence. The carers from Super Health Care have helped me regain my confidence and adapt to my new circumstances with dignity. Their approach is person-centered and respectful.",
      author: "Robert Thompson",
      relationship: "Client",
      location: "Liverpool"
    },
    {
      id: 7,
      content: "The respite care service has been a lifeline for our family. Knowing my husband is in capable and caring hands allows me to take the breaks I need without worry. Their attention to detail is impressive.",
      author: "Patricia Brown",
      relationship: "Wife and primary caregiver",
      location: "Sheffield"
    },
    {
      id: 8,
      content: "When my father needed palliative care, Super Health Care provided not just practical support but emotional support for our whole family. Their compassionate approach made a difficult time more bearable.",
      author: "Michael Wilson",
      relationship: "Son of client",
      location: "Newcastle"
    }
  ];

  return (
    <div className="py-20 mt-16">
      <Helmet>
        <title>Testimonials | Super Health Care</title>
        <meta name="description" content="Read what our clients and their families have to say about the quality care services provided by Super Health Care across the UK." />
      </Helmet>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h1>
          <p className="max-w-3xl mx-auto text-lg text-neutral-600">
            Don't just take our word for it. Here's what our clients and their families have to say about our care services.
          </p>
        </div>
        
        {/* Video Testimonial */}
        <div className="bg-neutral-50 p-8 rounded-lg mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Featured Video Testimonials</h2>
            <div className="aspect-w-16 aspect-h-9 bg-neutral-200 rounded-lg mb-6 flex items-center justify-center">
              <div className="text-center p-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-primary mb-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <p className="text-neutral-600">Video testimonial player would appear here</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg italic mb-4">"The care provided by Super Health Care has transformed my mother's life. The team is professional, compassionate, and truly dedicated."</p>
              <p className="font-medium">- James Wilson, son of client</p>
            </div>
          </div>
        </div>
        
        {/* Written Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold">{testimonial.author}</h3>
                  <p className="text-sm text-neutral-600">{testimonial.relationship}, {testimonial.location}</p>
                </div>
              </div>
              <div className="mb-4">
                <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z" />
                </svg>
              </div>
              <p className="text-neutral-600 italic">{testimonial.content}</p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Experience Our Care Services</h2>
          <p className="max-w-3xl mx-auto mb-6 text-lg">
            Join the many satisfied clients and families who have trusted Super Health Care for their home care needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-primary font-bold py-3 px-6 rounded-md hover:bg-neutral-100 transition-colors">
              Contact Us
            </a>
            <a href="/book-an-introduction" className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-md hover:bg-white/10 transition-colors">
              Book an Introduction
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;