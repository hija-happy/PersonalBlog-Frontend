import BlogCard from './BlogCard';

function RecentBlogsSection() {
  const blogs = [
    {
      id: 1,
      title: 'Exploring the Beauty of Nature',
      excerpt: 'A deep dive into the wonders of the natural world...',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 2,
      title: 'Tech Trends to Watch in 2025',
      excerpt: 'The most exciting technologies expected to dominate...',
      image: 'https://images.unsplash.com/photo-1581091870620-7c2b3272332a?auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 3,
      title: '5 Healthy Recipes to Try Today',
      excerpt: 'Delicious and nutritious meals for a healthy lifestyle...',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">Recent Blogs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentBlogsSection;
