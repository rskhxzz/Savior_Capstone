import { useState, useEffect } from 'react';

const BankSampah = () => {
  const [bankSampahData, setBankSampahData] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [weight, setWeight] = useState('');
  const [user, setUser] = useState(null); // Untuk menyimpan data user yang login
  const [result, setResult] = useState(null); // Menyimpan hasil perhitungan
  const [isProcessing, setIsProcessing] = useState(false); // Menyimpan status apakah sedang diproses

  // Mengambil data Bank Sampah dari backend
  useEffect(() => {
    const fetchBankSampahData = async () => {
      try {
        const response = await fetch('http://localhost:5000/bank');
        if (response.ok) {
          const data = await response.json();
          setBankSampahData(data);
        } else {
          console.error('Gagal mengambil data bank sampah');
        }
      } catch (error) {
        console.error('Error fetching bank sampah:', error);
      }
    };
    fetchBankSampahData();

    // Ambil token dari localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Ambil data user berdasarkan token
      const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:5000/users', {
            headers: {
              'Authorization': `Bearer ${token}`, // Sertakan token dalam header
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            console.error('Gagal mengambil data user');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, []); // Hanya sekali ketika komponen pertama kali dimuat

  // Fungsi untuk menghitung poin
  const handleCalculate = () => {
    if (!selectedBank || !selectedType || !weight) {
      alert('Harap lengkapi semua data!');
      return;
    }

    const selectedSampah = selectedBank.sampah.find(item => item._id === selectedType);

    if (!selectedSampah) {
      alert('Jenis sampah yang dipilih tidak ditemukan');
      return;
    }

    const price = selectedSampah.harga;
    const total = price * parseFloat(weight);
    setResult(total.toLocaleString('id-ID'));

    // Konfirmasi
    const isConfirmed = window.confirm('Apakah Anda yakin ingin menghitung dan memperbarui poin?');
    if (!isConfirmed) {
      return; // Jika dibatalkan, tidak melakukan perhitungan
    }

    // Ambil data user dari localStorage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    // Pastikan data user ada di localStorage
    if (!userData) {
      alert('Data pengguna tidak ditemukan, harap login terlebih dahulu!');
      return; // Jika user tidak ditemukan, hentikan eksekusi
    }

    const user = JSON.parse(userData); // Mengubah string JSON ke objek

    // Ambil ID user dari data yang ada
    const userId = user.id;

    // Update poin user
    const updatedUser = {
      poin: user.poin + total, // Menambahkan poin sesuai dengan hasil perhitungan
    };

    // Kirimkan update poin ke server
    const updateUserPoin = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Sertakan token dalam header
          },
          body: JSON.stringify(updatedUser),
        });
        if (response.ok) {
          const updatedUserData = await response.json();
          setUser(updatedUserData); // Set data user yang baru
          localStorage.setItem('user', JSON.stringify(updatedUserData)); // Simpan data user yang diperbarui
          alert('Poin berhasil diperbarui!');
          setSelectedBank(null);
          setSelectedType(null);
          setWeight('');
          setResult(null);
        } else {
          console.log('Gagal memperbarui poin di server');
        }
      } catch (error) {
        console.error('Error updating poin:', error);
      }
    };
    

    updateUserPoin();
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
          value={selectedBank?._id || ''}
          onChange={(e) =>
            setSelectedBank(bankSampahData.find((bank) => bank._id === e.target.value))
          }
        >
          <option value="">-- Pilih Bank Sampah --</option>
          {bankSampahData.map((bank) => (
            <option key={bank._id} value={bank._id}>
              {bank.nama_bank_sampah}
            </option>
          ))}
        </select>
      </div>

      {/* Pilih Jenis Sampah */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="mb-4">
          <label className="block font-semibold mb-2" htmlFor="jenis_sampah">
            Pilih Jenis Sampah:
          </label>
          <select
            id="jenis_sampah"
            className="border p-2 rounded w-full"
            value={selectedType || ''}
            onChange={(e) => setSelectedType(e.target.value)}
            disabled={!selectedBank}
          >
            <option value="">-- Pilih Jenis Sampah --</option>
            {selectedBank?.sampah?.map((item) => (
              <option key={item._id} value={item._id}>
                {item.jenis_sampah} - Rp {item.harga?.toLocaleString('id-ID') || 'Harga tidak tersedia'} / kg
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
