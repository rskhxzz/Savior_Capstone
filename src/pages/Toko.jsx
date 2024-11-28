import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Toko = () => {
  const [user, setUser] = useState(null); // Data user yang login
  const [stores, setStores] = useState([]); // Daftar toko
  const [selectedStore, setSelectedStore] = useState(null); // Toko yang dipilih
  const [cart, setCart] = useState([]); // Daftar barang yang dipilih
  const [totalPoints, setTotalPoints] = useState(0); // Total poin yang dibutuhkan
  const navigate = useNavigate();

  // Fetch data user dan toko saat komponen dimuat
  useEffect(() => {
    // Verifikasi apakah user sudah login
    const loggedUser = localStorage.getItem('user');
    if (!loggedUser) {
      navigate('/login'); // Jika tidak ada user, redirect ke halaman login
      return;
    }
    const parsedUser = JSON.parse(loggedUser);
    setUser(parsedUser);

    // Mengambil data toko dari server
    const fetchStores = async () => {
      try {
        const response = await fetch('http://localhost:5000/toko');
        const data = await response.json();
        setStores(data);
      } catch (error) {
        console.error('Error fetching store data:', error);
      }
    };

    fetchStores();
  }, [navigate]);

  // Fungsi untuk memilih toko
  const handleSelectStore = (store) => {
    setSelectedStore(store);
    setCart([]); // Reset cart saat memilih toko baru
  };

  // Fungsi untuk menambah atau mengurangi jumlah barang di keranjang
  const handleQuantityChange = (itemId, action) => {
    const newCart = [...cart];
    const itemIndex = newCart.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      if (action === 'increment') {
        newCart[itemIndex].quantity += 1;
      } else if (action === 'decrement' && newCart[itemIndex].quantity > 0) {
        newCart[itemIndex].quantity -= 1;
      }
    } else if (action === 'increment') {
      newCart.push({ id: itemId, quantity: 1 });
    }

    setCart(newCart);
  };

  // Menghitung total poin yang dibutuhkan berdasarkan keranjang
  const calculateTotalPoints = () => {
    let total = 0;
    cart.forEach((item) => {
      const itemDetails = selectedStore.items.find((i) => i.id === item.id);
      if (itemDetails) {
        total += itemDetails.harga * item.quantity;
      }
    });
    setTotalPoints(total);
  };

  useEffect(() => {
    if (cart.length > 0 && selectedStore) {
      calculateTotalPoints();
    }
  }, [cart, selectedStore]);

  // Fungsi untuk konfirmasi pembelian
  const handlePurchase = () => {
    if (user.poin >= totalPoints) {
      // Kurangi poin user
      const updatedUser = { ...user, poin: user.poin - totalPoints };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Update stok barang
      const updatedStore = { ...selectedStore };
      cart.forEach((item) => {
        const storeItem = updatedStore.items.find((i) => i.id === item.id);
        if (storeItem) {
          storeItem.stok -= item.quantity;
        }
      });

      // Simpan perubahan stok ke server
      const updateStore = async () => {
        try {
          const response = await fetch(`http://localhost:5000/toko/${selectedStore.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedStore),
          });

          if (response.ok) {
            alert('Pembelian berhasil!');
            setCart([]); // Reset keranjang setelah pembelian
          } else {
            alert('Gagal memperbarui stok');
          }
        } catch (error) {
          console.error('Error updating store:', error);
        }
      };

      updateStore();
    } else {
      alert('Poin Anda tidak mencukupi untuk melakukan pembelian');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Toko Poin</h1>

      {/* Verifikasi user login */}
      {user && (
        <p className="text-xl mb-6">
          Nama: {user.name}, Poin: {user.poin}
        </p>
      )}

      {/* Pilih Toko */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Pilih Toko</h2>
        <select
          className="border p-2 rounded w-full"
          onChange={(e) => handleSelectStore(stores.find(store => store.id === e.target.value))}
        >
          <option value="">-- Pilih Toko --</option>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.nama} - {store.alamat}
            </option>
          ))}
        </select>
      </div>

      {/* Tampilkan barang jika toko dipilih */}
      {selectedStore && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-5">
          {selectedStore.items.map((item) => (
            <div key={item.id} className="card shadow rounded-xl overflow-hidden">
              <img
                className="w-full h-48 object-cover"
                src={item.gambar ? item.gambar : "placeholder.jpg"} // Add placeholder image if no image provided
                alt={item.nama}
              />
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{item.nama}</h3>
                  <p className="text-gray-600 text-sm">Rp {item.harga.toLocaleString('id-ID')} / kg</p>
                </div>
                <div className="flex items-center mt-4 px-12">
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-md mr-2"
                    onClick={() => handleQuantityChange(item.id, ' decrement ')}
                  >
                    -
                  </button>
                  <span className="text-gray-700 font-bold">{cart.find((i) => i.id === item.id)?.quantity || 0}</span>
                  <button
                    className="bg-green-400 text-white px-3 py-1 rounded-md"
                    onClick={() => handleQuantityChange(item.id, ' increment ')}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tampilkan struk */}
      {cart.length > 0 && (
        <div className="mt-6 p-4 bg-blue-100 rounded shadow">
          <h3 className="font-semibold">Struk Pembelian</h3>
          {cart.map((item) => {
            const itemDetails = selectedStore.items.find((i) => i.id === item.id);
            return (
              itemDetails && (
                <div key={item.id} className="flex justify-between py-2">
                  <span>{itemDetails.nama} x{item.quantity}</span>
                  <span>Rp {(itemDetails.harga * item.quantity).toLocaleString('id-ID')}</span>
                </div>
              )
            );
          })}
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>Rp {totalPoints.toLocaleString('id-ID')}</span>
          </div>
        </div>
      )}

      {/* Tombol Beli */}
      {cart.length > 0 && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow mt-6"
          onClick={handlePurchase}
        >
          Konfirmasi Pembelian
        </button>
      )}
    </div>
  );
};

export default Toko;
