import { Carousel } from "flowbite-react";

function Steps() {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel className="max-w-[80vw] mx-auto">
                {/* Slide 1 */}
                <div className="flex flex-col justify-center items-center text-white bg-blue-500 rounded-lg  h-full  ">
                    <h2 className="text-xl font-bold mb-4">
                        Bagaimana cara melakukan penukaran sampah?
                    </h2>
                    <ul className="list-disc text-left space-y-2">
                        <li>Datang ke bank sampah.</li>
                        <li>Kunjungi halaman bank sampah pada web.</li>
                        <li>Isi pilih nama bank sampah yang sesuai.</li>
                        <li>Pilih jenis sampah.</li>
                        <li>Masukkan berat sampah yang tertera pada mesin.</li>
                        <li>Klik hitung.</li>
                        <li>Kemudian klik kirim.</li>
                        <li>
                            Ingat ya jika berat sampah yang dimasukkan tidak sesuai maka akan
                            langsung tertolak.
                        </li>
                    </ul>
                </div>

                {/* Slide 2 */}
                <div className="flex flex-col justify-center items-center text-white bg-[#478336] rounded-lg h-full max-w-[80vw] mx-auto">
                    <h2 className="text-xl font-bold mb-4">
                        Cara pembelian sembako dengan uang digital?
                    </h2>
                    <ul className="list-disc text-left space-y-2">
                        <li>Datang ke toko yang sudah bekerja sama dengan kami.</li>
                        <li>Kunjungi halaman toko pada web.</li>
                        <li>Pilih toko yang dituju.</li>
                        <li>Pilih barang yang akan dibeli.</li>
                        <li>Klik checkout.</li>
                        <li>Pihak toko akan segera menyiapkan barangnya.</li>
                        <li>Terus kita ambil.</li>
                        <li>
                            Untuk pembelian bisa dilakukan dimana saja yaa. Namun ketika ingin
                            mengambil barang tetap harus ke toko ya.
                        </li>
                    </ul>
                </div>
            </Carousel>
        </div>
    )
}

export default Steps