import { Helmet } from "react-helmet";
import { useState } from "react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1581579438747-9c20eb516331?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      alt: "Caregiver assisting elderly person",
      category: "care"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1570807766655-20ec967427e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      alt: "Home support services",
      category: "home"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1559839914-17aae19cec71?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      alt: "Specialized care for dementia",
      category: "specialized"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1574279606130-09958dc756f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      alt: "Care team meeting",
      category: "team"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1516986442418-86db887ba36d?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      alt: "Caregiver taking vitals",
      category: "care"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      alt: "Elderly person with caregiver",
      category: "care"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1576765608866-5b51037981cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      alt: "Care office reception",
      category: "facilities"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1581579438747-937e7d5df647?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      alt: "Staff training session",
      category: "team"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1573497019236-61f323342eb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      alt: "Community care event",
      category: "community"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1561384478-1232e8d799ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      alt: "Medication management",
      category: "specialized"
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1479740030693-66ad10f3a7b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      alt: "Home care preparations",
      category: "home"
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1603984362497-0a878f607b92?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      alt: "Companionship activities",
      category: "community"
    }
  ];

  const categories = ["All", "Care", "Home", "Specialized", "Team", "Facilities", "Community"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="py-20 mt-16">
      <Helmet>
        <title>Photo Gallery | Super Health Care</title>
        <meta name="description" content="Browse our gallery of images showing Super Health Care's dedicated team, facilities, and the compassionate care services we provide to our clients." />
      </Helmet>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Photo Gallery</h1>
          <p className="max-w-3xl mx-auto text-lg text-neutral-600">
            Take a visual journey through our care services, team members, facilities, and community events.
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === category 
                  ? 'bg-primary text-white' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className="relative overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setSelectedImage(image.id)}
            >
              <div className="aspect-w-1 aspect-h-1">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                <p className="text-white p-4 font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Image Modal */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="max-w-4xl w-full bg-white rounded-lg overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={galleryImages.find(img => img.id === selectedImage)?.src} 
                  alt={galleryImages.find(img => img.id === selectedImage)?.alt}
                  className="object-contain w-full h-full"
                />
              </div>
              
              <div className="p-4 bg-white">
                <p className="text-lg font-medium">{galleryImages.find(img => img.id === selectedImage)?.alt}</p>
                <p className="text-neutral-500 text-sm capitalize">Category: {galleryImages.find(img => img.id === selectedImage)?.category}</p>
              </div>
              
              <div className="p-4 flex justify-between bg-neutral-100">
                <button 
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={selectedImage <= 1}
                  onClick={() => setSelectedImage(prev => prev && prev > 1 ? prev - 1 : prev)}
                >
                  Previous
                </button>
                <button 
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={selectedImage >= galleryImages.length}
                  onClick={() => setSelectedImage(prev => prev && prev < galleryImages.length ? prev + 1 : prev)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* CTA Section */}
        <div className="bg-neutral-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Experience Our Care Services</h2>
          <p className="max-w-3xl mx-auto mb-6">
            Would you like to learn more about the care services shown in our gallery? Our team is ready to answer your questions and discuss how we can support you or your loved one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
            <a 
              href="/book-an-introduction" 
              className="bg-white text-primary border border-primary font-bold py-3 px-6 rounded-md hover:bg-neutral-100 transition-colors"
            >
              Book an Introduction
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;