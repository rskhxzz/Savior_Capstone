import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BankSampah = () => {
  const [bankSampahData, setBankSampahData] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [weight, setWeight] = useState('');
  const [user, setUser] = useState(null); // Untuk menyimpan data user yang login
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Memeriksa status login dari localStorage
    const loggedUser = localStorage.getItem('user');
    if (!loggedUser) {
      navigate('/login'); // Jika tidak ada user, redirect ke halaman login
      return;
    }

    const parsedUser = JSON.parse(loggedUser);
    setUser(parsedUser); // Simpan data user di state

    // Mengambil data bank sampah dari db.json menggunakan fetch dari endpoint yang benar
    const fetchBankSampahData = async () => {
      try {
        const response = await fetch('http://localhost:5000/bank_sampah'); // Ubah ke URL yang benar
        const data = await response.json();
        setBankSampahData(data);
      } catch (error) {
        console.error('Error fetching bank sampah data:', error);
      }
    };

    fetchBankSampahData();
  }, [navigate]);

  const handleCalculate = () => {
    if (!selectedBank || !selectedType || !weight) {
      alert('Harap lengkapi semua data!');
      return;
    }

    // Pastikan selectedType ada di harga dan akses harga berdasarkan selectedType
    const price = selectedBank.harga[selectedType];
    if (price !== undefined) {
      const total = price * parseFloat(weight);
      setResult(`${total.toLocaleString('id-ID')}`);

      // Konfirmasi
      const isConfirmed = window.confirm('Apakah Anda yakin ingin menghitung dan memperbarui poin?');
      if (!isConfirmed) {
        return; // Jika dibatalkan, tidak melakukan perhitungan
      }

      // Update poin user
      const updatedUser = {
        ...user,
        poin: user.poin + total, // Tambahkan poin sesuai dengan hasil pendapatan
      };

      // Simpan kembali data user yang sudah diperbarui ke localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Kirimkan update poin ke server menggunakan AJAX (fetch)
      const updateUserPoin = async () => {
        try {
          const response = await fetch(`http://localhost:5000/users/${user.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...user,
              poin: updatedUser.poin, // Menambahkan poin yang baru
            }),
          });
          if (response.ok) {
            // Update state user langsung setelah berhasil memperbarui poin
            setUser(updatedUser);
            console.log('Poin berhasil diperbarui di server');
            // Reset form dan hasil
            setSelectedBank(null);
            setSelectedType(null);
            setWeight('');
            setResult(null); // Clear hasil kalkulasi
          } else {
            console.log('Gagal memperbarui poin di server');
          }
        } catch (error) {
          console.error('Error updating poin:', error);
        }
      };

      updateUserPoin();
    } else {
      alert('Harga untuk jenis sampah yang dipilih tidak ditemukan.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Bank Sampah</h1>

      {/* Menampilkan Nama dan Poin di bawah H1 */}
      {user && (
        <p className="text-xl mb-6">
          Nama: {user.name}, Poin: {user.poin}
        </p>
      )}

      <p className="mb-6">Pilih bank sampah, jenis sampah, dan masukkan berat untuk menghitung pendapatan.</p>

      {/* Pilih Bank Sampah */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Pilih Tempat:</label>
        <select
          className="border p-2 rounded w-full"
          value={selectedBank?.id || ''}
          onChange={(e) =>
            setSelectedBank(bankSampahData.find((bank) => bank.id === e.target.value))
          }
        >
          <option value="">-- Pilih Bank Sampah --</option>
          {bankSampahData.map((bank) => (
            <option key={bank.id} value={bank.id}>
              {bank.nama}
            </option>
          ))}
        </select>
      </div>

      {/* Pilih Jenis Sampah */}
      <form onSubmit={handleCalculate} className="space-y-4">
        {/* Pilih Jenis Sampah */}
        <div className="mb-4">
          <label className="block font-semibold mb-2" htmlFor="jenisSampah">
            Pilih Jenis Sampah:
          </label>
          <select
            id="jenisSampah"
            className="border p-2 rounded w-full"
            value={selectedType || ''}
            onChange={(e) => setSelectedType(e.target.value)}
            disabled={!selectedBank}
          >
            <option value="">-- Pilih Jenis Sampah --</option>
            {selectedBank?.jenis_sampah.map((type) => (
              <option key={type} value={type}>
                {type} - Rp {selectedBank.harga[type]?.toLocaleString('id-ID') || 'Harga tidak tersedia'} / kg
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

        {/* Tombol Kirim */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
        >
          Hitung
        </button>
      </form>


      {/* Hasil */}
      {result && (
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