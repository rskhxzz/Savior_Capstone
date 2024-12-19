import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS Stylesheet
import imageGrid1 from '../assets/images/grid-images/1.png';
import imageGrid2 from '../assets/images/grid-images/2.png';
import imageGrid3 from '../assets/images/grid-images/3.png';
import imageGrid4 from '../assets/images/grid-images/4.png';

const GridBox = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,  
    });
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-white p-8 "
        data-aos="fade-up"
      >
        {/* Ajakan */}
        <div className="text-center mb-8" data-aos="zoom-in">
          <h1 className="text-xl md:text-2xl xl:text-3xl font-bold text-[#355F2E]">
            Mari Mewujudkan Lingkungan Yang Bersih dan Nyaman
          </h1>
          <p className="text-green-900 text-sm md:text-xl xl:text-2xl">
            Daur ulang sampahmu untuk membuat bumi bahagia 🌍
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-4 grid-rows-5 gap-4 max-h-[80vh] max-w-[90vw] px-4">
          <div
            className="col-span-2 row-span-3"
            data-aos="fade-right" 
          >
            <img
              src={imageGrid1}
              alt="Gambar 1"
              className="w-[100%] h-full object-cover rounded-md shadow-md "
            />
          </div>

          <div
            className="col-span-2 row-span-2 col-start-1 row-start-4"
            data-aos="fade-up" 
          >
            <img
              src={imageGrid2}
              alt="Gambar 2"
              className="w-full h-full object-cover rounded-md shadow-md "
            />
          </div>

          <div
            className="col-span-2 row-span-3 col-start-3 row-start-3"
            data-aos="fade-left"
          >
            <img
              src={imageGrid3}
              alt="Gambar 3"
              className="w-full h-full object-cover rounded-md shadow-md "
            />
          </div>

          <div
            className="col-span-2 row-span-2 col-start-3 row-start-1"
            data-aos="fade-down"
          >
            <img
              src={imageGrid4}
              alt="Gambar 4"
              className="w-full h-full object-cover rounded-md shadow-md "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridBox;