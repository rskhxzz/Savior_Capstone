import React, { useEffect, useState } from 'react';
import Spinners from '../../components/Spinners';
import { getTokoData } from '../../script/data/api-endpoint';

const Toko = () => {
  const [dataToko, setDataToko] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem('cart')) || []); // Load keranjang dari sessionStorage
  const [totalPrice, setTotalPrice] = useState(Number(sessionStorage.getItem('totalPrice')) || 0);

  // Fetch data toko dengan caching menggunakan sessionStorage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = sessionStorage.getItem('dataToko');
        if (cachedData) {
          setDataToko(JSON.parse(cachedData));
          setLoading(false);
        } else {
          const result = await getTokoData();
          setDataToko(result);
          sessionStorage.setItem('dataToko', JSON.stringify(result)); // Simpan ke sessionStorage
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data toko:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (barang) => {
    const existingItem = cart.find((item) => item._id === barang._id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item._id === barang._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...barang, quantity: 1 }];
    }
    setCart(updatedCart);
    setTotalPrice((prev) => prev + barang.harga);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart)); // Simpan keranjang ke sessionStorage
    sessionStorage.setItem('totalPrice', String(totalPrice + barang.harga));
  };

  const handleRemoveFromCart = (barang) => {
    const existingItem = cart.find((item) => item._id === barang._id);
    let updatedCart;
    if (existingItem && existingItem.quantity > 1) {
      updatedCart = cart.map((item) =>
        item._id === barang._id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCart(updatedCart);
      setTotalPrice((prev) => prev - barang.harga);
    } else {
      updatedCart = cart.filter((item) => item._id !== barang._id);
      setCart(updatedCart);
      setTotalPrice((prev) => prev - barang.harga);
    }
    sessionStorage.setItem('cart', JSON.stringify(updatedCart)); // Simpan keranjang ke sessionStorage
    sessionStorage.setItem('totalPrice', String(totalPrice - barang.harga));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinners />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Daftar Toko</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {dataToko.map((toko) => (
          <div
            key={toko._id}
            className="border border-gray-200 rounded-lg p-4 shadow-lg flex flex-col items-center mb-6"
          >
            {/* Card Toko */}
            <img
              src={toko.imageUrl}
              alt={toko.nama}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{toko.nama}</h2>
            <p className="text-gray-600 mb-2">{toko.alamat}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {dataToko.map((toko) => (
          <div key={toko._id} className="w-full">
            {/* Menampilkan daftar barang */}
            <h3 className="font-semibold text-lg mb-2 text-center">Barang yang tersedia:</h3>
            {toko.barang.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {toko.barang.map((barang) => (
                  <div
                    key={barang._id}
                    className="border border-gray-300 p-4 rounded-lg shadow-md"
                  >
                    <img
                      src={barang.imageUrl}
                      alt={barang.nama}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h4 className="text-lg font-semibold">{barang.nama}</h4>
                    <p className="text-gray-600">Rp{barang.harga}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <button
                        onClick={() => handleRemoveFromCart(barang)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                      >
                        -
                      </button>

                      <span className="px-4">{cart.find((item) => item._id === barang._id)?.quantity || 0}</span>

                      <button
                        onClick={() => handleAddToCart(barang)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Tidak ada barang tersedia.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toko;
