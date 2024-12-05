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
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 gap-16 mt-8 max-w-[70vw]">
        {aboutCards.map((card, index) => (
          <div
            key={index}
            // Gunakan flex-row-reverse untuk index ke-2 dan ke-4
            className={`flex gap-6 ${
              index % 2 !== 0 ? "flex-row-reverse " : "flex-row "
            }`}
          >
            {/* Gambar */}
            <img
              src={card.Image}
              alt={card.Name}
              className="rounded-lg w-96 h-96 object-cover"
            />
            {/* Konten Teks */}
            <div>
              <h1 className="text-4xl font-bold">{card.Name}</h1>
              <h3 className="text-2xl font-bold text-gray-700 my-4">{card.Position}</h3>
              <p className="text-gray-600 text-lg   ">{card.Description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutCard;
