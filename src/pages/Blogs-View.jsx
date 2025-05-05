import { useState, useEffect } from 'react';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Fixed categories as provided
  const categories = ['Technology', 'Design', 'Development', 'Lifestyle', 'Career', 'Personal'];

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
    // When a blog is selected, scroll to top and prevent background scrolling
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
  };

  const closeDetailView = () => {
    setSelectedBlog(null);
    // Re-enable scrolling when detail view is closed
    document.body.style.overflow = 'auto';
  };
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  const filteredBlogs = activeCategory === 'all' 
  ? blogs 
  : blogs.filter(blog => 
      (Array.isArray(blog.category) ? blog.category : [blog.category]).includes(activeCategory)
    );


  // Loading state with purple-themed loader
  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-pulse flex space-x-2">
        <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
        <div className="w-3 h-3 bg-purple-600 rounded-full animation-delay-150"></div>
        <div className="w-3 h-3 bg-purple-600 rounded-full animation-delay-300"></div>
      </div>
    </div>
  );

  // Error state
  if (error) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-xl text-purple-700 font-medium">{error}</div>
    </div>
  );

  // Empty state
  if (blogs.length === 0) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-xl text-gray-600">No blogs found</div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 text-center text-purple-900">Insights & Ideas</h1>
        <p className="text-center text-gray-600 mb-12">Explore our collection of thoughtful articles</p>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          <button 
            onClick={() => handleCategoryChange('all')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === 'all' 
                ? 'bg-purple-700 text-white shadow-md' 
                : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-50'
            }`}
          >
            All Posts
          </button>
          
          {categories.map(category => (
            <button 
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category 
                  ? 'bg-purple-700 text-white shadow-md' 
                  : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Blog Post Detail Modal */}
        {selectedBlog && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="relative">
                {selectedBlog.coverImage && selectedBlog.coverImage.url ? (
                  <div className="h-80 w-full overflow-hidden">
                    <img 
                      src={selectedBlog.coverImage.url} 
                      alt={selectedBlog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-40 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
                )}
                <button 
                  onClick={closeDetailView}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {selectedBlog.category && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-700 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
                      {selectedBlog.category}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4 text-purple-900">{selectedBlog.title}</h2>
                <div className="flex items-center mb-8 border-b border-gray-100 pb-6">
                  <div className="flex items-center">
                    {selectedBlog.author && selectedBlog.author.avatar ? (
                      <img 
                        src={selectedBlog.author.avatar} 
                        alt={selectedBlog.author} 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                        <span className="text-purple-700 font-medium">
                          {selectedBlog.author ? selectedBlog.author.charAt(0) : 'A'}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-purple-900">
                        {selectedBlog.author || 'Anonymous'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(selectedBlog.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {selectedBlog.content}
                  </p>
                </div>
                
                {/* Tags section */}
                {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Related topics:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedBlog.tags.map(tag => (
                        <span key={tag} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Blog Grid with Category Color Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map(blog => (
            <div 
              key={blog._id} 
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer hover:shadow-xl"
              onClick={() => handleCardClick(blog)}
            >
              {/* Color indicator based on category */}
              <div className="h-1 w-full">
                {blog.category === 'Technology' && <div className="bg-purple-600 h-full w-full"></div>}
                {blog.category === 'Design' && <div className="bg-pink-500 h-full w-full"></div>}
                {blog.category === 'Development' && <div className="bg-blue-500 h-full w-full"></div>}
                {blog.category === 'Lifestyle' && <div className="bg-green-500 h-full w-full"></div>}
                {blog.category === 'Career' && <div className="bg-yellow-500 h-full w-full"></div>}
                {blog.category === 'Personal' && <div className="bg-indigo-500 h-full w-full"></div>}
                {!blog.category && <div className="bg-gray-300 h-full w-full"></div>}
              </div>
              
              <div className="h-52 overflow-hidden relative">
                {blog.coverImage && blog.coverImage.url ? (
                  <img 
                    src={blog.coverImage.url} 
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-purple-500 to-indigo-600"></div>
                )}
                
                {blog.category && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-white bg-opacity-90 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                      {blog.category}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 text-purple-900 line-clamp-2">{blog.title}</h2>
                <p className="text-gray-600 mb-5 line-clamp-3">
                  {blog.content}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                  <div className="group inline-flex items-center">
                    <span className="px-4 py-2 bg-purple-600 text-white rounded-lg group-hover:bg-purple-700 font-medium transition-colors">
                      Read More
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Show message when no blogs match the selected category */}
        {filteredBlogs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-purple-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>  
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No posts found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
        
        {/* Pagination placeholder - can be implemented with actual pagination logic */}
        {filteredBlogs.length > 6 && (
          <div className="flex justify-center mt-12">
            <nav className="inline-flex rounded-md shadow">
              <a href="#" className="py-2 px-4 bg-white border border-gray-200 text-purple-600 rounded-l-md hover:bg-purple-50">Previous</a>
              <a href="#" className="py-2 px-4 bg-purple-600 text-white border border-purple-600">1</a>
              <a href="#" className="py-2 px-4 bg-white border border-gray-200 text-purple-600 hover:bg-purple-50">2</a>
              <a href="#" className="py-2 px-4 bg-white border border-gray-200 text-purple-600 hover:bg-purple-50">3</a>
              <a href="#" className="py-2 px-4 bg-white border border-gray-200 text-purple-600 rounded-r-md hover:bg-purple-50">Next</a>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;