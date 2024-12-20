/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

const WeatherDisplay = ({
  width = "80",
  top = "0.5",
  left = "1",
  bgOpacity = 0.5, // Default opacity 0.5 (50%)
}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);

  // Fungsi untuk mendapatkan lokasi pengguna
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            // Menangani error jika pengguna menolak atau terjadi masalah dengan lokasi
            setError("Gagal mendapatkan lokasi. Pastikan lokasi diaktifkan di perangkat Anda.");
            setLoading(false);
          },
          {
            enableHighAccuracy: true, // Memastikan mendapatkan lokasi yang lebih akurat
            timeout: 5000, // Timeout jika pengambilan lokasi terlalu lama
            maximumAge: 0, // Jangan menggunakan lokasi yang sudah tersimpan sebelumnya
          }
        );
      } else {
        setError("Geolocation tidak didukung di browser ini.");
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (location.lat != null && location.lng != null) {
        setLoading(true);
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&units=metric&appid=d997ac0da787d0b1efa1bf5e6f17bdad`
          );
          const data = await response.json();
          if (!response.ok) {
            throw new Error("Gagal mengambil data dari API");
          }
          setWeatherData(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWeather();
  }, [location]);

  // Fungsi untuk memilih ikon berdasarkan kondisi cuaca
  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain?.toLowerCase()) {
      case 'clear':
        return '☀️';
      case 'clouds':
        return '☁️';
      case 'rain':
        return '🌧️';
      case 'snow':
        return '❄️';
      case 'thunderstorm':
        return '⛈️';
      case 'drizzle':
        return '🌦️';
      default:
        return '🌫️';
    }
  };

  // Jika sedang memuat data
  if (loading) {
    return <div className="text-gray-500 absolute">Memuat lokasi...</div>;
  }

  // Jika gagal mengambil lokasi
  if (error) {
    return <div className="text-red-500 absolute">{error}</div>;
  }

  // Jika gagal memuat data cuaca
  if (!weatherData || weatherData.cod !== 200) {
    return <div className="text-red-500 absolute">Gagal memuat data cuaca.</div>;
  }

  const { name, main, weather } = weatherData;

  return (
    <div
      className="absolute text-white p-4 md:p-6 rounded-lg shadow-lg max-w-sm h-auto sm:w-64 md:w-80 lg:w-96"
      style={{
        top: `${top}rem`,
        left: `${left}rem`,
        backgroundColor: `rgba(50, 50, 50, ${bgOpacity})`, // Dynamic background opacity
      }}
    >
      <div className="flex items-center justify-between border-b border-gray-600 pb-2 mb-2">
        <h2 className="text-md md:text-lg font-semibold tracking-wider">{name.toUpperCase()}</h2>
        <span className="text-xl md:text-md">{getWeatherIcon(weather[0]?.main)}</span>
      </div>

      <div className="flex items-center justify-between mt-1">
        <p className="text-xl md:text-md font-semibold">{Math.round(main.temp)}°</p>
        <div className="text-left">
          <p className="text-sm md:text-base capitalize">{weather[0]?.description}</p>
          <p className="text-xs md:text-sm">
            H: {Math.round(main.temp_max)}° L: {Math.round(main.temp_min)}°
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
