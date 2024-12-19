const Slide1 = () => {
    return (
        <div className="p-8 flex flex-col justify-center items-center text-white bg-blue-500 rounded-lg max-h-full mx-auto">
            <h2 className="text:md lg:text-xl font-bold mb-4">
                Bagaimana cara melakukan penukaran sampah?
            </h2>
            <ul className="text-sm lg-text-md relative border-l border-gray-300 pl-4 space-y-6">
                {[
                    "Datang ke bank sampah",
                    "Kunjungi halaman bank sampah pada web.",
                    "Isi pilih nama bank sampah yang sesuai.",
                    "Pilih jenis sampah.",
                    "Masukkan berat sampah yang tertera pada mesin.",
                    "Klik hitung dan kirim.",
                    "Admin akan mengecek dan mengkonfirmasi penukaran.",
                    "Jika data yang dimasukkan tidak sesuai maka akan ditolak",
                ].map((text, index) => (
                    <li key={index} className="mb-6 ml-4">
                        <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
                        <p>{text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Slide2 = () => {
    return (
        <div className="p-8 flex flex-col justify-center items-center text-white bg-blue-500 rounded-lg max-h-full">
            <h2 className="text:md lg:text-xl font-bold mb-4">
                Cara pembelian sembako dengan uang digital
            </h2>
            <ul className="text-sm lg-text-md relative border-l border-gray-300 pl-4 space-y-6">
                {[
                    "Datang ke toko yang sudah bekerja sama dengan kami.",
                    "Kunjungi halaman toko pada web.",
                    "Pilih toko yang dituju.",
                    "Pilih barang yang akan dibeli.",
                    "Klik beli.",
                    "Pihak toko akan segera menyiapkan barangnya dan melakukan konfirmasi.",
                    "Terus kita ambil.",
                    "Kami sangat menyarankan untuk melakukan pembelian sembako di toko.",
                ].map((text, index) => (
                    <li key={index} className="mb-6 ml-4">
                        <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
                        <p>{text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { Slide1, Slide2 };
