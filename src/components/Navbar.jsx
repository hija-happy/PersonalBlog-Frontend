import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">MyBlog</Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-8 text-gray-600 font-medium">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>
          <Link to="/blogs" className="hover:text-blue-500">Blogs</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
        </div>

        {/* Login / Write button */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/write"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Write
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {/* In future we can add hamburger menu */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
