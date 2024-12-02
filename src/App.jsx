import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import React Router
import Navbars from './components/Navbars';
import Hero from './components/Hero';
import Features from './components/Features';
import BankSampah from './pages/BankSampah'; // Halaman untuk fitur Bank Sampah
import Toko from './pages/Toko'; // Halaman untuk fitur Toko
import Pelaporan from './pages/pelaporan';
import Chat from './pages/Chat';
import About from './pages/About';
import Lokasi from './pages/Lokasi';
import GridBox from './components/GridBox';
import Register from './pages/Register';
import Login from './pages/Login';
import Akun from './pages/Akun';
import { Footers } from './components/Footers';
import AuthLayout from './layouts/AuthLayout'; // Import AuthLayout
import Dashboard from './pages/Dashboard';

// Define ProtectedRoute component
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({children}) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Home component
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

          <Route path="/bank-sampah" element={
            <ProtectedRoute>
              <Navbars /><BankSampah /><Footers />
            </ProtectedRoute>
          } />

          <Route path="/toko" element={
            <ProtectedRoute>
              <><Navbars /><Toko /><Footers /></>
            </ProtectedRoute>
          } />

          <Route path="/pelaporan" element={
            <ProtectedRoute>
              <><Navbars /><Pelaporan /><Footers /></>
            </ProtectedRoute>
          } />

          <Route path="/chat" element={
            <ProtectedRoute>
              <><Navbars /><Chat /><Footers /></>
            </ProtectedRoute>
          } />

          <Route path="/about" element={<><Navbars /><About /><Footers /></>} />
          <Route path="/akun" element={
            <ProtectedRoute>
              <><Navbars /><Akun /><Footers /></>
            </ProtectedRoute>
          } />

          <Route path="/lokasi" element={
            <ProtectedRoute>
              <><Navbars /><Lokasi /><Footers /></>
            </ProtectedRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <><Dashboard /></>
            </ProtectedRoute>
          } />

          {/* Halaman yang tidak membutuhkan Navbar dan Footer */}
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
