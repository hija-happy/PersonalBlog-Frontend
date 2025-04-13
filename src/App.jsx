import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './pages/About';
import BlogPage from './pages/Blog';
import ContactPage from './pages/Contact';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails'; // Updated name here
import WriteSection from './pages/Write';

function App() {
  return (
    <div>
      <Navbar /> {/* Always on top */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:id" element={<PostDetails />} /> {/* Post details route */}
        <Route path="/blogs" element={<BlogPage />} /> {/* Post details route */}
        <Route path="/contact" element={<ContactPage />} /> {/* Post details route */}
        <Route path="/write" element={<WriteSection />} /> {/* Post details route */}

      </Routes>
      <Footer /> {/* Always at the bottom */}
    </div>
  );
}

export default App;
