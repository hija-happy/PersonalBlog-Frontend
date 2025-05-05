import { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';

function RecentBlogsSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLifestyleBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        // Filter for only Lifestyle category and take the most recent ones
        const lifestyleBlogs = response.data
          .filter(blog => 
            (Array.isArray(blog.category) ? blog.category : [blog.category]).includes('Lifestyle')
          )
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3); // Get only the 3 most recent blogs
        
        setBlogs(lifestyleBlogs);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blogs');
        setLoading(false);
        console.error('Error fetching lifestyle blogs:', err);
      }
    };
    
    fetchLifestyleBlogs();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Lifestyle Blogs</h2>
          <div className="flex justify-center">
            <div className="animate-pulse flex space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Lifestyle Blogs</h2>
          <div className="text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  // No blogs found state
  if (blogs.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Lifestyle Blogs</h2>
          <p className="text-gray-600">No lifestyle blogs found. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">Lifestyle Blogs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard 
              key={blog._id || blog.id} 
              id={blog._id || blog.id}
              title={blog.title}
              excerpt={blog.excerpt || blog.content.substring(0, 100) + '...'}
              image={blog.coverImage && blog.coverImage.url ? blog.coverImage.url : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentBlogsSection;