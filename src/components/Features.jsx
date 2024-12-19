import { Link } from 'react-router-dom'; // Import Link untuk routing
import bankSampahIcon from '../assets/images/icons/bank-sampah.png';
import storesIcon from '../assets/images/icons/stores-icon.png';
import reportIcon from '../assets/images/icons/report-icon.png';
import chatIcon from '../assets/images/icons/chat-icon.png';
import locationIcon from '../assets/images/icons/location-icon.png';

const features = [
  {
    title: 'Bank Sampah',
    description: 'Tukarkan sampahmu untuk dijadikan uang digital disini',
    icon: bankSampahIcon,
    path: '/bank-sampah',
  },
  {
    title: 'Savior Shop',
    description: 'Toko penukaran uang digital menjadi sembako ',
    icon: storesIcon,
    path: '/toko',
  },
  {
    title: 'Savior Report',
    description: 'Laporkan masalah sampah maupun pencermaran',
    icon: reportIcon,
    path: '/pelaporan',
  },
  {
    title: 'Chat',
    description: 'Tanyakan masalah sampah maupun lingkungan disini',
    icon: chatIcon,
    path: '/chat',
  },
  {
    title: 'Lokasi',
    description: 'Disini adalah lokasi dari bank sampah',
    icon: locationIcon,
    path: '/lokasi',
  },
];

const Features = () => {
  return (
    <div className="bg-gray-200 py-12 flex ">
      <div className="container mx-auto px-12 min-h-[70vh] max-w-[90vw]">
        <h2 className="text-xl md:text-2xl xl:text-3xl font-bold text-[#355F2E] my-8 text-center">Temukan Fitur Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link to={feature.path} key={index} className="block">
              <div className=" bg-[#d9d9d9dc] backdrop-blur-xl p-6 min-h-60 rounded-lg shadow-md text-center hover:bg-[#c2c2c236]">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-16 h-16 mx-auto mb-4"
                />
                <h3 className="text-lg lg-text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;