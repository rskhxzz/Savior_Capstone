/* eslint-disable no-unused-vars */
import  { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';

const History = () => {
    const [activeTab, setActiveTab] = useState('');
    const [penukarans, setPenukarans] = useState([]);
    const [payments, setPayments] = useState([]);
    const [pelaporanData, setPelaporanData] = useState([]);
    const [loading, setLoading] = useState(false);

    const userId = JSON.parse(localStorage.getItem('user'))?.id;

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
            console.error('Error fetching penukarans:', error);
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
            console.error('Error fetching payments:', error);
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
            console.error('Error fetching pelaporan:', error);
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

        switch (activeTab) {
            case 'penukaran':
                return ( 
                    <div>
                        <h2 className="text-xl font-bold mb-4">Riwayat Penukaran</h2>
                        <ul className="space-y-4">
                            {penukarans.map((penukaran) => (
                                <li
                                    key={penukaran.id}
                                    className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100"
                                >
                                    <p><span className="font-bold">Nama:</span> {penukaran.name?.name}</p>
                                    <p><span className="font-bold">Bank Sampah:</span> {penukaran.bankSampah?.name}</p>
                                    <p><span className="font-bold">Kategori:</span> {penukaran.category?.category}</p>
                                    <p><span className="font-bold">Reward:</span> {penukaran.earned}</p>
                                    <p><span className="font-bold">Status:</span> {statusMapping[penukaran.status]}</p>
                                    <p><span className="font-bold">Waktu:</span> {format(new Date(penukaran.dateUpdated), 'yyyy-MM-dd HH:mm')}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'payment':
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Riwayat Pembayaran</h2>
                        <ul className="space-y-4">
                            {payments.map((payment) => (
                                <li
                                    key={payment.id}
                                    className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100"
                                >
                                    <p><span className="font-bold">Nama:</span> {payment.user.name}</p>
                                    <p><span className="font-bold">Toko:</span> {payment.toko.nama}</p>
                                    <p><span className="font-bold">Status:</span> {statusMapping[payment.status]}</p>
                                    <p><span className="font-bold">Produk:</span> {payment.barang.nama}</p>
                                    <p><span className="font-bold">Total:</span> {payment.totalPrice}</p>
                                    <p><span className="font-bold">Waktu:</span> {format(new Date(payment.updatedAt), 'yyyy-MM-dd HH:mm')}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'pelaporan':
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Riwayat Pelaporan</h2>
                        <ul className="space-y-4">
                            {pelaporanData.map((pelaporan) => (
                                <li
                                    key={pelaporan.id}
                                    className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100"
                                >                        <img
                                src={pelaporan.imageUrl}
                                alt={pelaporan.judul}
                                className="max-w-3xl h-32 object-cover my-2 rounded-lg"
                            />
                                    <p><span className="font-bold">Nama:</span> {pelaporan.name?.name}</p>
                                    <p><span className="font-bold">Judul:</span> {pelaporan.judul}</p>
                                    <p><span className="font-bold">Lokasi:</span> {pelaporan.address}</p>
                                    <p><span className="font-bold">Deskripsi:</span> {pelaporan.description}</p>
                                    <p><span className="font-bold">Status:</span> {statusMapping[pelaporan.status]}</p>
                                    <p><span className="font-bold">Dibuat:</span> {format(new Date(pelaporan.dateCreated), 'yyyy-MM-dd HH:mm')}</p>
                                    <p><span className="font-bold">Diubah:</span> {format(new Date(pelaporan.dateUpdated), 'yyyy-MM-dd HH:mm')}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            default:
                return <p className="text-center text-gray-500">Pilih kategori riwayat untuk ditampilkan.</p>;
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Riwayat Kamu</h1>
            <div className="flex justify-center space-x-4 mb-6">
                <button
                    className={`px-4 py-2 rounded-lg ${activeTab === 'penukaran' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => {
                        setActiveTab('penukaran');
                        fetchPenukarans();
                    }}
                >
                    Riwayat Penukaran
                </button>
                <button
                    className={`px-4 py-2 rounded-lg ${activeTab === 'payment' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => {
                        setActiveTab('payment');
                        fetchPayments();
                    }}
                >
                    Riwayat Pembayaran
                </button>
                <button
                    className={`px-4 py-2 rounded-lg ${activeTab === 'pelaporan' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => {
                        setActiveTab('pelaporan');
                        fetchPelaporan();
                    }}
                >
                    Riwayat Pelaporan
                </button>
            </div>
            <div>{renderContent()}</div>
        </div>
    );
};

export default History;
