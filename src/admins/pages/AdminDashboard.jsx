/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [transactions, setTransactions] = useState([]);

  // Mengambil data transaksi dari API atau db.json
  useEffect(() => {
    axios.get('/api/penukaran') // Ganti dengan endpoint API Anda
      .then((response) => {
        // Memastikan data yang diterima adalah array
        const data = Array.isArray(response.data) ? response.data : [];
        setTransactions(data);
      })
      .catch((error) => {
        console.error(error);
        setTransactions([]); // Set transactions ke array kosong jika ada error
      });
  }, []);

  const handleApprove = (id) => {
    axios.put(`/api/penukaran/${id}`, { status_transaksi: 'disetujui' })
      .then((response) => {
        setTransactions(transactions.map(t => 
          t.id === id ? { ...t, status_transaksi: 'disetujui' } : t
        ));
      })
      .catch((error) => console.error(error));
  };

  const handleReject = (id) => {
    axios.put(`/api/penukaran/${id}`, { status_transaksi: 'ditolak' })
      .then((response) => {
        setTransactions(transactions.map(t => 
          t.id === id ? { ...t, status_transaksi: 'ditolak' } : t
        ));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">ID</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Total Sampah</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Jenis Sampah</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Total Poin</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Status Transaksi</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">{transaction.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{transaction.total_sampah}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{transaction.jenis_sampah}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{transaction.total_poin}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{transaction.status_transaksi}</td>
                  <td className="py-3 px-4 text-sm">
                    {transaction.status_transaksi === 'menunggu' && (
                      <>
                        <button 
                          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mr-2"
                          onClick={() => handleApprove(transaction.id)}
                        >
                          Setujui
                        </button>
                        <button 
                          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                          onClick={() => handleReject(transaction.id)}
                        >
                          Tolak
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">Tidak ada transaksi.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
