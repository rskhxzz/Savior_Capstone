import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Pastikan Anda menggunakan react-router-dom

const Toko = () => {
  const [userPoints, setUserPoints] = useState(0); // Poin user yang diambil dari API
  const [userName, setUserName] = useState(''); // Nama user yang login
  const [selectedToko, setSelectedToko] = useState(null);
  const [cart, setCart] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const [tokoList, setTokoList] = useState([]); // Data toko yang diambil dari API
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Status login

  const navigate = useNavigate(); // Digunakan untuk navigasi

  // Ambil data toko dan data user saat komponen di-mount
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    console.log('User Token:', userToken);  // Log token untuk pengecekan

    if (!userToken) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:5000/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.user) {
          setIsLoggedIn(true);
          setUserPoints(data.user.poin);
          setUserName(data.user.name);
        } else {
          navigate('/login');  // Jika tidak ada data user, arahkan ke login
        }
      })
      .catch((err) => console.error('Error fetching user data:', err));
  }, [navigate]);

  const handleAddToCart = (item) => {
    const itemInCart = cart.find((cartItem) => cartItem.id === item.id);
    if (itemInCart) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (item) => {
    const itemInCart = cart.find((cartItem) => cartItem.id === item.id);
    if (itemInCart?.quantity === 1) {
      setCart(cart.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        ),
      );
    }
  };

  const handlePurchase = () => {
    if (!isLoggedIn) {
      alert('Anda harus login terlebih dahulu!');
      return;
    }

    const totalPoints = cart.reduce((total, item) => total + item.harga * item.quantity, 0);
    if (userPoints < totalPoints) {
      alert('Poin Anda tidak mencukupi untuk pembelian ini!');
      return;
    }

    setUserPoints(userPoints - totalPoints);
    setPopupMessage(
      `Pembelian berhasil! Barang bisa diambil di ${selectedToko?.nama}.`
    );
    setCart([]); // Reset keranjang belanja setelah pembelian
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Toko</h1>
      <p className="mb-6">Poin Anda: <span className="font-bold">{userPoints}</span></p>
      <p className="mb-6">Selamat datang, <span className="font-bold">{userName}</span></p>

      {/* Pilih Toko */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Pilih Toko:</label>
        <select
          className="border p-2 rounded w-full"
          value={selectedToko?.id || ''}
          onChange={(e) =>
            setSelectedToko(tokoList.find((toko) => toko.id === parseInt(e.target.value)))
          }
        >
          <option value="">-- Pilih Toko --</option>
          {tokoList.map((toko) => (
            <option key={toko.id} value={toko.id}>
              {toko.nama} - {toko.alamat}
            </option>
          ))}
        </select>
      </div>

      {/* Grid Barang */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {selectedToko?.daftar_barang.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 flex flex-col items-center shadow-md"
          >
            <img
              src={item.image || 'default_image.png'} // Set default image if none exists
              alt={item.nama}
              className="w-20 h-20 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">{item.nama}</h3>
            <p className="text-gray-600 text-sm">Harga: {item.harga} poin</p>
            <p className="text-gray-600 text-sm">Stok: {item.stok}</p>
            <div className="flex items-center mt-4 space-x-2">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600"
                onClick={() => handleRemoveFromCart(item)}
              >
                -
              </button>
              <span className="text-gray-800 font-semibold">
                {cart.find((cartItem) => cartItem.id === item.id)?.quantity || 0}
              </span>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded shadow hover:bg-green-600"
                onClick={() => handleAddToCart(item)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Struk Belanja */}
      <div className="border rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">Struk Belanja</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Keranjang belanja kosong.</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.nama} ({item.quantity})
                </span>
                <span>{item.harga * item.quantity} poin</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-between mt-4 font-bold">
          <span>Total:</span>
          <span>
            {cart.reduce((total, item) => total + item.harga * item.quantity, 0)} poin
          </span>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded shadow hover:bg-blue-600 w-full"
          onClick={handlePurchase}
          disabled={!selectedToko || cart.length === 0}
        >
          Beli
        </button>
      </div>

      {/* Popup */}
      {popupMessage && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">{popupMessage}</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
              onClick={() => setPopupMessage('')}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toko;
