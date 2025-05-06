import { useState } from "react";
import { Star } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";

interface Testimonial {
  content: string;
  author: string;
  relationship: string;
  initials: string;
}

const TestimonialsSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const testimonials: Testimonial[] = [
    {
      content: "The care provided to my mother has been exceptional. The caregivers are professional, compassionate, and have become like family to us. They go above and beyond in their duties and have given our family peace of mind.",
      author: "Jane D.",
      relationship: "Daughter of client",
      initials: "JD"
    },
    {
      content: "Since Super Health Care began providing live-in care for my father, his quality of life has improved dramatically. The carer is attentive, respectful, and has built a wonderful rapport with him. We couldn't be more grateful.",
      author: "Robert T.",
      relationship: "Son of client",
      initials: "RT"
    },
    {
      content: "The team at Super Health Care provided excellent end-of-life care for my husband. Their sensitivity, professionalism, and genuine compassion made a difficult time much more manageable. I will be forever thankful.",
      author: "Margaret S.",
      relationship: "Wife of client",
      initials: "MS"
    }
  ];

  const renderStars = () => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-accent text-accent" />
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-raleway font-bold text-3xl md:text-4xl text-primary mb-4">What Our Clients Say</h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
            Read about the experiences of families who have trusted us with their care needs.
          </p>
        </div>
        
        <div className="relative testimonial-slider">
          <Carousel 
            className="mx-auto max-w-5xl"
            setApi={setApi}
            onSelect={(index) => setCurrent(index)}
            opts={{
              align: "center",
              loop: true
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      {renderStars()}
                    </div>
                    <p className="italic text-neutral-700 mb-6 flex-grow">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center mt-auto">
                      <div className="mr-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-medium">
                          {testimonial.initials}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-raleway font-semibold text-primary">{testimonial.author}</h4>
                        <p className="text-sm text-neutral-700">{testimonial.relationship}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-center gap-4 mt-4">
              <CarouselPrevious className="relative left-0 right-0 top-0 translate-y-0" />
              <CarouselNext className="relative left-0 right-0 top-0 translate-y-0" />
            </div>
          </Carousel>
          
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-3 h-3 rounded-full mx-1 ${
                  current === index ? 'bg-primary' : 'bg-neutral-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
