import { Link } from 'react-router-dom'; // Import Link dari react-router-dom

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 min-h-16 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">LOGO</Link> {/* Tambahkan navigasi ke home */}
        </div>
        <ul className="flex space-x-6 text-gray-700 font-semibold">
          <li>
            <Link to="/bank-sampah" className="hover:text-blue-500">
              Bank Sampah
            </Link>
          </li>
          <li>
            <Link to="/toko" className="hover:text-blue-500">
              Toko
            </Link>
          </li>
          <li>
            <Link to="/pelaporan" className="hover:text-blue-500">
              Pelaporan
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-500">
              About
            </Link>
          </li>
          <li>
            <Link to="/akun" className="hover:text-blue-500">
              Akun
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
