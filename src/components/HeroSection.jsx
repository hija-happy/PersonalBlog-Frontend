import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-100 to-purple-200 py-20">
      <div className="container mx-auto px-4 text-center">
        
        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          Welcome to <span className="text-blue-600">MyBlog</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg text-gray-600 mb-10">
          Share your thoughts, inspire the world. 🌍
        </p>

        {/* Button */}
        <Link
          to="/blogs"
          className="inline-block bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition"
        >
          Read Blogs
        </Link>

      </div>
    </section>
  );
}

export default HeroSection;
