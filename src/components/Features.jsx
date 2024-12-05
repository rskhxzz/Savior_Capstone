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
    path: '/pelaporan', // Path untuk halaman Pelaporan
  },
  { 
    title: 'Chat', 
    description: 'Tanyakan masalah sampah maupun lingkungan disini', 
    icon: chatIcon,
    path: '/chat', // Path untuk halaman Pelaporan
  },
  { 
    title: 'Lokasi', 
    description: 'Disini adalah lokasi dari bank sampah', 
    icon: locationIcon,
    path: '/lokasi', // Path untuk halaman Pelaporan
  },
];

const Features = () => {
  return (
    <div className="bg-[#ffffff] flex min-h-[70vh]">
      <div className="container mx-auto px-12">
        <h2 className="text-3xl font-bold text-green-700 my-8 text-center">Temukan Fitur Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link to={feature.path} key={index} className="block">
              <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center hover:bg-gray-200 transition">
                <img 
                  src={feature.icon} 
                  alt={feature.title} 
                  className="w-16 h-16 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
