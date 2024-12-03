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
        <h1 className="text-4xl font-bold text-white mb-4">SAVIOR</h1>
        <p className="text-white mb-6 max-w-xl">
          situs ini merupakan situs untuk menukarkan sampah menjadi uang digital yang dapat digunakan untuk membeli kebutuhan pokok di toko kami. Savior bekerja sama dengan Dinas Lingkungan hidup kota Surabaya
        </p>
        <button className="bg-green-400 text-white px-6 py-3 rounded-md hover:bg-gren-600">
          Pelajari lebih lanjut
        </button>
      </div>
    </div>
  );
};

export default Hero;
