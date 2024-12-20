/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Spinners from '../../components/Spinners';
import { getTokoData } from '../../script/data/api-endpoint';
import API_URL from '../../script/data/config';
import Swal from 'sweetalert2';
import { Slide2 } from '../../components/Slides';

const Toko = () => {
  const [dataToko, setDataToko] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const [receipt, setReceipt] = useState(null);
  const [selectedToko, setSelectedToko] = useState(null);
  const [showSlide2, setShowSlide2] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil data toko
        const result = await getTokoData();
        setDataToko(result);

        // Ambil data user dari localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUserPoints(userData.point); // Menyimpan poin user dari localStorage

          // Memanggil API untuk mengambil data user berdasarkan userId
          const userId = userData.id;
          const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`);
          if (response.ok) {
            const userFromApi = await response.json();
            localStorage.setItem('user', JSON.stringify(userFromApi)); // Update data user di localStorage
            setUserPoints(userFromApi.point); // Menyimpan poin user dari API
          } else {
            throw new Error('Failed to fetch user data');
          }
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        Swal.fire('Error', 'Terjadi kesalahan saat memuat data.', 'error');
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (barang) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === barang.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === barang.id
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
      const existingItem = prevCart.find((item) => item.id === barang.id);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === barang.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter((item) => item.id !== barang.id);
      }
    });
    setTotalPrice((prev) => prev - barang.harga);
  };

  const handlePurchase = async (barang, toko) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      alert('Pengguna tidak ditemukan.');
      return;
    }

    if (!barang.id || !toko.id) {
      alert('Barang atau Toko tidak valid.');
      return;
    }

    const totalPrice = calculateTotalPrice();
    if (totalPrice <= 0) {
      alert('Harga total tidak valid.');
      return;
    }

    const pointsUsed = barang.harga;
    const updatedPoints = userPoints - pointsUsed;

    const result = await Swal.fire({
      title: 'Konfirmasi Pembelian',
      text: `Apakah Anda yakin ingin membeli ${barang.nama} dari ${toko.nama} seharga Rp${barang.harga}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, beli!',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
    });

    if (result.isConfirmed) {
      const payload = {
        userId: user.id,
        barangId: barang.id,
        tokoId: toko.id,
        totalPrice: totalPrice,
        pointsUsed: pointsUsed,
        status: 'pending',
      };

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

        setReceipt({
          toko: toko.nama,
          barang: barang.nama,
          harga: barang.harga,
          poinDikurangi: pointsUsed,
          totalPoints: updatedPoints,
        });

        Swal.fire({
          title: 'Pembelian Berhasil',
          text: `Pembelian ${barang.nama} berhasil! Silakan datang ke toko`,
          icon: 'success',
          confirmButtonColor: '#28a745',
        });

        setDataToko((prevData) =>
          prevData.map((t) =>
            t.id === toko.id
              ? {
                ...t,
                barang: t.barang.map((b) =>
                  b.id === barang.id ? { ...b, stok: b.stok - 1 } : b
                ),
              }
              : t
          )
        );
      } catch (error) {
        console.error('Error purchasing item:', error);
        Swal.fire({
          title: 'Error',
          text: 'Terjadi kesalahan. Silakan coba lagi.',
          icon: 'error',
        });
      }
    }
  };

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

  // handle clode modal
  const handleCloseModal = (e) => {
    if (e.target.id === "modal-background") {
      setShowSlide2(false);
    }
  };

  return (
    <div className="container mx-auto max-w-[80vw] min-h-screen">
      <h1 className="text-3xl font-bold text-center my-8">Toko</h1>
      <button
        onClick={() => setShowSlide2(true)}
        className="bg-blue-500 text-white px-4 py-2 items-center rounded shadow-md hover:bg-blue-600"
      >
        Petunjuk
      </button>
      <div className="mb-4 text-center">
        <p className="text-lg">Poin Anda: {userPoints}</p>
      </div>

      <div className="mb-4 text-center">
        <label htmlFor="toko-select" className="mr-2">Pilih Toko:</label>
        <select
          id="toko-select"
          className="p-2 border rounded"
          value={selectedToko || ''}
          onChange={(e) => setSelectedToko(e.target.value)}
        >
          <option value="">-- Pilih Toko --</option>
          {dataToko.map((toko) => (
            <option key={toko.id} value={toko.id}>
              {toko.nama}
            </option>
          ))}
        </select>
      </div>

      {selectedToko && (
        <div className="mb-8">
          {dataToko.filter(toko => toko.id === selectedToko).map((toko) => (
            <div key={toko.id} className="border border-gray-200 rounded-lg p-4 shadow-lg flex flex-col items-center mb-6">
              <h2 className="text-xl font-semibold mb-2">{toko.nama}</h2>
              <p className="text-gray-600 mb-2">{toko.alamat}</p>

              <h3 className="font-semibold text-lg mb-2 text-center">Barang yang tersedia:</h3>
              {toko.barang.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {toko.barang.map((barang) => (
                    <div key={barang.id} className="border border-gray-300 p-4 rounded-lg shadow-md">
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

                        <span className="px-4">{cart.find((item) => item.id === barang.id)?.quantity || 0}</span>

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
      )}
      {/* Modal untuk Slide 2 */}
      {showSlide2 && (
        <div
          id="modal-background"
          onClick={handleCloseModal} // Menangani klik di luar modal
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className=" rounded-lg p-8 max-w-[95vw] max-h-[80vh] overflow-auto">
            <button
              onClick={() => setShowSlide2(false)}
              className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full shadow-md"
            >
              ✕
            </button>
            <Slide2 />
          </div>
        </div>
      )}
    </div>
  );
};

export default Toko;
