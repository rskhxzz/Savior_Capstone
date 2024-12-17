import { Carousel } from "flowbite-react";
import { Slide1, Slide2 } from "./Slides";

function Steps() {
  return (
    <div className="bg-white my-12 h-[100vh] md:[80vh] xl:h-[65vh] overflow-hidden">
      <Carousel className="min-w-[60vw] max-w-[80vw] mx-auto md:max-w-[60vw]">
        <Slide1 />
        <Slide2 />
      </Carousel>
    </div>
  );
}

export default Steps;
