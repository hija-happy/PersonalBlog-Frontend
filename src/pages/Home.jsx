import React from 'react'
import BlogList from '../components/BlogList';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import RecentBlogsSection from '../components/RecentBlogSection';
const Home = () => {
    return (
        <div>
        <HeroSection/>
        <BlogList />
        <RecentBlogsSection />
      </div>
      );
}

export default Home