/* eslint-disable no-unused-vars */
// src/admins/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Transaksi from './pages/Transaksi';
import Pengguna from './pages/Pengguna';
import Toko from './pages/Toko';

const AdminApp = () => {
  return (
    <Router>
      <div className="d-flex">
        {/* Sidebar */}
        <Sidebar />
        <div className="flex-grow-1">
          {/* Header */}
          <Header />
          <div className="container mt-4">
            <Routes>
              <Route path="/transaksi" element={<Transaksi />} />
              <Route path="/pengguna" element={<Pengguna />} />
              <Route path="/toko" element={<Toko />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default AdminApp;
