import { useState, useEffect } from 'react';
import {
  fetchBankSampahData,
  fetchUserData,
  updateUserPoin,
} from '../../script/data/api-endpoint';

const BankSampah = () => {
  const [bankSampah, setBankSampahData] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [weight, setWeight] = useState('');
  const [user, setUser] = useState(null); // Untuk menyimpan data user yang login
  const [result, setResult] = useState(null); // Menyimpan hasil perhitungan
  const [isProcessing, setIsProcessing] = useState(false); // Menyimpan status apakah sedang diproses

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Fetch data Bank Sampah
        const bankData = await fetchBankSampahData();
        setBankSampahData(bankData);

        // Fetch user data jika token ada
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await fetchUserData(token);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };

    loadInitialData();
  }, []);

  // Fungsi untuk menghitung poin
  const handleCalculate = async () => {
    if (!selectedBank || !selectedType || !weight) {
      alert('Harap lengkapi semua data!');
      return;
    }
  
    const selectedSampah = selectedBank.sampah.find(item => item.id === selectedType);
  
    if (!selectedSampah) {
      alert('Jenis sampah yang dipilih tidak ditemukan');
      return;
    }
  
    const price = selectedSampah.price;
    const total = price * parseFloat(weight);
    setResult(total.toLocaleString('id-ID'));
  
    const isConfirmed = window.confirm('Apakah Anda yakin ingin menghitung dan memperbarui poin?');
    if (!isConfirmed) {
      return;
    }
  
    try {
      setIsProcessing(true); // Menandai proses sedang berlangsung
  
      // Update poin user melalui API
      const updatedUser = await updateUserPoin( { poin: user.poin + total });
  
      // Perbarui data user di local state
      setUser(updatedUser);
      alert('Poin berhasil diperbarui!');
    } catch (error) {
      console.error('Gagal memperbarui poin:', error);
      alert('Terjadi kesalahan saat memperbarui poin.');
    } finally {
      setIsProcessing(false); // Proses selesai
    }
  };
  

  return (
    <div className="p-8 h-[100vh]">
      <h1 className="text-3xl font-bold mb-4">Bank Sampah</h1>

      {/* Menampilkan Nama dan Poin di bawah H1 */}
      {user && (
        <div className="text-xl mb-6">
          <p><strong>Nama:</strong> {user.name}</p>
          <p><strong>Poin:</strong> {user.poin}</p>
        </div>
      )}

      <p className="mb-6">Pilih bank sampah, jenis sampah, dan masukkan berat untuk menghitung pendapatan.</p>

      {/* Pilih Bank Sampah */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Pilih Tempat:</label>
        <select
          className="border p-2 rounded w-full"
          value={selectedBank?.id || ''}
          onChange={(e) =>
            setSelectedBank(bankSampah.find((bank) => bank.id === e.target.value))
          }
        >
          <option value="">-- Pilih Bank Sampah --</option>
          {bankSampah.map((bank) => (
            <option key={bank.id} value={bank.id}>
              {bank.name}
            </option>
          ))}
        </select>
      </div>

      {/* Pilih Jenis Sampah */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="mb-4">
          <label className="block font-semibold mb-2" htmlFor="category">
            Pilih Jenis Sampah:
          </label>
          <select
            id="category"
            className="border p-2 rounded w-full"
            value={selectedType || ''}
            onChange={(e) => setSelectedType(e.target.value)}
            disabled={!selectedBank}
          >
            <option value="">-- Pilih Jenis Sampah --</option>
            {selectedBank?.sampah?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.category} - Rp {item.price?.toLocaleString('id-ID') || 'Harga tidak tersedia'} / kg
              </option>
            ))}
          </select>
        </div>

        {/* Input Berat */}
        <div className="mb-4">
          <label className="block font-semibold mb-2" htmlFor="berat">
            Masukkan Berat (kg):
          </label>
          <input
            id="berat"
            type="number"
            className="border p-2 rounded w-full"
            value={weight}
            onChange={(e) => {
              // Pastikan input hanya bernilai positif
              const value = Math.max(0, e.target.value); // Membatasi nilai minimum 0
              setWeight(value);
            }}
            placeholder="Masukkan berat dalam kg"
            min="0"
          />
        </div>

        {/* Tombol Hitung */}
        <button
          type="button"
          onClick={handleCalculate}
          className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
        >
          Hitung
        </button>
      </form>

      {/* Hasil */}
      {result && !isProcessing && (
        <div className="mt-6 p-4 bg-blue-100 rounded shadow">
          <p className="text-blue-800 font-semibold">
            Poin yang didapatkan adalah: {result}
          </p>
        </div>
      )}
    </div>

  );
};

export default BankSampah;
