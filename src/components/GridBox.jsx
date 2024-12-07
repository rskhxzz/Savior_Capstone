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
      duration: 1000, // Durasi animasi dalam milidetik
    });
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-white p-8 "
        data-aos="fade-up" // Tambahkan animasi untuk seluruh box
      >
        {/* Ajakan */}
        <div className="text-center mb-8" data-aos="zoom-in">
          <h1 className="text-3xl font-bold text-[#355F2E]">
            Bergabunglah Menjadi Fake Agent
          </h1>
          <p className="text-gray-600">
            Daur ulang sampahmu untuk membuat bumi bahagia 🌍
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-4 grid-rows-5 gap-4 max-h-[80vh] max-w-[90vw] px-4">
          {/* Gambar 1 */}
          <div
            className="col-span-2 row-span-3"
            data-aos="fade-right" // Animasi untuk gambar 1
          >
            <img
              src={imageGrid1}
              alt="Gambar 1"
              className="w-[100%] h-full object-cover rounded-md shadow-md "
            />
          </div>

          {/* Gambar 2 */}
          <div
            className="col-span-2 row-span-2 col-start-1 row-start-4"
            data-aos="fade-up" // Animasi untuk gambar 2
          >
            <img
              src={imageGrid2}
              alt="Gambar 2"
              className="w-full h-full object-cover rounded-md shadow-md "
            />
          </div>

          {/* Gambar 3 */}
          <div
            className="col-span-2 row-span-3 col-start-3 row-start-3"
            data-aos="fade-left" // Animasi untuk gambar 3
          >
            <img
              src={imageGrid3}
              alt="Gambar 3"
              className="w-full h-full object-cover rounded-md shadow-md "
            />
          </div>

          {/* Gambar 4 */}
          <div
            className="col-span-2 row-span-2 col-start-3 row-start-1"
            data-aos="fade-down" // Animasi untuk gambar 4
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
