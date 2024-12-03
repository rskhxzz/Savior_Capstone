import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbars = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    console.log('Toggle menu:', !isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 min-h-16 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">SAVIOR</Link>
        </div>
        <button
          className="text-gray-700 md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        <ul
          className={`md:flex space-x-6 text-gray-700 font-semibold absolute md:static top-16 left-0 right-0 bg-white md:bg-transparent md:space-y-0 space-y-4 md:flex-row flex-col items-center transition-all duration-300 ease-in-out ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <li>
            <Link to="/bank-sampah" onClick={() => setIsOpen(false)}>
              Bank Sampah
            </Link>
          </li>
          <li>
            <Link to="/toko" onClick={() => setIsOpen(false)}>
              Toko
            </Link>
          </li>
          <li>
            <Link to="/pelaporan" onClick={() => setIsOpen(false)}>
              Pelaporan
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/akun" onClick={() => setIsOpen(false)}>
              Akun
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbars;
