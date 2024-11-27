import { Link } from 'react-router-dom'; // Import Link untuk routing
import bankSampahIcon from '../assets/images/icons/bank-sampah.png';
import storesIcon from '../assets/images/icons/stores-icon.png';
import reportIcon from '../assets/images/icons/report-icon.png';
import chatIcon from '../assets/images/icons/chat-icon.png';
import locationIcon from '../assets/images/icons/location-icon.png';

const features = [
  { 
    title: 'Bank Sampah', 
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 
    icon: bankSampahIcon,
    path: '/bank-sampah', // Path untuk halaman Bank Sampah
  },
  { 
    title: 'Toko', 
    description: 'Duis sed dapibus leo nec ornare diam sed commodo nibh.', 
    icon: storesIcon,
    path: '/toko', // Path untuk halaman Toko
  },
  { 
    title: 'Pelaporan', 
    description: 'Ante facilisis bibendum lorem ipsum dolor sit amet.', 
    icon: reportIcon,
    path: '/pelaporan', // Path untuk halaman Pelaporan
  },
  { 
    title: 'Chat', 
    description: 'Ante facilisis bibendum lorem ipsum dolor sit amet.', 
    icon: chatIcon,
    path: '/chat', // Path untuk halaman Pelaporan
  },
  { 
    title: 'Lokasi', 
    description: 'Ante facilisis bibendum lorem ipsum dolor sit amet.', 
    icon: locationIcon,
    path: '/lokasi', // Path untuk halaman Pelaporan
  },
];

const Features = () => {
  return (
    <div className="py-16 h-screen bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Our Features</h2>
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
