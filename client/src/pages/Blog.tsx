import { Helmet } from "react-helmet";
import { Link } from "wouter";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Benefits of Personalised Home Care",
      excerpt: "Discover how personalised home care services can significantly improve quality of life and independence for individuals needing support.",
      date: "May 2, 2023",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Home Care"
    },
    {
      id: 2,
      title: "Understanding Dementia: A Guide for Families",
      excerpt: "An informative guide for families navigating the challenges of caring for loved ones with dementia and memory-related conditions.",
      date: "April 15, 2023",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Dementia Care"
    },
    {
      id: 3,
      title: "The Importance of Respite Care for Family Caregivers",
      excerpt: "Learn why respite care is essential for the wellbeing of family caregivers and how it can prevent burnout while ensuring quality care continues.",
      date: "March 28, 2023",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Respite Care"
    },
    {
      id: 4,
      title: "Nutrition Tips for Seniors: Maintaining a Healthy Diet",
      excerpt: "Practical advice for ensuring seniors maintain a nutritious diet that supports their health and wellbeing as they age.",
      date: "March 10, 2023",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Senior Health"
    },
    {
      id: 5,
      title: "Creating a Safe Home Environment for Elderly Individuals",
      excerpt: "Essential tips for adapting homes to make them safer and more accessible for elderly individuals with mobility or health challenges.",
      date: "February 22, 2023",
      image: "https://images.unsplash.com/photo-1568910748155-01ca989dbdd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Home Safety"
    },
    {
      id: 6,
      title: "The Role of Technology in Modern Home Care",
      excerpt: "Exploring how technology innovations are enhancing the delivery and quality of home care services for clients and caregivers alike.",
      date: "February 5, 2023",
      image: "https://images.unsplash.com/photo-1551811855-7d9b099f9e3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Innovation"
    }
  ];

  const categories = ["All", "Home Care", "Dementia Care", "Respite Care", "Senior Health", "Home Safety", "Innovation"];

  return (
    <div className="py-20 mt-16">
      <Helmet>
        <title>Blog | Super Health Care</title>
        <meta name="description" content="Read the latest articles and insights from Super Health Care about home care services, elderly well-being, and health tips for caregivers." />
      </Helmet>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Blog</h1>
          <p className="max-w-3xl mx-auto text-lg text-neutral-600">
            Insights, advice, and resources to help you navigate the world of care and support for your loved ones.
          </p>
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full ${index === 0 ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'} transition-colors`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{post.category}</span>
                  <span className="text-xs text-neutral-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-neutral-600 mb-4">
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.id}`} className="text-primary font-medium hover:underline">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Newsletter Signup */}
        <div className="bg-neutral-50 p-8 rounded-lg">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">Subscribe to Our Newsletter</h2>
            <p className="text-neutral-600 mb-6">
              Stay updated with our latest articles, care tips, and company news delivered directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md border border-neutral-300 focus:outline-none focus:border-primary"
                required
              />
              <button
                type="submit"
                className="bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-neutral-500 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;