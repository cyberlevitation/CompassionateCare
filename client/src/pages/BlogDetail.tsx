import { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Share, FacebookIcon, TwitterIcon, LinkedinIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Mock blog post data (in a real app, this would be fetched from an API)
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

const mockBlogPost: BlogPost = {
  id: '1',
  title: 'Understanding Dementia Care: A Comprehensive Guide for Families',
  slug: 'understanding-dementia-care',
  excerpt: 'Learn about the challenges and solutions for providing care to loved ones with dementia.',
  content: `
    <p>Caring for a loved one with dementia presents unique challenges that require patience, understanding, and specialized knowledge. At Super Health Care, we understand the emotional journey families undertake when a loved one is diagnosed with dementia.</p>
    
    <h2>What is Dementia?</h2>
    <p>Dementia is not a specific disease but rather a general term for the impaired ability to remember, think, or make decisions that interferes with everyday activities. Alzheimer's disease is the most common type of dementia. Though dementia mostly affects older adults, it is not a part of normal aging.</p>
    
    <h2>Early Signs and Symptoms</h2>
    <p>Recognizing the early signs of dementia can help families seek appropriate care sooner. Common symptoms include:</p>
    <ul>
      <li>Memory loss that disrupts daily life</li>
      <li>Challenges in planning or solving problems</li>
      <li>Difficulty completing familiar tasks</li>
      <li>Confusion with time or place</li>
      <li>Trouble understanding visual images and spatial relationships</li>
      <li>New problems with words in speaking or writing</li>
      <li>Misplacing things and losing the ability to retrace steps</li>
      <li>Decreased or poor judgment</li>
      <li>Withdrawal from work or social activities</li>
      <li>Changes in mood and personality</li>
    </ul>
    
    <h2>Creating a Supportive Environment</h2>
    <p>People with dementia thrive in environments that are familiar, stable, and provide appropriate levels of stimulation. Consider these strategies:</p>
    <ul>
      <li>Maintain a familiar environment</li>
      <li>Establish regular routines</li>
      <li>Simplify communications</li>
      <li>Provide visual cues and labels</li>
      <li>Ensure adequate lighting to reduce confusion</li>
      <li>Reduce unnecessary noise and distractions</li>
      <li>Install safety features like handrails and secured exits</li>
    </ul>
    
    <h2>The Importance of Professional Care</h2>
    <p>While family members often provide initial care, the progressive nature of dementia typically requires professional support over time. Professional caregivers can:</p>
    <ul>
      <li>Implement specialized care techniques</li>
      <li>Provide respite for family caregivers</li>
      <li>Ensure consistency in daily routines</li>
      <li>Offer emotional support for both the person with dementia and their family</li>
      <li>Apply evidence-based approaches to managing behavioral changes</li>
    </ul>
    
    <h2>Super Health Care's Approach to Dementia Care</h2>
    <p>At Super Health Care, our dementia care services focus on preserving dignity, promoting independence, and enhancing quality of life. Our caregivers receive specialized training in:</p>
    <ul>
      <li>Person-centered care techniques</li>
      <li>Communication strategies for different stages of dementia</li>
      <li>Managing challenging behaviors without medication</li>
      <li>Creating engaging and meaningful activities</li>
      <li>Supporting families through the progression of the condition</li>
    </ul>
    
    <h2>Self-Care for Family Caregivers</h2>
    <p>Caring for someone with dementia can be physically and emotionally demanding. Family caregivers should prioritize their own wellbeing by:</p>
    <ul>
      <li>Joining support groups</li>
      <li>Taking regular breaks</li>
      <li>Accepting help from others</li>
      <li>Maintaining their own health through proper nutrition, exercise, and sleep</li>
      <li>Seeking professional support when needed</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>While dementia presents significant challenges, proper care approaches can help both the person with dementia and their family navigate this journey with dignity and compassion. Super Health Care is committed to providing the specialized support needed to enhance quality of life for those affected by dementia.</p>
    
    <p>If you're caring for a loved one with dementia and need support, please contact our team to discuss how we can help.</p>
  `,
  author: 'Dr. Sarah Johnson',
  date: 'May 2, 2023',
  readTime: '8 min read',
  image: 'https://images.unsplash.com/photo-1516728778615-2d590ea1855e?q=80&w=1200&auto=format&fit=crop',
  category: 'Dementia Care'
};

export default function BlogDetail() {
  const [, params] = useRoute('/blog/:slug');
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API based on the slug
    // For now, simulate an API call with setTimeout
    const slug = params?.slug;
    
    const fetchPost = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For demo purposes, just check if the URL slug matches our mock post
        if (slug === mockBlogPost.slug) {
          setPost(mockBlogPost);
        } else {
          // No matching post found
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params]);

  if (loading) {
    return (
      <div className="container mx-auto py-20 px-4">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-10"></div>
          <div className="h-96 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto py-20 px-4">
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="mb-8">Sorry, the blog post you're looking for doesn't exist or has been removed.</p>
        <Button variant="default" asChild>
          <a href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </a>
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-20 px-4"
    >
      <Helmet>
        <title>{post.title} | Super Health Care Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="mb-8">
        <Button variant="outline" asChild>
          <a href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </a>
        </Button>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-6">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime}</span>
          </div>
          <div className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
            {post.category}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-[400px] object-cover rounded-lg" 
        />
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="md:w-8/12"
        >
          <div 
            className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-bold prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="md:w-4/12"
        >
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <h3 className="text-xl font-bold mb-4">Share This Article</h3>
            <div className="flex gap-2 mb-6">
              <Button variant="outline" size="icon" className="rounded-full">
                <FacebookIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <TwitterIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <LinkedinIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Share className="h-4 w-4" />
              </Button>
            </div>

            <Separator className="my-6" />

            <h3 className="text-xl font-bold mb-4">About the Author</h3>
            <div className="flex items-center mb-4">
              <div className="bg-primary/10 h-14 w-14 rounded-full flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-bold">{post.author}</p>
                <p className="text-sm text-gray-500">Senior Care Specialist</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Dr. Sarah Johnson has over 15 years of experience in dementia care and has published numerous research papers on person-centered approaches to memory care.
            </p>

            <Separator className="my-6" />

            <h3 className="text-xl font-bold mb-4">Need Care Support?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Our team is available to provide professional care services tailored to your family's needs.
            </p>
            <Button className="w-full">
              <a href="/contact">Contact Us Today</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}