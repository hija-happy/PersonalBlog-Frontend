import React, { useState } from 'react';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Mock categories and posts data
  const categories = ['All', 'Technology', 'Design', 'Development', 'Lifestyle'];
  
  const posts = [
    {
      id: 1,
      title: "How to Master React Hooks in 2025",
      excerpt: "Learn the essential hooks and patterns that every React developer should know this year.",
      category: "Development",
      date: "April 10, 2025",
      readTime: "6 min read",
      image: "/api/placeholder/800/500",
      featured: true
    },
    {
      id: 2,
      title: "10 UI Design Trends That Will Dominate This Year",
      excerpt: "Explore the cutting-edge design patterns that are reshaping the digital landscape.",
      category: "Design",
      date: "April 8, 2025",
      readTime: "8 min read",
      image: "/api/placeholder/800/500"
    },
    {
      id: 3,
      title: "The Future of AI in Web Development",
      excerpt: "How artificial intelligence is changing the way we build and interact with websites.",
      category: "Technology",
      date: "April 5, 2025",
      readTime: "10 min read",
      image: "/api/placeholder/800/500"
    },
    {
      id: 4,
      title: "Building Accessible Websites: A Complete Guide",
      excerpt: "Learn how to make your websites usable by everyone, regardless of abilities.",
      category: "Development",
      date: "April 2, 2025",
      readTime: "12 min read",
      image: "/api/placeholder/800/500"
    },
    {
      id: 5,
      title: "How I Built a Profitable Blog from Scratch",
      excerpt: "My journey from zero to 100k monthly visitors and how you can do it too.",
      category: "Lifestyle",
      date: "March 29, 2025",
      readTime: "15 min read",
      image: "/api/placeholder/800/500"
    },
    {
      id: 6,
      title: "JavaScript Performance Tips for 2025",
      excerpt: "Optimize your JavaScript code with these modern best practices.",
      category: "Development",
      date: "March 25, 2025",
      readTime: "7 min read",
      image: "/api/placeholder/800/500"
    }
  ];
  
  // Filter posts by selected category
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);
  
  // Get featured post
  const featuredPost = posts.find(post => post.featured);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Featured Post */}
      {featuredPost && (
        <div className="relative bg-gradient-to-r from-purple-800 to-blue-700 text-white">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-purple-500 bg-opacity-60 rounded-full mb-4">
                Featured Post
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                {featuredPost.title}
              </h1>
              <p className="text-xl text-gray-100 mb-8 max-w-2xl">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center space-x-4 mb-8">
                <img 
                  className="h-10 w-10 rounded-full bg-gray-300" 
                  src="/api/placeholder/40/40" 
                  alt="Author"
                />
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <div className="flex items-center text-sm text-gray-300">
                    <span>{featuredPost.date}</span>
                    <span className="mx-2">•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-purple-800 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-purple-800">
                Read Article
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Blog Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 md:mb-0">Latest Articles</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium 
                  ${selectedCategory === category 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} 
                  transition duration-200 mb-2`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition duration-500 transform hover:scale-105" 
                  src={post.image} 
                  alt={post.title}
                />
                <div className="absolute top-0 right-0 m-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-white bg-opacity-90 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-purple-600">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      className="h-8 w-8 rounded-full bg-gray-300 mr-2" 
                      src="/api/placeholder/32/32" 
                      alt="Author"
                    />
                    <span className="text-sm font-medium text-gray-700">John Doe</span>
                  </div>
                  <button className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Newsletter Section */}
        <div className="mt-20 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <h3 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h3>
              <p className="text-white text-opacity-90 mb-6">
                Get the latest articles, resources, and updates directly to your inbox.
                Never miss a post again!
              </p>
            </div>
            <div className="md:col-span-2">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-lg focus:outline-none text-gray-800"
                />
                <button 
                  type="submit" 
                  className="bg-white text-purple-600 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-200">
                  Subscribe
                </button>
              </form>
              <p className="text-sm text-white text-opacity-80 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
        
        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <button className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              1
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-purple-600 text-sm font-medium text-white">
              2
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;