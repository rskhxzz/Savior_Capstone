import HeroImage from '../assets/images/hero/hero.png'; // Pastikan path-nya benar

const Hero = () => {
  return (
    <div className="relative w-full bg-gray-100 z-20">
      <img
        src={HeroImage}
        alt="Hero Image"
        className="w-full h-[75vh] object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-shadow">
        <div className='rounded-xl p-8'
          style={{
            background: 'rgba(186,186,186,0.2)',
            WebkitBackdropFilter: 'blur(7px)',
            backdropFilter: 'blur(7px)',
          }}>
          <h1 className="text-4xl font-bold text-white mb-4">SAVIOR</h1>
          <p className="text-white mb-6 max-w-xl">
            situs ini merupakan situs untuk menukarkan sampah menjadi uang digital yang dapat digunakan untuk membeli kebutuhan pokok di toko kami. Savior bekerja sama dengan Dinas Lingkungan hidup kota Surabaya
          </p>
        </div>
      </div>
    </div >
  );
};

export default Hero;
