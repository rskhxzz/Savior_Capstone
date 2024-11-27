import { useState } from 'react';
import { bankSampahData } from '../script/data/bankSampahData';

const BankSampah = () => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (!selectedBank || !selectedType || !weight) {
      alert('Harap lengkapi semua data!');
      return;
    }
    const price = selectedBank.types.find((type) => type.name === selectedType)?.pricePerKg;
    const total = price * parseFloat(weight);
    setResult(`Total pendapatan: Rp ${total.toLocaleString('id-ID')}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Bank Sampah</h1>
      <p className="mb-6">Pilih bank sampah, jenis sampah, dan masukkan berat untuk menghitung pendapatan.</p>

      {/* Pilih Bank Sampah */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Pilih Tempat:</label>
        <select
          className="border p-2 rounded w-full"
          value={selectedBank?.id || ''}
          onChange={(e) =>
            setSelectedBank(bankSampahData.find((bank) => bank.id === parseInt(e.target.value)))
          }
        >
          <option value="">-- Pilih Bank Sampah --</option>
          {bankSampahData.map((bank) => (
            <option key={bank.id} value={bank.id}>
              {bank.name}
            </option>
          ))}
        </select>
      </div>

      {/* Pilih Jenis Sampah */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Pilih Jenis Sampah:</label>
        <select
          className="border p-2 rounded w-full"
          value={selectedType || ''}
          onChange={(e) => setSelectedType(e.target.value)}
          disabled={!selectedBank}
        >
          <option value="">-- Pilih Jenis Sampah --</option>
          {selectedBank?.types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name} - Rp {type.pricePerKg.toLocaleString('id-ID')} / kg
            </option>
          ))}
        </select>
      </div>

      {/* Input Berat */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Masukkan Berat (kg):</label>
        <input
          type="number"
          className="border p-2 rounded w-full"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Masukkan berat dalam kg"
        />
      </div>

      {/* Tombol Kirim */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
        onClick={handleCalculate}
      >
        Hitung
      </button>

      {/* Hasil */}
      {result && (
        <div className="mt-6 p-4 bg-blue-100 rounded shadow">
          <p className="text-blue-800 font-semibold">{result}</p>
        </div>
      )}
    </div>
  );
};

export default BankSampah;
