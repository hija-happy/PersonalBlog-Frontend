import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Available categories
  const categories = ['All', 'Technology', 'Design', 'Development', 'Lifestyle', 'Career', 'Personal'];
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/posts');
        setPosts(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  // Filter posts by category
  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Posts</h1>
          <p className="text-xl text-gray-600">Explore our latest thoughts, ideas, and insights</p>
        </div>
        
        {/* Category Filter */}
        <div className="flex justify-center mb-10 overflow-x-auto">
          <div className="inline-flex items-center space-x-1 sm:space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11a1 1 0 112 0v4a1 1 0 11-2 0V7zm1 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-lg font-medium text-gray-900 mb-1">No posts found</h3>
            {activeCategory !== 'All' ? (
              <p className="text-gray-500">No posts in the {activeCategory} category yet</p>
            ) : (
              <p className="text-gray-500">There are no blog posts to display</p>
            )}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <div 
                key={post._id} 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Post Cover Image */}
                <div className="h-48 bg-gradient-to-br from-purple-500 to-blue-500">
                  {post.coverImage && (
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="h-full w-full object-cover" 
                    />
                  )}
                </div>
                
                {/* Post Content */}
                <div className="p-6">
                  {/* Category */}
                  {post.category && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-800 bg-purple-100 rounded-full mb-3">
                      {post.category}
                    </span>
                  )}
                  
                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    <Link to={`/blog/${post._id}`} className="hover:text-purple-600">
                      {post.title}
                    </Link>
                  </h2>
                  
                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt || post.content.substring(0, 120) + '...'}
                  </p>
                  
                  {/* Post Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        className="h-8 w-8 rounded-full bg-gray-300 mr-2" 
                        src="/api/placeholder/32/32" 
                        alt="Author" 
                      />
                      <span className="text-sm text-gray-500">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                    
                    <Link 
                      to={`/blog/${post._id}`}
                      className="text-sm font-medium text-purple-600 hover:text-purple-500"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPosts;