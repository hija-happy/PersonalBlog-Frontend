import { useState, useEffect } from 'react';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blogs');
        setLoading(false);
        console.error('Error fetching blogs:', err);
      }
    };
    fetchBlogs();
  }, []);

  const handleCardClick = (blog) => {
    setSelectedBlog(blog);
  };

  const closeDetailView = () => {
    setSelectedBlog(null);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-pulse flex space-x-2">
        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-xl text-red-600 font-medium">{error}</div>
    </div>
  );

  if (blogs.length === 0) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-xl text-gray-600">No blogs found</div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Blog Posts</h1>
      
      {selectedBlog ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="relative">
              {selectedBlog.coverImage && selectedBlog.coverImage.url ? (
                <div className="h-72 w-full overflow-hidden">
                  <img 
                    src={selectedBlog.coverImage.url} 
                    alt={selectedBlog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              )}
              <button 
                onClick={closeDetailView}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-4">{selectedBlog.title}</h2>
              <div className="flex items-center mb-6">
                <span className="text-sm text-gray-500">
                  {new Date(selectedBlog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                {selectedBlog.author && (
                  <span className="ml-4 text-sm text-gray-500">
                    By {selectedBlog.author}
                  </span>
                )}
              </div>
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{selectedBlog.content}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map(blog => (
          <div 
            key={blog._id} 
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 cursor-pointer hover:shadow-xl"
            onClick={() => handleCardClick(blog)}
          >
            <div className="h-48 overflow-hidden">
              {blog.coverImage && blog.coverImage.url ? (
                <img 
                  src={blog.coverImage.url} 
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
              )}
            </div>
            <div className="p-5">
              <h2 className="text-xl font-bold mb-3 text-gray-800">{blog.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {blog.content}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                <div className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                  Read More
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;