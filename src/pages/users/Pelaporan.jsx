/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Spinners from '../../components/Spinners';
import { handleImageUpload } from '../../script/utils/ImageUtils'; // Move image upload logic to utils

const PelaporanForm = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Ambil nama dari localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setName(parsedData.name || '');
    }
  }, []);

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await handleImageUpload(image, setUploading); // Call the function here
    if (!imageUrl) return;

    const storedUser = localStorage.getItem('user');
    const userId = storedUser ? JSON.parse(storedUser).id : null;

    if (!userId) {
      alert('User ID tidak ditemukan. Pastikan Anda sudah login.');
      return;
    }

    const reportData = {
      userId,
      judul: title,
      address,
      description,
      imageUrl,
    };  

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/pelaporan`,
        reportData
      );

      Swal.fire({
        title: 'Laporan berhasil dikirim!',
        text: 'Laporan berhasil dikirim!',
        icon: 'success',
        timer: 2000,
      });

      setTitle('');
      setAddress('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Gagal mengirim laporan:', error);
      Swal.fire({
        title: 'Terjadi kesalahan!',
        text: 'Laporan gagal dikirim. Silakan coba lagi.',
        icon: 'error',
        timer: 2000,
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto px-8 py-8 my-12 bg-white rounded-lg shadow-md relative">
      {uploading && <Spinners />}

      <h1 className="text-2xl font-bold mb-4">Form Laporan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nama:</label>
          <input
            type="text"
            value={name}
            readOnly
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Judul:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Alamat:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Deskripsi:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Unggah Gambar:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          disabled={uploading}
        >
          {uploading ? 'Mengunggah...' : 'Kirim Laporan'}
        </button>
      </form>
    </div>
  );
};

export default PelaporanForm;
