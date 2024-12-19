/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import axios from 'axios';

const History = () => {
    const [activeTab, setActiveTab] = useState('penukaran');
    const [penukarans, setPenukarans] = useState([]);
    const [payments, setPayments] = useState([]);
    const [pelaporanData, setPelaporanData] = useState([]);
    const [loading, setLoading] = useState(false);

    const userId = JSON.parse(localStorage.getItem('user'))?.id;

    useEffect(() => {
        fetchPenukarans();
    }, []);

    const fetchPenukarans = async () => {
        setLoading(true);
        try {
            const page = 1;
            const limit = 10;
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/penukaran`,
                { params: { userId, page, limit } }
            );
            setPenukarans(response.data);
        } catch (error) {
            Swal.fire('Error', 'Gagal mengambil data penukaran.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/payment`,
                { params: { userId } }
            );
            setPayments(response.data);
        } catch (error) {
            Swal.fire('Error', 'Gagal mengambil data pembayaran.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchPelaporan = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/pelaporan`, {
                params: { userId },
            });
            setPelaporanData(response.data);
        } catch (error) {
            Swal.fire('Error', 'Gagal mengambil data pelaporan.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const statusMapping = {
        success: 'Berhasil',
        cancelled: 'Dibatalkan',
        pending: 'Menunggu',
        sent: 'Terkirim',
        reviewed: 'Diproses',
        completed: 'Selesai',
        rejected: 'Ditolak',
    };

    const renderContent = () => {
        if (loading) return <p className="text-center text-gray-500">Loading...</p>;

        const renderCard = (items, fields) => (
            <motion.div
                className="grid gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className="p-4 border rounded-lg shadow-md bg-gray-50 hover:bg-gray-100"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        {fields.map(({ label, value, isImage }) => (
                            <div key={label} className="flex mb-2">
                                <span className="font-bold w-32">{label}</span>
                                {isImage ? (
                                    <img
                                        src={value(item)}
                                        alt={item.judul || 'Gambar'}
                                        className="h-32 w-32 object-cover rounded-lg"
                                    />
                                ) : (
                                    <span>{value(item)}</span>
                                )}
                            </div>
                        ))}
                    </motion.div>
                ))}
            </motion.div>
        );

        switch (activeTab) {
            case 'penukaran':
                return renderCard(penukarans, [
                    { label: 'Nama:', value: (item) => item.name?.name },
                    { label: 'Bank Sampah:', value: (item) => item.bankSampah?.name },
                    { label: 'Kategori:', value: (item) => item.category?.category },
                    { label: 'Reward:', value: (item) => item.earned },
                    { label: 'Status:', value: (item) => statusMapping[item.status] },
                    { label: 'Waktu:', value: (item) => format(new Date(item.dateUpdated), 'yyyy-MM-dd HH:mm') },
                ]);

            case 'payment':
                return renderCard(payments, [
                    { label: 'Nama:', value: (item) => item.user.name },
                    { label: 'Toko:', value: (item) => item.toko.nama },
                    { label: 'Status:', value: (item) => statusMapping[item.status] },
                    { label: 'Produk:', value: (item) => item.barang.nama },
                    { label: 'Total:', value: (item) => item.totalPrice },
                    { label: 'Waktu:', value: (item) => format(new Date(item.updatedAt), 'yyyy-MM-dd HH:mm') },
                ]);

            case 'pelaporan':
                return renderCard(pelaporanData, [
                    { label: 'Gambar:', value: (item) => item.imageUrl, isImage: true },
                    { label: 'Nama:', value: (item) => item.name?.name },
                    { label: 'Judul:', value: (item) => item.judul },
                    { label: 'Lokasi:', value: (item) => item.address },
                    { label: 'Deskripsi:', value: (item) => item.description },
                    { label: 'Status:', value: (item) => statusMapping[item.status] },
                    { label: 'Dibuat:', value: (item) => format(new Date(item.dateCreated), 'yyyy-MM-dd HH:mm') },
                    { label: 'Diubah:', value: (item) => format(new Date(item.dateUpdated), 'yyyy-MM-dd HH:mm') },
                ]);

            default:
                return <p className="text-center text-gray-500">Pilih kategori riwayat untuk ditampilkan.</p>;
        }
    };

    return (
        <motion.div
            className="container mx-auto p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-2xl font-bold text-center mb-6">Riwayat Kamu</h1>
            <div className="flex justify-center space-x-4 mb-6">
                {['penukaran', 'payment', 'pelaporan'].map((tab) => (
                    <motion.button
                        key={tab}
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                        onClick={() => {
                            setActiveTab(tab);
                            if (tab === 'penukaran') fetchPenukarans();
                            else if (tab === 'payment') fetchPayments();
                            else fetchPelaporan();
                        }}
                        whileHover={{ scale: 1.05 }}
                    >
                        {tab === 'penukaran'
                            ? 'Riwayat Penukaran'
                            : tab === 'payment'
                            ? 'Riwayat Pembayaran'
                            : 'Riwayat Pelaporan'}
                    </motion.button>
                ))}
            </div>
            <div>{renderContent()}</div>
        </motion.div>
    );
};

export default History;