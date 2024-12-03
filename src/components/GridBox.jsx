//import React from 'react';
import imageGrid1 from '../assets/images/grid-images/1.png';
import imageGrid2 from '../assets/images/grid-images/2.png';
import imageGrid3 from '../assets/images/grid-images/3.png';
import imageGrid4 from '../assets/images/grid-images/4.png';

// Tambahkan keyframe animasi untuk teks
const GridBox = () => {
  return (
    <div className="mt-8 max-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        {/* Ajakan */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold text-green-700 animate__animated animate__fadeIn"
            style={{ animationDelay: '0.3s' }} // Animasi fadeIn dengan delay
          >
            Bergabunglah Menjadi Fake Agent
          </h1>
          <p
            className="text-gray-600 animate__animated animate__fadeIn"
            style={{ animationDelay: '0.6s' }} // Animasi fadeIn dengan delay
          >
            Daur ulang sampahmu untuk membuat bumi bahagia 🌍
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-4 grid-rows-5 gap-4 max-h-[80vh] px-4">
          {/* Gambar 1 */}
          <div className="col-span-2 row-span-3">
            <img
              src={imageGrid1}
              alt="Gambar 1"
              className="w-[100%] h-full object-cover rounded-md shadow-md transition-transform transform hover:scale-105 hover:shadow-xl duration-200"
            />
          </div>

          {/* Gambar 2 */}
          <div className="col-span-2 row-span-2 col-start-1 row-start-4">
            <img
              src={imageGrid2}
              alt="Gambar 2"
              className="w-full h-full object-cover rounded-md shadow-md transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
            />
          </div>

          {/* Gambar 3 */}
          <div className="col-span-2 row-span-3 col-start-3 row-start-3">
            <img
              src={imageGrid3}
              alt="Gambar 3"
              className="w-full h-full object-cover rounded-md shadow-md transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
            />
          </div>

          {/* Gambar 4 */}
          <div className="col-span-2 row-span-2 col-start-3 row-start-1">
            <img
              src={imageGrid4}
              alt="Gambar 4"
              className="w-full h-full object-cover rounded-md shadow-md transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridBox;
