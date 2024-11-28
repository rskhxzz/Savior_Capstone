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
import Akun from './pages/Akun';
import { Footers } from './components/Footers';
import AuthLayout from './layouts/AuthLayout'; // Import AuthLayout

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
        <Routes> {/* Menambahkan routing */}
          {/* Halaman yang membutuhkan Navbar dan Footer */}
          <Route path="/" element={<><Navbars /><Home /><Footers /></>} />
          <Route path="/bank-sampah" element={<><Navbars /><BankSampah /><Footers /></>} />
          <Route path="/toko" element={<><Navbars /><Toko /><Footers /></>} />
          <Route path="/pelaporan" element={<><Navbars /><Pelaporan /><Footers /></>} />
          <Route path="/chat" element={<><Navbars /><Chat /><Footers /></>} />
          <Route path="/about" element={<><Navbars /><About /><Footers /></>} />
          <Route path="/akun" element={<><Navbars /><Akun /><Footers /></>} />
          <Route path="/lokasi" element={<><Navbars /><Lokasi /><Footers /></>} />

          {/* Halaman yang tidak membutuhkan Navbar dan Footer */}
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
