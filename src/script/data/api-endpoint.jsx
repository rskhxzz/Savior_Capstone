import API_URL from './config';

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

