import AboutCard from "../../components/AboutCard";

const About = () => {
  return (
    <div className="p-8">
      <div className="max-w-[80vw] mx-auto my-12 text-sm md:text-lg bg-slate-200 p-8 rounded-xl">
        <h1 className="text-2xl  md:text-3xl xl:text-4xl text-center font-bold mb-8">Savior</h1>
        <div className="text-justify text-sm md:text-md xl:text-lg">
          <p>
            Savior adalah inisiatif inovatif yang bertujuan untuk mengatasi permasalahan sampah di Kota Surabaya. Platform digital kami memungkinkan masyarakat untuk menukarkan sampah yang mereka kumpulkan menjadi mata uang digital yang dapat digunakan untuk membeli berbagai kebutuhan pokok di jaringan toko kami. Dengan demikian, Savior tidak hanya mendorong pengelolaan sampah yang lebih baik, tetapi juga memberikan nilai tambah bagi masyarakat. Kolaborasi kami dengan Dinas Lingkungan Hidup Kota Surabaya semakin memperkuat komitmen kami untuk menciptakan lingkungan yang lebih bersih dan berkelanjutan.
          </p>
          <p className="my-4">Bagaimana caranya? Sederhana. Savior memungkinkan masyarakat untuk menukarkan sampah yang telah dipilah dan dikumpulkan menjadi mata uang digital. Mata uang digital ini kemudian dapat digunakan untuk berbelanja berbagai kebutuhan pokok di jaringan toko yang telah bekerja sama dengan kami. Dengan demikian, sampah yang tadinya menjadi beban, kini menjadi aset yang bernilai.</p>
          <p>
            Tujuan utama Savior adalah mendorong pengelolaan sampah yang lebih baik di Kota Surabaya. Kami percaya bahwa dengan memberikan insentif yang menarik, masyarakat akan lebih termotivasi untuk memilah dan mengelola sampah dengan benar. Kolaborasi yang erat dengan Dinas Lingkungan Hidup Kota Surabaya semakin memperkuat komitmen kami untuk menciptakan lingkungan yang bersih, sehat, dan berkelanjutan bagi generasi mendatang.
          </p>
        </div>
      </div>
      <h1 className="text-4xl my-8 text-center font-bold">Tentang Kami</h1>
      <AboutCard />
    </div>
  );
};

export default About;