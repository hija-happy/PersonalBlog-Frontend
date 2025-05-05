import { useState, useEffect } from 'react';
import axios from 'axios';

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  
  // We'll only fetch Development posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Get all posts and filter for Development category
        const response = await axios.get('http://localhost:5000/api/blogs');
        const developmentPosts = response.data.filter(post => 
          (Array.isArray(post.category) ? post.category : [post.category]).includes('Technology')
        );
        // Sort by date (newest first) and limit to 6 posts
        const sortedPosts = developmentPosts.sort((a, b) => {
          const dateA = new Date(a.date || a.createdAt);
          const dateB = new Date(b.date || b.createdAt);
          return dateB - dateA;
        }).slice(0, 6);
        setPosts(sortedPosts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  const handleCardClick = (post) => {
    setSelectedPost(post);
    // When a post is selected, scroll to top and prevent background scrolling
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
  };

  const closeDetailView = () => {
    setSelectedPost(null);
    // Re-enable scrolling when detail view is closed
    document.body.style.overflow = 'auto';
  };

  // Loading state with purple-themed loader
  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-pulse flex space-x-2">
        <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
        <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
        <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
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
  if (posts.length === 0) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-xl text-gray-600">No development posts found</div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Development Articles</h2>
      
      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="relative">
              {selectedPost.coverImage && selectedPost.coverImage.url ? (
                <div className="h-80 w-full overflow-hidden">
                  <img 
                    src={selectedPost.coverImage.url} 
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              )}
              <button 
                onClick={closeDetailView}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="absolute top-4 left-4">
                <span className="bg-blue-700 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
                  Development
                </span>
              </div>
            </div>
            
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-blue-900">{selectedPost.title}</h2>
              <div className="flex items-center mb-8 border-b border-gray-100 pb-6">
                <div className="flex items-center">
                  {selectedPost.author && selectedPost.author.avatar ? (
                    <img 
                      src={selectedPost.author.avatar} 
                      alt={selectedPost.author.name || selectedPost.author} 
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center mr-3">
                      <span className="text-blue-700 font-medium">
                        {selectedPost.author && typeof selectedPost.author === 'object' 
                          ? selectedPost.author.name?.charAt(0) || 'A'
                          : selectedPost.author?.charAt(0) || 'A'}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-blue-900">
                      {selectedPost.author && typeof selectedPost.author === 'object'
                        ? selectedPost.author.name || 'Anonymous'
                        : selectedPost.author || 'Anonymous'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(selectedPost.date || selectedPost.createdAt).toLocaleDateString('en-US', {
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
                  {selectedPost.content}
                </p>
              </div>
              
              {/* Tags section */}
              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Related topics:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map(tag => (
                      <span key={tag} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs">
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
      
      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <div 
            key={post._id || post.id} 
            className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            onClick={() => handleCardClick(post)}
          >
            {/* Blue color indicator for development category */}
            <div className="h-1 w-full bg-blue-500"></div>
            
            {post.coverImage && post.coverImage.url ? (
              <div className="w-full h-48 overflow-hidden">
                <img 
                  src={post.coverImage.url} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ) : (
              <div className="w-full h-48 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                <span className="text-white text-lg font-medium">Development</span>
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center mb-2">
                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  Development
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  {new Date(post.date || post.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{post.title}</h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt || post.content.substring(0, 120) + '...'}
              </p>
              
              <div className="inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300">
                Read More
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;