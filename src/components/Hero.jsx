import React from 'react';
import HeroImage from '../assets/images/hero/hero.png'; // Pastikan path-nya benar

const Hero = () => {
  return (
    <div className="relative w-full h-screen bg-gray-100">
      <img 
        src={HeroImage} 
        alt="Hero Image" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-shadow">
        <h1 className="text-4xl font-bold text-white mb-4">WE ARE A LANDING PAGE</h1>
        <p className="text-white mb-6 max-w-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec
          ornare diam sed commodo nibh ante facilisis bibendum.
        </p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Hero;
