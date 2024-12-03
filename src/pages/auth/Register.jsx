import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alamat, setAlamat] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState(''); // Error message for failed registration
    const navigate = useNavigate(); // For navigation after successful registration

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { nama_user: name, email_user: email, password, alamat, gender, role: 'user' };

        try {
            // Send user data to the backend
            await axios.post('http://localhost:5000/register', newUser);
            toast.success('Registration successful!');
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after 2 seconds
            }, 2000); // Delay navigation to allow alert to be seen
        } catch (error) {
            console.error('There was an error!', error);

            // Mengecek error dari respons server
            if (error.response && error.response.data) {
                if (error.response.data.message === 'Email already exists') { // Ganti pesan error di sini sesuai backend
                    setError('Email sudah terdaftar. Silakan gunakan email lain.');
                } else {
                    setError('Registrasi gagal. Silakan coba lagi.');
                }
            } else {
                setError('Registrasi gagal. Silakan coba lagi.');
            }
        }
    };


    return (
        <>
            <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto px-20 my-20 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
                <div className="flex flex-col justify-center mx-auto items-center gap-3 pb-4">
                    <div>
                        <img src="src\assets\savior-icon.png" alt="Logo" width="50" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#4B5563]">SAVIOR</h1>
                </div>
                <div className="text-sm font-light text-[#6B7280] pb-8 mx-auto">Create your account</div>

                {/* Error message display */}
                {error && <div className="text-sm text-red-500">{error}</div>}

                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <div className="pb-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#111827]">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="pb-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#111827]">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="pb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#111827]">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="pb-2">
                        <label htmlFor="alamat" className="block mb-2 text-sm font-medium text-[#111827]">Alamat</label>
                        <input
                            type="text"
                            name="alamat"
                            id="alamat"
                            className="mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5"
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)}
                            required
                        />
                    </div>
                    <div className="pb-2">
                        <label className="block mb-2 text-sm font-medium text-[#111827]">Gender</label>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    value="pria"
                                    checked={gender === 'pria'}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                <label htmlFor="male" className="ml-2 text-sm font-medium text-[#111827]">Pria</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    value="wanita"
                                    checked={gender === 'wanita'}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                <label htmlFor="female" className="ml-2 text-sm font-medium text-[#111827]">Wanita</label>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full text-[#FFFFFF] bg-[#0acf34] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="text-sm font-light text-[#6B7280] text-center">
                    Already have an account? <a href="/login" className="font-medium text-[#0acf34] hover:underline">Login</a>
                </div>
            </div>
        </>
    );
};

export default Register;
