import axios from 'axios';
import imageCompression from 'browser-image-compression'; // Mengimpor library kompresi gambar

// Fungsi untuk mengompres gambar
export const compressImage = (imageFile) => {
  const options = {
    maxSizeMB: 0.5, // Maksimal ukuran gambar setelah kompresi dalam MB
    maxWidthOrHeight: 1024, // Maksimal lebar/tinggi gambar setelah kompresi
    useWebWorker: true, // Menggunakan web worker untuk kompresi
  };

  return imageCompression(imageFile, options)
    .then((compressedFile) => {
      return compressedFile; // Mengembalikan file yang sudah dikompresi
    })
    .catch((error) => {
      console.error('Gagal mengompres gambar:', error);
      throw error;
    });
};

// Fungsi untuk menangani unggahan gambar
export const handleImageUpload = async (image, setUploading) => {
  if (!image) {
    alert('Silakan unggah gambar terlebih dahulu.');
    return null;
  }

  // Kompres gambar sebelum dikirim
  setUploading(true);
  const compressedImage = await compressImage(image);

  const formData = new FormData();
  formData.append('file', compressedImage);
  formData.append('upload_preset', 'reportPreset'); // Ganti dengan upload preset Anda
  formData.append('cloud_name', 'dzev0az08');

  try {
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dzev0az08/image/upload/',
      formData
    );
    setUploading(false);
    return response.data.secure_url; // URL gambar setelah diunggah
  } catch (error) {
    setUploading(false);
    console.error('Gagal mengunggah gambar:', error);
    alert('Gagal mengunggah gambar. Coba lagi.');
    return null;
  }
};
