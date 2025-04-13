import { useParams } from 'react-router-dom';

function BlogDetails() {
  const { id } = useParams(); // Get the blog post id from URL

  // Sample blog data (this would typically come from your backend)
  const blog = {
    title: 'Exploring the Beauty of Nature',
    content: `Nature is one of the most beautiful and awe-inspiring things on Earth. From towering mountains to lush forests, the variety of landscapes we have to explore is breathtaking. In this post, we dive into some of the best places to visit in nature, from peaceful parks to thrilling hiking trails...`,
    image: 'https://via.placeholder.com/1200x600',
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Blog Header */}
      <div className="text-center">
        <img src={blog.image} alt={blog.title} className="w-full h-72 object-cover rounded-lg mb-8" />
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{blog.title}</h1>
      </div>

      {/* Blog Content */}
      <div className="prose lg:prose-xl mx-auto text-gray-800">
        <p>{blog.content}</p>
        {/* Add more paragraphs or sections as needed */}
      </div>
    </div>
  );
}

export default BlogDetails;
