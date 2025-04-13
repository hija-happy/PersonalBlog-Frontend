
import posts from '../data/posts';

function BlogList() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Latest Articles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="w-full h-48 bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center">
              <span className="text-white text-lg font-medium">Featured Post</span>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-2">
                <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  {post.date}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
              
              <p className="text-gray-600 mb-4">
                {post.excerpt}
              </p>
              
              {/* Using a button instead of Link since we don't have react-router-dom */}
              <button 
                onClick={() => console.log(`Navigating to post ${post.id}`)}
                className="inline-block px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
