import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // untuk redirect ke halaman lain

const Akun = () => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(null);
    const navigate = useNavigate(); // untuk navigasi

    useEffect(() => {
        // Ambil data user dari localStorage
        const storedData = localStorage.getItem('user');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setUserData(parsedData);
            setEditedData(parsedData);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userData.id,
                    ...editedData,
                }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUserData(updatedUser.user);
                setIsEditing(false);
                localStorage.setItem('user', JSON.stringify(updatedUser.user));
            } else {
                alert('Gagal memperbarui data.');
            }
        } catch (error) {
            console.error(error);
            alert('Terjadi kesalahan.');
        }
    };

    const isSaveDisabled = JSON.stringify(userData) === JSON.stringify(editedData);

    const handleLogout = () => {
        // Menghapus data user dari localStorage dan mengalihkan ke halaman login
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/login'); // Ganti dengan rute yang sesuai untuk halaman login
    };

    if (!userData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl text-gray-500">Memuat data...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#08091f] flex flex-col items-center py-10">
            <div className=" rounded-xl p-6 max-w-md w-full relative"
                 style={{
                    background: 'rgba(255,255,255,0.4)',
                    WebkitBackdropFilter: 'blur(8px)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                 }}>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Profil Akun</h1>
                <button
                    className={`absolute top-4 right-4 text-white px-4 py-2 rounded flex items-center gap-2 ${isEditing ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                    onClick={() => setIsEditing((prev) => !prev)}
                >
                    <svg
                        className="w-6 h-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.304 4.844l2.852 2.852M7 7H4a1 1 0 00-1 1v10a1 1 0 001 1h11a1 1 0 001-1v-4.5m2.409-9.91a2.017 2.017 0 010 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 012.852 0z"
                        />
                    </svg>
                    {isEditing ? 'Batal' : 'Edit'}
                </button>
                <div className="space-y-3">
                    {Object.entries(userData).map(([key, value]) =>
                        key !== 'id' &&
                            key !== 'point' &&
                            key !== 'password' &&
                            key !== 'createdAt' &&
                            key !== 'updatedAt' &&
                            key !== 'role' ? (
                            <div key={key}>
                                <label className="font-semibold capitalize">{key}:</label>
                                {isEditing ? (
                                    key === 'gender' ? (
                                        <div className="mt-1">
                                            <label className="mr-4">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="pria"
                                                    checked={editedData[key] === 'pria'}
                                                    onChange={handleInputChange}
                                                    className="mr-2"
                                                />
                                                Pria
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="wanita"
                                                    checked={editedData[key] === 'wanita'}
                                                    onChange={handleInputChange}
                                                    className="mr-2"
                                                />
                                                Wanita
                                            </label>
                                        </div>
                                    ) : (
                                        <input
                                            type="text"
                                            name={key}
                                            value={editedData[key] || ''}
                                            onChange={handleInputChange}
                                            className="border rounded w-full p-2 mt-1"
                                        />
                                    )
                                ) : (
                                    <p>{value || '-'}</p>
                                )}
                            </div>
                        ) : null,
                    )}
                </div>
                {isEditing && (
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            onClick={handleSave}
                            disabled={isSaveDisabled}
                            className={`px-4 py-2 rounded ${isSaveDisabled
                                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                    : 'bg-green-500 text-white hover:bg-green-600'
                                }`}
                        >
                            Simpan
                        </button>
                    </div>
                )}
                {/* Tombol Logout */}
                <div className="flex justify-center mt-12">
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded bg-[#fa0000] text-white hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Akun;
