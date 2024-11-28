import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Akun = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Cek apakah pengguna sudah login dengan memeriksa localStorage
        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
            setUserData(JSON.parse(user));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserData(null);
        navigate('/login'); // Arahkan pengguna ke halaman login setelah logout
    };

    return (
        <div className="flex flex-col w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4">Akun Saya</h1>

            {isLoggedIn ? (
                <div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Data Akun</h2>
                        <div className="text-sm text-gray-600">
                            <p><strong>Nama:</strong> {userData.name}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Pengaturan</h2>
                        <div className="text-sm text-gray-600">
                            <p>Pengaturan akun dan preferensi dapat diubah di sini.</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Pengaturan</h2>
                        <div className="text-sm text-gray-600">
                            <p>Pengaturan akun dan preferensi dapat diubah di sini.</p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/login')}  
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        Login
                    </button>
                </div>
            )}
        </div>
    );
};

export default Akun;
