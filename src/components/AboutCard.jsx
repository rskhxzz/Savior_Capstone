import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Images1 from "../assets/images/grid-images/1.png";

const aboutCards = [
  {
    Image: Images1,
    Name: "M Rasikh Fi Ilmi",
    Position: "Project Manager",
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel diam vel ipsum condimentum feugiat non vel turpis. Nulla facilisi. Donec vel justo vel velit consectetur facilisis.",
  },
  {
    Image: Images1,
    Name: "Muhammad Wildanu Staifen",
    Position: "Front-End Developer",
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel diam vel ipsum condimentum feugiat non vel turpis. Nulla facilisi. Donec vel justo vel velit consectetur facilisis.",
  },
  {
    Image: Images1,
    Name: "Muhammad Zulvan",
    Position: "Front-End Developer",
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel diam vel ipsum condimentum feugiat non vel turpis. Nulla facilisi. Donec vel justo vel velit consectetur facilisis.",
  },
  {
    Image: Images1,
    Name: "Zainal Azhab",
    Position: "Back-End Developer",
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel diam vel ipsum condimentum feugiat non vel turpis. Nulla facilisi. Donec vel justo vel velit consectetur facilisis.",
  },
];

function AboutCard() {
  useEffect(() => {
    AOS.init({
      duration: 500, // Durasi animasi dalam milidetik
      once: false,   // Animasi hanya berjalan sekali
    });
  }, []);
  
  return (
    <div className="xl:flex flex-col justify-center items-center ">
      <div className="grid grid-cols-1 gap-16 mt-8 max-w-[70vw]">
        {aboutCards.map((card, index) => (
          <div
            key={index}
            className={`flex gap-6 
              flex-col 
              sm:flex-row 
              ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
            data-aos={index % 2 === 0 ? 'fade-down-right' : 'fade-down-left'}
          >
            {/* Gambar */}
            <img
              src={card.Image}
              alt={card.Name}
              className="rounded-lg w-48 h-48 object-cover mx-auto xl:w-96 xl:h-96"
            />
            {/* Konten Teks */}
            <div className="sm:text-left text-center">
              <h1 className="text-2xl xl:text-3xl font-bold">{card.Name}</h1>
              <h3 className="text-lg xl:text-2xl font-bold text-gray-700 my-4">{card.Position}</h3>
              <p className="text-sm text-gray-600 md:text-lg">{card.Description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutCard;

