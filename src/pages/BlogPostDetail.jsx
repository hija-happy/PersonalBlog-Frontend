import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import axios from 'axios';

const BlogPostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load this blog post. It may not exist or has been removed.');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchPost();
    }
  }, [id]);
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Delete post handler
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        await axios.delete(`/api/posts/${id}`);
        // Redirect to blog list after successful deletion
        navigate('/blog');
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Failed to delete the post. Please try again.');
      }
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl mx-auto flex flex-col items-center">
          <div className="sm:flex">
            <p className="text-4xl font-extrabold text-purple-600 sm:text-5xl">404</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Post not found</h1>
                <p className="mt-1 text-base text-gray-500">{error || "We couldn't find the post you're looking for."}</p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link
                  to="/blog"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Go back to blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white min-h-screen">
      {/* Cover Image */}
      {post.coverImage ? (
        <div className="h-80 md:h-96 bg-gray-100">
          <img 
            src={post.coverImage}
            alt={post.title} 
            className="h-full w-full object-cover" 
          />
        </div>
      ) : (
        <div className="h-80 md:h-96 bg-gradient-to-r from-purple-500 to-blue-500"></div>
      )}
      
      {/* Blog Post Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Post Header */}
        <div className="mb-10">
          <div className="mb-6">
            {post.category && (
              <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-800 bg-purple-100 rounded-full">
                {post.category}
              </span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center text-gray-500 mb-4">
            <img 
              className="h-10 w-10 rounded-full bg-gray-300 mr-3" 
              src="/api/placeholder/40/40" 
              alt="Author" 
            />
            <div>
              <p className="text-sm font-medium text-gray-900">Author Name</p>
              <div className="flex items-center text-sm">
                <span>{formatDate(post.createdAt)}</span>
                {post.createdAt !== post.updatedAt && (
                  <span className="ml-3">(Updated: {formatDate(post.updatedAt)})</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Admin Actions - Conditionally show these based on the user's role */}
          <div className="flex space-x-4 mb-8">
            <Link
              to={`/write/${post._id}`}
              className="text-sm font-medium text-purple-600 hover:text-purple-500"
            >
              Edit Post
            </Link>
            <button
              onClick={handleDelete}
              className="text-sm font-medium text-red-600 hover:text-red-500"
            >
              Delete Post
            </button>
          </div>
        </div>
        
        {/* Post Content */}
        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-line">
            {post.content}
          </div>
        </div>
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-block px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Back to Blog Link */}
        <div className="mt-16">
          <Link 
            to="/blog" 
            className="text-purple-600 hover:text-purple-500 font-medium flex items-center"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogPostDetail;