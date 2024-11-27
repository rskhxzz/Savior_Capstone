// /* eslint-disable react/prop-types */
// import { useEffect } from 'react';

// const Marker = ({ map, position, title }) => {
//     useEffect(() => {
//         if (!map || !position) return; // Pastikan peta dan posisi tersedia

//         // Membuat marker baru
//         const marker = new window.google.maps.Marker({
//             position,
//             map,
//             title,
//         });

//         // Membersihkan marker jika komponen di-unmount
//         return () => {
//             marker.setMap(null);
//         };
//     }, [map, position, title]);

//     return null; // Komponen ini tidak perlu merender elemen HTML
// };

// export default Marker;
