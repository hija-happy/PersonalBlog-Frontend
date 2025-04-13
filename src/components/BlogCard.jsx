import { Link } from 'react-router-dom';

function BlogCard({ title, image, excerpt, id }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{excerpt}</p>
        <Link
          to={`/post/${id}`}
          className="text-blue-500 hover:text-blue-600 font-semibold"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
