import React, { useEffect, useState } from 'react';
import Spinners from '../../components/Spinners';
import { getTokoData } from '../../script/data/api-endpoint';
import API_URL from '../../script/data/config';

const Toko = () => {
  const [dataToko, setDataToko] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);  // Menggunakan nama state yang benar
  const [userPoints, setUserPoints] = useState(0);
  const [receipt, setReceipt] = useState(null); // Struk pembelian

  // Fetch data toko tanpa caching sessionStorage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTokoData();
        setDataToko(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data toko:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mengambil user point dari localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserPoints(userData.point); // Ambil point dari localStorage
    }
  }, []);

  const handleAddToCart = (barang) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === barang._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === barang._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...barang, quantity: 1 }];
      }
    });
    setTotalPrice((prev) => prev + barang.harga);
  };

  const handleRemoveFromCart = (barang) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === barang._id);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item._id === barang._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter((item) => item._id !== barang._id);
      }
    });
    setTotalPrice((prev) => prev - barang.harga);
  };

  const handlePurchase = async (barang, toko) => {
    const user = JSON.parse(localStorage.getItem('user')); // Ambil data user dari localStorage
    if (!user || !user.id) {
      alert('Pengguna tidak ditemukan.');
      return;
    }

    // Pastikan barang dan toko memiliki ID yang valid
    if (!barang.id || !toko.id) {
      alert('Barang atau Toko tidak valid.');
      return;
    }

    // Pastikan totalPrice dihitung dengan benar
    const totalPrice = calculateTotalPrice(); // Misalnya total harga dari cart

    // Cek jika totalPrice lebih besar dari 0
    if (totalPrice <= 0) {
      alert('Harga total tidak valid.');
      return;
    }

    // Hitung poin yang digunakan dan total poin setelah pembelian
    const pointsUsed = barang.harga;  // Misalnya, menggunakan harga barang sebagai poin yang digunakan
    const updatedPoints = userPoints - pointsUsed;  // Kurangi poin yang digunakan dari total poin pengguna

    // Bangun payload
    const payload = {
      userId: user.id,
      barangId: barang.id,
      tokoId: toko.id,
      totalPrice: totalPrice,
      pointsUsed: pointsUsed,
      status: 'pending',
    };

    console.log('Payload yang dikirim:', payload);  // Debug: Cek payload yang dikirimkan

    try {
      const response = await fetch(`${API_URL}/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      if (!response.ok) {
        console.error('Error response from API:', responseData);
        throw new Error(responseData.error || 'Gagal memproses pembelian.');
      }

      // Logika jika pembelian berhasil
      setReceipt({
        toko: toko.nama,
        barang: barang.nama,
        harga: barang.harga,
        poinDikurangi: pointsUsed,
        totalPoints: updatedPoints, // Sekarang menggunakan updatedPoints yang dihitung
      });

      alert('Pembelian berhasil!');
      setDataToko((prevData) =>
        prevData.map((t) =>
          t._id === toko._id
            ? {
              ...t,
              barang: t.barang.map((b) =>
                b._id === barang._id ? { ...b, stok: b.stok - 1 } : b  // Update stok barang
              ),
            }
            : t
        )
      );
    } catch (error) {
      console.error('Error purchasing item:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
  };


  // Menghitung total harga dari cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.harga * item.quantity, 0);
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
      <div className="mb-4 text-center">
        <p className="text-lg">Poin Anda: {userPoints}</p> {/* Tampilkan poin user */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {dataToko.map((toko) => (
          <div
            key={toko._id}
            className="border border-gray-200 rounded-lg p-4 shadow-lg flex flex-col items-center mb-6"
          >
            <img
              src={toko.imageUrl}
              alt={toko.nama}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{toko.nama}</h2>
            <p className="text-gray-600 mb-2">{toko.alamat}</p>

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
                    <p className="text-gray-500">Stok: {barang.stok}</p>
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
                    <button
                      onClick={() => handlePurchase(barang, toko)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-2"
                    >
                      Beli
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Tidak ada barang tersedia.</p>
            )}
          </div>
        ))}
      </div>

      {/* Menampilkan total harga belanja */}
      <div className="mt-6 p-4 border border-gray-300 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Total Pembelian</h3>
        <p><strong>Total Harga:</strong> Rp{calculateTotalPrice()}</p>
      </div>

      {receipt && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Struk Pembelian</h3>
          <p><strong>Toko:</strong> {receipt.toko}</p>
          <p><strong>Barang:</strong> {receipt.barang}</p>
          <p><strong>Harga:</strong> Rp{receipt.harga}</p>
          <p><strong>Poin Dikurangi:</strong> {receipt.poinDikurangi}</p>
          <p><strong>Total Poin:</strong> {receipt.totalPoints}</p>
        </div>
      )}
    </div>
  );
};

export default Toko;
