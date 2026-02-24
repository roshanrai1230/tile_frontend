import React, { useState, useEffect } from "react";

const slides = [
  { id: 1, image: "https://content.iconworldoftile.com/content/slider/slider-7.jpg", title: "Slide 1" },
  { id: 2, image: "https://i0.wp.com/wp.tilemountain.co.uk/wp-content/uploads/2019/07/03-TileMountain_3160326_PalatinaWhiteGlossTiles.jpg?resize=1000%2C667&ssl=1", title: "Slide 2" },
  { id: 3, image: "https://www.roccia.com/cdn/shop/collections/Kitchen_Floor_Tile_1_1_67d4a759-2470-4e44-beab-ce35aea7e54c.jpg?v=1754469575", title: "Slide 3" },
  { id: 4, image: "https://www.roccia.com/cdn/shop/files/Cianni_Residence_-_Kitchen_Banner.jpg?v=1727103735&width=1100", title: "Slide 4" },
];

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full my-2.5 overflow-hidden rounded-lg">
      {/* Slides track */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[60vh] object-cover block rounded-lg select-none"
            />
            <div className="absolute bottom-3 left-5 text-white bg-black/50 px-4 py-2 rounded text-base md:text-sm">
              {slide.title}
            </div>
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/80 text-white text-3xl md:text-2xl px-3 py-2 rounded-full border-0 cursor-pointer z-10 transition-colors duration-300 select-none"
      >
        &#10094;
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/80 text-white text-3xl md:text-2xl px-3 py-2 rounded-full border-0 cursor-pointer z-10 transition-colors duration-300 select-none"
      >
        &#10095;
      </button>

      {/* Dots */}
      <div className="text-center py-4">
        {slides.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`inline-block w-3 h-3 mx-1.5 rounded-full cursor-pointer transition-colors duration-300 ${idx === currentIndex ? "bg-gray-600" : "bg-gray-300"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;