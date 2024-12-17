import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbars = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    console.log('Toggle menu:', !isOpen);
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-[#355F2E] shadow-md z-50 ">
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
          className={`md:flex space-x-6 text-[#e9e9e9] font-semibold absolute md:static top-16 left-0 right-0 bg-[#355F2E] md:bg-transparent md:space-y-0 space-y-4 md:flex-row flex-col items-center z-50 ${isOpen ? 'block slide-down' : 'hidden slide-up md:slide-none'}`}
        >
          <li className="relative">
            <button
              className="text-[#e9e9e9] font-semibold"
              onClick={toggleDropdown}
            >
              Fitur
            </button>
            <ul
              className={`${
                isDropdownOpen ? 'block' : 'hidden'
              } absolute bg-[#355F2E] shadow-md space-y-4 p-4 mt-2 rounded-md w-48 left-0 top-full z-10`}
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
            </ul>
          </li>
          <li>
            <Link to="/history" onClick={() => setIsOpen(false)}>
              Riwayat
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              Tentang
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
