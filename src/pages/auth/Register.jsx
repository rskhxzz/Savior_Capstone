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

      toast.success('Registration successful!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 mx-auto px-10 my-20 bg-white rounded-2xl shadow-xl">
      <div className="flex flex-col justify-center items-center gap-3 pb-4">
        <h1 className="text-3xl font-bold text-gray-700">Register</h1>
        <p className="text-sm text-gray-500">Buat akun baru</p>
      </div>

      {error && <div className="text-sm text-red-500 mb-4">{error}</div>}

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-700">nama</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mb-4 p-2 border rounded-lg"
          required
        />

        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mb-4 p-2 border rounded-lg"
          required
        />

        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mb-4 p-2 border rounded-lg"
          required
        />

        <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="mb-4 p-2 border rounded-lg"
        />

        <label className="block text-sm font-medium text-gray-700">Alamat</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mb-4 p-2 border rounded-lg"
        />

        <label className="block text-sm font-medium text-gray-700">Umur</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="mb-4 p-2 border rounded-lg"
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
          className="w-full p-2 bg-green-500 text-white rounded-lg"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-gray-500 text-center mt-4">
        Sudah punya akun?{' '}
        <a href="/login" className="text-green-500 font-medium">
          Login
        </a>
      </p>
    </div>
  );
};

export default Register;
