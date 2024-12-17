import { useState, useEffect } from 'react';
import { fetchBankSampahData } from '../../script/data/api-endpoint';
import Swal from 'sweetalert2'; // Import SweetAlert2
import API_URL from '../../script/data/config';
import axios from 'axios';
import { Slide1 } from '../../components/Slides';

const BankSampah = () => {
  const [bankSampah, setBankSampahData] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [weight, setWeight] = useState('');
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [canProcess, setCanProcess] = useState(false);
  const [showSlide1, setShowSlide1] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil data bank sampah
        const bankSampahResponse = await fetchBankSampahData();
        setBankSampahData(bankSampahResponse);

        // Ambil data user dari API
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          const userId = userData.id; // Mendapatkan userId dari data user yang ada di localStorage

          // Memanggil API untuk mengambil data user berdasarkan userId
          const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`);
          if (response.ok) {
            const userFromApi = await response.json();
            setUser(userFromApi); // Menyimpan data user di state
            localStorage.setItem('user', JSON.stringify(userFromApi));
          } else {
            throw new Error('Failed to fetch user data');
          }
        }
      } catch (error) {
        console.error('Gagal mengambil data:', error);
        Swal.fire('Error', 'Terjadi kesalahan saat memuat data.', 'error');
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk menghitung poin
  const handleCalculate = async () => {
    if (!selectedBank || !selectedType || !weight) {
      Swal.fire('Peringatan', 'Harap lengkapi semua data!', 'warning');
      return;
    }

    const selectedSampah = selectedBank.sampah.find(item => item.id === selectedType);

    if (!selectedSampah) {
      Swal.fire('Peringatan', 'Jenis sampah yang dipilih tidak ditemukan', 'warning');
      return;
    }

    const price = selectedSampah.price;
    const total = price * parseFloat(weight);
    setResult(total.toLocaleString('id-ID'));

    // Aktifkan tombol "Proses"
    setCanProcess(true);

    Swal.fire({
      title: 'Hasil Perhitungan',
      text: `Poin yang dihitung adalah: Rp ${total.toLocaleString('id-ID')}`,
      icon: 'success',
      timer: 2000,
    });
  };

  const handleProcess = async () => {
    if (!canProcess) return;

    const payload = {
      userId: parseInt(user?.id),
      sampahId: selectedType,
      bankSampahId: selectedBank?.id,
      amount: parseFloat(weight),
      earned: parseFloat(result.replace(/[^0-9]/g, '')),
      status: 'pending',
    };

    console.log(payload);


    try {
      setIsProcessing(true);
      const response = await axios.post(`${API_URL}/penukaran`, payload);

      Swal.fire('Sukses', 'Data berhasil diproses!', 'success');
      console.log('Response:', response.data);
      setCanProcess(false);
      setResult(null);
      setWeight('');
    } catch (error) {
      console.error('Gagal memproses data:', error);
      Swal.fire('Error', 'Terjadi kesalahan saat memproses data.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // handle clode modal
  const handleCloseModal = (e) => {
    if (e.target.id === "modal-background") {
      setShowSlide1(false);
    }
  };

  return (
    <div className="mx-auto max-w-[80vw] min-h-screen ">
      <h1 className="text-3xl font-bold my-8 text-center">Bank Sampah</h1>
      <button
        onClick={() => setShowSlide1(true)}
        className="bg-blue-500 text-white px-4 py-2 my-2 rounded shadow-md hover:bg-blue-600"
      >
        Petunjuk
      </button>

      {user && (
        <div className="text-xl mb-6">
          <p><strong>Nama:</strong> {user.name}</p>
          <p><strong>Poin:</strong> {user.point}</p>
        </div>
      )}

      <p className="mb-6">Pilih bank sampah, jenis sampah, dan masukkan berat untuk menghitung pendapatan.</p>

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
              const value = Math.max(0, e.target.value);
              setWeight(value);
            }}
            placeholder="Masukkan berat dalam kg"
            min="0"
          />
        </div>

        <button
          type="button"
          onClick={handleCalculate}
          className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
        >
          Hitung
        </button>
      </form>

      {result && !isProcessing && (
        <div className="mt-6 p-4 bg-blue-100 rounded shadow">
          <p className="text-blue-800 font-semibold">
            Poin yang dihitung: {result}
          </p>
        </div>
      )}

      {canProcess && (
        <button
          type="button"
          onClick={handleProcess}
          disabled={isProcessing}
          className={`bg-blue-500 text-white px-4 py-2 rounded shadow-md ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
        >
          {isProcessing ? 'Memproses...' : 'Proses'}
        </button>
      )}
      {/* Modal untuk Slide 1 */}
      {showSlide1 && (
        <div
          id="modal-background"
          onClick={handleCloseModal} // Menangani klik di luar modal
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className=" rounded-lg p-8 max-w-[95vw] max-h-[80vh] overflow-auto">
            <button
              onClick={() => setShowSlide1(false)}
              className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full shadow-md"
            >
              ✕
            </button>
            <Slide1 />
          </div>
        </div>
      )}
    </div>
  );
};

export default BankSampah;
