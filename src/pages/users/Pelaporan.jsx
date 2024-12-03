import React, { useState, useEffect } from 'react';

const Pelaporan = () => {
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({
    name: 'User Dummy', // Data dummy user
    photo: null,
    location: '',
    description: '',
  });

  // Mengambil data laporan dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedReports = localStorage.getItem('reports');
    if (storedReports) {
      setReports(JSON.parse(storedReports));
    } else {
      // Data dummy jika localStorage kosong
      setReports([
        {
          id: 1,
          name: 'Budi Santoso',
          photo: 'data:image/png;base64,iVBORw...', // Dummy Base64
          location: 'Surabaya',
          description: 'Tumpukan sampah di pinggir jalan.',
        },
        {
          id: 2,
          name: 'Siti Aminah',
          photo: 'data:image/png;base64,iVBORw...', // Dummy Base64
          location: 'Malang',
          description: 'Pencemaran sungai di daerah pemukiman.',
        },
      ]);
    }
  }, []);

  // Menyimpan data laporan ke localStorage setiap kali ada perubahan
  useEffect(() => {
    localStorage.setItem('reports', JSON.stringify(reports));
  }, [reports]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, photo: reader.result }); // Simpan dalam format Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.photo || !form.location || !form.description) {
      alert('Harap lengkapi semua data.');
      return;
    }

    // Tambahkan laporan baru ke daftar
    const newReport = {
      id: reports.length + 1,
      name: form.name,
      photo: form.photo, // Gambar dalam format Base64
      location: form.location,
      description: form.description,
    };

    setReports([...reports, newReport]);
    alert('Laporan berhasil dikirim.');
    setForm({ name: 'User Dummy', photo: null, location: '', description: '' }); // Reset form
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Pelaporan</h1>

      {/* Form Pelaporan */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block font-semibold mb-2">Nama Pengguna:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            disabled
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Foto Hal yang Dilaporkan:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Lokasi:</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleInputChange}
            placeholder="Masukkan lokasi"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Deskripsi:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            placeholder="Masukkan deskripsi"
            className="border rounded p-2 w-full"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Kirim Laporan
        </button>
      </form>

      {/* Daftar Laporan */}
      <h2 className="text-2xl font-bold mb-4">Daftar Laporan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="border rounded-lg p-4 shadow-md flex flex-col items-center"
          >
            <img
              src={report.photo}
              alt={report.description}
              className="w-40 h-40 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">{report.name}</h3>
            <p className="text-sm text-gray-600">{report.location}</p>
            <p className="text-sm text-gray-800 mt-2">{report.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pelaporan;
