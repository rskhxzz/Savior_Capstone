import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    age: '',
    gender: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Kirim data ke API menggunakan axios
      await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
        ...formData,
        age: parseInt(formData.age) || null, // Konversi age ke integer
      });

      toast.success('Berhasil mendaftar!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Kesalahan ketika mendaftar', error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError('Terjadi kesalahan, silahkan coba lagi');
      }
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen w-full md:w-1/2 xl:w-2/5 mx-auto px-10 bg-[#f4f4f4] rounded-2xl shadow-xl">
      <div className="flex flex-col justify-center items-center gap-3 py-4">
        <h1 className="text-2xl xl:text-3xl font-bold text-gray-700">Register</h1>
        <p className="text-sm text-gray-500">Buat akun baru</p>
      </div>

      {error && <div className="text-sm text-red-500 mb-4">{error}</div>}

      <form className="flex flex-col gap-1 lg:gap-2" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-700">Nama</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className=" p-1 lg:p-2 border rounded-lg"
          required
        />

        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="p-1 lg:p-2 border rounded-lg"
          required
        />

        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="p-1 lg:p-2 border rounded-lg"
          required
        />

        <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="p-1 lg:p-2 border rounded-lg"
        />

        <label className="block text-sm font-medium text-gray-700">Alamat</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="p-1 lg:p-2 border rounded-lg"
        />

        <label className="block text-sm font-medium text-gray-700">Umur</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="p1 lg:p-2 border rounded-lg"
        />

        <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
        <div className="flex items-center gap-4 mb-4">
          <label>
            <input
              type="radio"
              name="gender"
              value="pria"
              checked={formData.gender === 'pria'}
              onChange={handleChange}
            />
            <span className="ml-2">Pria</span>
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="wanita"
              checked={formData.gender === 'wanita'}
              onChange={handleChange}
            />
            <span className="ml-2">Wanita</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-[#0acf34] text-white rounded-lg"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-gray-500 text-center my-4">
        Sudah punya akun?{' '}
        <a href="/login" className="text-[#0acf34] font-medium">
          Login
        </a>
      </p>
    </div>
  );
};

export default Register;
