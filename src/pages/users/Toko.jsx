import React, { useEffect, useState } from 'react';
import Spinners from '../../components/Spinners';
import { getTokoData } from '../../script/data/api-endpoint';

const Toko = () => {
  const [dataToko, setDataToko] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]); // Menyimpan barang yang dipilih di keranjang
  const [totalPrice, setTotalPrice] = useState(0); // Total harga

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTokoData();
        setDataToko(result); // Mengatur data toko ke state
      } catch (error) {
        console.error('Error fetching data toko:', error);
      } finally {
        setLoading(false); // Mengatur loading menjadi false setelah data diambil
      }
    };

    fetchData(); // Memanggil fungsi untuk mendapatkan data toko
  }, []);

  const handleAddToCart = (barang) => {
    const existingItem = cart.find((item) => item._id === barang._id);
    if (existingItem) {
      // Jika barang sudah ada di keranjang, tambah jumlahnya
      setCart(
        cart.map((item) =>
          item._id === barang._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Jika barang belum ada di keranjang, tambahkan ke keranjang
      setCart([...cart, { ...barang, quantity: 1 }]);
    }
    setTotalPrice((prev) => prev + barang.harga); // Update total harga
  };

  const handleRemoveFromCart = (barang) => {
    const existingItem = cart.find((item) => item._id === barang._id);
    if (existingItem && existingItem.quantity > 1) {
      // Jika jumlah barang lebih dari 1, kurangi jumlahnya
      setCart(
        cart.map((item) =>
          item._id === barang._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
      setTotalPrice((prev) => prev - barang.harga); // Update total harga
    } else {
      // Jika jumlah barang 1, hapus barang dari keranjang
      setCart(cart.filter((item) => item._id !== barang._id));
      setTotalPrice((prev) => prev - barang.harga); // Update total harga
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <Spinners />
    </div>;
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

                      {/* Menampilkan jumlah barang yang dipilih */}
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

      {/* Checkout */}
      {cart.length > 0 && (
        <div className="mt-8 p-4 border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Struk Belanja</h2>
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between">
                <p>{item.nama}</p>
                <p>{item.quantity} x Rp{item.harga}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between font-semibold">
            <p>Total:</p>
            <p>Rp{totalPrice}</p>
          </div>
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg w-full">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Toko;
