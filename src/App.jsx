import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import BlogPage from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import WriteSection from './pages/Write';
import About from './pages/About';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs-View';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogss" element={<BlogPost />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogPostDetail />} />
          <Route path="/write" element={<WriteSection />} />
          <Route path="/write/:id" element={<WriteSection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
