// import express from 'express';
// import { MongoClient } from 'mongodb';
// import cors from 'cors';
// const app = express();

// app.use(cors());
// app.use(express.json());

// // MongoDB URI dan Client
// const uri = "mongodb+srv://hiSavior:maconnection1@dbsavior.fwa1r.mongodb.net/?retryWrites=true&w=majority&appName=dbSavior";
// const client = new MongoClient(uri);

// // Koneksi ke MongoDB Atlas
// async function run() {
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB Atlas!");
//   } catch (error) {
//     console.error("Error connecting to MongoDB", error);
//   }
// }

// // Route untuk Users
// app.get('/api/users', async (req, res) => {
//   try {
//     const users = client.db('WasteManagement').collection('Users');
//     const result = await users.find().toArray();
//     res.json(result);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ message: "Error fetching users" });
//   }
// });

// // Route untuk Bank Sampah
// app.get('/api/BankSampah', async (req, res) => {
//   try {
//     const bankSampah = client.db('WasteManagement').collection('BankSampah');
//     const result = await bankSampah.find().toArray();
//     res.json(result);
//   } catch (error) {
//     console.error("Error fetching Bank Sampah:", error);
//     res.status(500).json({ message: "Error fetching Bank Sampah" });
//   }
// });

// // Route untuk Sampah
// app.get('/api/sampah', async (req, res) => {
//   try {
//     const sampah = client.db('WasteManagement').collection('Sampah');
//     const result = await sampah.find().toArray();
//     res.json(result);
//   } catch (error) {
//     console.error("Error fetching Sampah:", error);
//     res.status(500).json({ message: "Error fetching Sampah" });
//   }
// });

// // Route untuk Toko
// app.get('/api/toko', async (req, res) => {
//   try {
//     const toko = client.db('WasteManagement').collection('Toko');
//     const result = await toko.find().toArray();
//     res.json(result);
//   } catch (error) {
//     console.error("Error fetching Toko:", error);
//     res.status(500).json({ message: "Error fetching Toko" });
//   }
// });

// // Route untuk Barang
// app.get('/api/barang', async (req, res) => {
//   try {
//     const barang = client.db('WasteManagement').collection('Barang');
//     const result = await barang.find().toArray();
//     res.json(result);
//   } catch (error) {
//     console.error("Error fetching Barang:", error);
//     res.status(500).json({ message: "Error fetching Barang" });
//   }
// });

// // Menjalankan server lokal
// const port = 5000;
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// // Hanya menjalankan koneksi ke MongoDB tanpa menjalankan server lokal
// run();
