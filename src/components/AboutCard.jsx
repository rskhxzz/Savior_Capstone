/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaGithub, FaInstagram } from "react-icons/fa";  
import Images1 from "../assets/images/team/images1.jpg";
import Images2 from "../assets/images/team/images2.jpg";
import Images3 from "../assets/images/team/images3.jpg";
import Images4 from "../assets/images/team/images4.png";

const aboutCards = [
  {
    Image: Images1,
    Name: "M Rasikh Fi Ilmi",
    Position: "Project Manager",
    Description:
      "Hi everyone! Saya Muhamad Raasikh Fil'ilmi mahasiswa S1 Teknik Informatika di Universitas Negeri Surabaya dengan keahlian di bidang web development (HTML, JavaScript, CSS, UI/UX, Python, Laravel), serta public speaking, kepemimpinan, manajemen acara, analisis data, dan kemampuan berbahasa Inggris. Saya juga memiliki minat di bidang UI/UX Designer, Business Development, Project Management, serta Systems dan Data Analyst.",
    Github: "https://github.com/rskhxzz",
    Instagram: "https://instagram.com/raasikh.fiy",
  },
  {
    Image: Images2,
    Name: "Muhammad Wildanu Staifen",
    Position: "Front-End Developer",
    Description:
      "Hai, saya Muhammad Wildanu Staifen  mahasiswa  di Universitas AMIKOM Yogyakarta . Saya memiliki ketertarikan  pengembangan front-end dengan HTML, CSS, JavaScript maupun library atau framework lain. Saya terus belajar dan beradaptasi dengan teknologi terbaru . Selain itu, saya juga memiliki pemahaman tentang Express.js dan database MySQL serta PostgreSQL. Saya sangat tertarik untuk terlibat dalam berbagai dan terus mengembangkan kemampuan saya di bidang pengembangan web.",
    Github: "https://github.com/wildanre",
    Instagram: "https://instagram.com/threadripper_000",
  },
  {
    Image: Images3,
    Name: "Muhammad Zulvan",
    Position: "Front-End Developer",
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel diam vel ipsum condimentum feugiat non vel turpis. Nulla facilisi. Donec vel justo vel velit consectetur facilisis.",
    Github: "https://github.com/zulfanmiz_",
    Instagram: "https://instagram.com/zulfanMk",
  },
  {
    Image: Images4,
    Name: "Zainal Azhab",
    Position: "Back-End Developer",
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel diam vel ipsum condimentum feugiat non vel turpis. Nulla facilisi. Donec vel justo vel velit consectetur facilisis.",
    Github: "https://github.com/zainalazhab",
    Instagram: "https://instagram.com/zainalazhab",
  },
];

function AboutCard() {
  useEffect(() => {
    AOS.init({
      duration: 500, 
      once: true,  
    });
  }, []);
  
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="grid grid-cols-1 gap-16 mt-8 max-w-[80vw] xl:max-w-[75vw] min-w-[70vw] mx-auto">
        {aboutCards.map((card, index) => (
          <div
            key={index}
            className={`flex gap-6 
              flex-col 
              sm:flex-row 
              ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
            data-aos={index % 2 === 0 ? 'fade-down-right' : 'fade-down-left'}
          >

            <img
              src={card.Image}
              alt={card.Name}
              className="rounded-lg w-48 h-48 object-cover mx-auto xl:w-96 xl:h-96"
            />

            <div className="font-montserrat sm:text-left text-center">
              <h1 className="text-2xl xl:text-3xl font-bold">{card.Name}</h1>
              <h3 className="text-lg xl:text-2xl font-bold text-[#ae8618] my-4">{card.Position}</h3>
              <p className="text-sm text-justify text-gray-600 md:text-lg">{card.Description}</p>

              <div className="flex justify-center sm:justify-start gap-4 mt-4">
                <a href={card.Github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black">
                  <FaGithub className="text-2xl lg:text-3xl xl:text-4xl" />
                </a>
                <a href={card.Instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                  <FaInstagram className="text-2xl lg:text-3xl xl:text-4xl" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutCard;