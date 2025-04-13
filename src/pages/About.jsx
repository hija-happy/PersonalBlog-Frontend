import React from 'react';

const About = () => {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-500 min-h-screen flex items-center justify-center p-8">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 max-w-2xl w-full shadow-xl border border-white border-opacity-20">
        <h2 className="text-4xl font-bold mb-6 text-black">About Me</h2>
        
        <div className="space-y-6">
          <p className="text-lg text-black leading-relaxed">
          Welcome to the official blog page. This platform serves as a space to share insightful perspectives, thoughtful reflections, and valuable experiences across a range of topics.

          </p>
          
          <p className="text-lg text-black leading-relaxed">
          Our goal is to deliver meaningful and well-crafted content that informs, inspires, and engages readers, while fostering a community built on curiosity and continuous learning.

          </p>
          
          <div className="pt-4">
            <button className="bg-purple-500  text-white hover:bg-purple-600 font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 transition duration-300">
              Connect With Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;