import { Link } from 'react-router-dom';
import { useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import logo from '../assets/savior-icon.png'

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
    <nav className="bg-[#dfdfdf] shadow-md z-50 ">
      <div className="container mx-auto px-4  min-h-16 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">
            <img src={logo} className='w-12 h-12' alt="Savior" />
          </Link>
        </div>
        <button
          className="text-[#355F2E]} md:hidden focus:outline-none"
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
          className={`gap-8 pl-4 text-left text-[#355F2E] text-md xl:text-lg font-semibold absolute md:flex md:static top-16 left-0 right-0 bg-[#dfdfdf] md:bg-transparent md:space-y-0 space-y-4 md:flex-row flex-col items-center z-50 ${isOpen ? 'block slide-down' : 'hidden slide-up md:slide-none'}`}
        >
          <li className="hover:bg-gray-400 p-2 rounded-md transition-colors duration-300">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Beranda
            </Link>
          </li>
          <li className="relative transition-colors duration-300">
            <button
              className="text-[#355F2E]  hover:bg-gray-400 p-2 rounded-md font-semibold flex flex-start items-center transition-colors duration-300"
              onClick={toggleDropdown}
            >
              Fitur
              <RiArrowDropDownLine className="text-3xl" />
            </button>
            <ul
              className={`${isDropdownOpen ? 'block' : 'hidden'
                } absolute bg-[#dfdfdf] shadow-md space-y-4 p-4 mt-2  rounded-md w-48 left-0 top-full z-10`}
            >
              <li className="hover:bg-gray-400 p-1 rounded-md transition-colors duration-300">
                <Link to="/bank-sampah" onClick={() => setIsOpen(false)}>
                  Bank Sampah
                </Link>
              </li>
              <li className="hover:bg-gray-400 p-1 rounded-md transition-colors duration-300">
                <Link to="/toko" onClick={() => setIsOpen(false)}>
                  Toko
                </Link>
              </li>
              <li className="hover:bg-gray-400 p-1 rounded-md transition-colors duration-300">
                <Link to="/pelaporan" onClick={() => setIsOpen(false)}>
                  Pelaporan
                </Link>
              </li>
            </ul>
          </li>
          <li className="hover:bg-gray-400 p-2 rounded-md transition-colors duration-300">
            <Link to="/history" onClick={() => setIsOpen(false)}>
              Riwayat
            </Link>
          </li>
          <li className="hover:bg-gray-400 p-2 rounded-md transition-colors duration-300">
            <Link to="/about" onClick={() => setIsOpen(false)}>
              Tentang
            </Link>
          </li>
          <li className="hover:bg-gray-400 p-2 rounded-md transition-colors duration-300">
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