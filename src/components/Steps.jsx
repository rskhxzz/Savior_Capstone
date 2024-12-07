import { Carousel } from "flowbite-react";

function Steps() {
  return (
    <div className="bg-white my-12 h-[100vh] md:[80vh] xl:h-[65vh] overflow-hidden">

      <Carousel className="min-w-[60vw] max-w-[80vw]  mx-auto md:max-w-[60vw]">
        {/* Slide 1 */}
        <div className="p-8 flex flex-col justify-center items-center text-white bg-blue-500 rounded-lg h-full">
          <h2 className="text-xl font-bold mb-4">
            Bagaimana cara melakukan penukaran sampah?
          </h2>
          <ul className="relative border-l border-gray-300 pl-4 space-y-6">
            <li className="mb-6 ml-4">
              <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
              <p>Datang ke bank sampah.</p>
            </li>
            <li className="mb-6 ml-4">
              <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
              <p>Kunjungi halaman bank sampah pada web.</p>
            </li>
            <li className="mb-6 ml-4">
              <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
              <p>Isi pilih nama bank sampah yang sesuai.</p>
            </li>
            <li className="mb-6 ml-4">
              <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
              <p>Pilih jenis sampah.</p>
            </li>
            <li className="mb-6 ml-4">
              <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
              <p>Masukkan berat sampah yang tertera pada mesin.</p>
            </li>
            <li className="mb-6 ml-4">
              <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
              <p>Klik hitung.</p>
            </li>
            <li className="mb-6 ml-4">
              <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
              <p>Kemudian klik kirim.</p>
            </li>
            <li className="mb-6 ml-4">
              <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
              <p>
                Ingat ya jika berat sampah yang dimasukkan tidak sesuai maka
                akan langsung tertolak.
              </p>
            </li>
          </ul>
        </div>

        {/* Slide 2 */}
        <div className="p-8 flex flex-col justify-center items-center text-white bg-blue-500 rounded-lg h-full">
          <h2 className="text-xl font-bold mb-4">
            Cara pembelian sembako dengan uang digital?
          </h2>
          <ul className="relative border-l border-gray-300 pl-4 space-y-6">
            <li className="mb-6 ml-4">
              <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
              <p>Datang ke toko yang sudah bekerja sama dengan kami.</p>
            </li>
            <li className="mb-6 ml-4">
              <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
              <p>Kunjungi halaman toko pada web.</p>
            </li>
            <li className="mb-6 ml-4">
              <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
              <p>Pilih toko yang dituju.</p>
            </li>
            <li className="mb-6 ml-4">
              <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
              <p>Pilih barang yang akan dibeli.</p>
            </li>
            <li className="mb-6 ml-4">
              <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
              <p>Klik checkout.</p>
            </li>
            <li className="mb-6 ml-4">
              <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
              <p>Pihak toko akan segera menyiapkan barangnya.</p>
            </li>
            <li className="mb-6 ml-4">
              <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
              <p>Terus kita ambil.</p>
            </li>
            <li className="mb-6 ml-4">
              <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
              <p>
                Untuk pembelian bisa dilakukan dimana saja yaa. Namun ketika
                ingin mengambil barang tetap harus ke toko ya.
              </p>
            </li>
          </ul>
        </div>
      </Carousel>
    </div>
  );
}

export default Steps;
