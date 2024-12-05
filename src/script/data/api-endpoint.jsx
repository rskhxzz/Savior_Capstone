import API_URL from './config';
import axios from 'axios';

// Endpoint untuk mengambil data bank sampah
// Fungsi untuk mengambil data Bank Sampah
export const fetchBankSampahData = async () => {
  try {
    const response = await axios.get(`${API_URL}/bank-sampah`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bank sampah:', error);
    throw error;
  }
};

// Fungsi untuk mengambil data user berdasarkan token
export const fetchUserData = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Fungsi untuk memperbarui poin user
export const updateUserPoin = async (userId, updatedUser, token) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, updatedUser, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating poin:', error);
    throw error;
  }
};

// Endpoint untuk mengambil data toko
export const getTokoData = async () => {
  try {
    const response = await fetch(`${API_URL}/toko`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Melemparkan error agar bisa ditangani di komponen
  }
};

