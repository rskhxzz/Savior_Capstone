import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Mengimpor CSS untuk Leaflet
import locationMark from "../assets/images/icons/location-mark.png"

const Lokasi = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Mendapatkan lokasi pengguna menggunakan Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation([lat, lng]);
        },
        (error) => {
          console.error("Error mendapatkan lokasi:", error);
        }
      );
    }
  }, []);

  // Lokasi tambahan (contoh dengan lokasi di Surabaya)
  const additionalLocations = [
    { lat: -7.2504, lng: 112.7688, title: "Bank Sampah Surabaya 1" },   // Tugu Pahlawan
    { lat: -7.2575, lng: 112.7521, title: "Bank Sampah Surabaya 2" },    // Taman Bungkul
    { lat: -7.2740, lng: 112.7357, title: "Bank Sampah Surabaya 3" },     // Kebun Binatang Surabaya
    { lat: -7.2650, lng: 112.7485, title: "Bank Sampah Surabaya 4" }, // House of Sampoerna
    { lat: -7.2333, lng: 112.7350, title: "Bank Sampah Surabaya 5" },   // Masjid Al-Akbar
    { lat: -7.2512, lng: 112.7875, title: "Bank Sampah Surabaya 6" }, // Kampung Arab Surabaya
  ];
  

  if (!userLocation) {
    return <div>Loading...</div>; // Tampilkan loading jika lokasi pengguna belum didapatkan
  }

  // Membuat ikon kustom untuk marker tambahan (berwarna merah)
  const redIcon = L.icon({
    iconUrl: locationMark, // Ganti dengan URL gambar PNG Anda
    iconSize: [32, 32], // Ukuran ikon
    iconAnchor: [16, 32], // Titik jangkar ikon
    popupAnchor: [0, -32], // Lokasi popup relatif terhadap ikon
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Peta Lokasi</h1>

      {/* Peta dengan Leaflet */}
      <MapContainer
        center={userLocation} // Menetapkan pusat peta ke lokasi pengguna
        zoom={13}
        style={{
          width: "100%",
          height: "500px",
        }}
        className="rounded-lg shadow-lg" // Tailwind CSS untuk rounded corners dan shadow
      >
        {/* TileLayer untuk OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Marker untuk lokasi pengguna */}
        <Marker position={userLocation}>
          <Popup>Ini adalah lokasi Anda</Popup>
        </Marker>

        {/* Marker tambahan dengan ikon merah */}
        {additionalLocations.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lng]}
            icon={redIcon} // Gunakan ikon merah untuk marker tambahan
          >
            <Popup>{location.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Lokasi;
