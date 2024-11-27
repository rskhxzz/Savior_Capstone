import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router
import Navbars from './components/Navbars';
import Hero from './components/Hero';
import Features from './components/Features';
import BankSampah from './pages/BankSampah'; // Halaman untuk fitur Bank Sampah
import Toko from './pages/Toko'; // Halaman untuk fitur Toko
import Pelaporan from './pages/Pelaporan';
import Chat from './pages/Chat';
import About from './pages/About';
import Lokasi from './pages/Lokasi';
import GridBox from './components/GridBox';
import Register from './pages/Register';
import Login from './pages/Login';
import { Footers } from './components/Footers';

const Home = () => (
  <>
    <Hero />
    <Features />
    <GridBox /> {/* Menambahkan GridBox */}
  </>
);

const App = () => {
  return (
    <Router> {/* Menambahkan Router di seluruh aplikasi */}
      <div className="font-sans">
        <Navbars />
        <Routes> {/* Menambahkan routing */}
          <Route path="/" element={<Home />} /> {/* Halaman Home */}
          <Route path="/bank-sampah" element={<BankSampah />} /> {/* Halaman Bank Sampah */}
          <Route path="/toko" element={<Toko />} /> {/* Halaman Toko */}
          <Route path="/pelaporan" element={<Pelaporan />} /> {/* Halaman Pelaporan */}
          <Route path="/chat" element={<Chat />} /> {/* Halaman chat */}
          <Route path="/about" element={<About />} /> {/* Halaman about */}
          <Route path="/lokasi" element={<Lokasi />} /> {/* Halaman lokasi */}
          <Route path="/register" element={<Register />} /> {/* Halaman lokasi */}
          <Route path="/login" element={<Login />} /> {/* Halaman lokasi */}
        </Routes>
        <Footers /> {/* Menambahkan footer */}
      </div>
    </Router>
  );
};

export default App;
