import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const updateUserProfile = async (userId, editedData, setLoading) => {
    try {
        setLoading(true); // Tampilkan spinner
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: userId,
                ...editedData,
            }),
        });

        if (response.ok) {
            const updatedUser = await response.json();
            toast.success('Akun berhasil diperbarui!'); 
            return updatedUser.user;
        } else {
            toast.error('Gagal memperbarui akun!'); 
            return null;
        }
    } catch (error) {
        console.error(error);
        toast.error('Terjadi kesalahan saat memperbarui akun!'); 
        return null;
    } finally {
        setLoading(false); // Sembunyikan spinner
    }
};

export const useAkunHandler = () => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
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
        const updatedUser = await updateUserProfile(userData.id, editedData, setLoading);
        if (updatedUser) {
            setUserData(updatedUser);
            setIsEditing(false);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return {
        userData,
        isEditing,
        editedData,
        setIsEditing,
        handleInputChange,
        handleSave,
        handleLogout,
        loading,
    };
};
