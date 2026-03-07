import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "https://content.iconworldoftile.com/content/slider/slider-7.jpg",
    title: "Luxury Marble Mastery",
    subtitle: "Experience the elegance of premium large-format marble tiles.",
    btnText: "Explore Collection"
  },
  {
    id: 2,
    image: "https://i0.wp.com/wp.tilemountain.co.uk/wp-content/uploads/2019/07/03-TileMountain_3160326_PalatinaWhiteGlossTiles.jpg?resize=1000%2C667&ssl=1",
    title: "Timeless White Gloss",
    subtitle: "Brighten your space with our signature Palatina collection.",
    btnText: "Shop Now"
  },
  {
    id: 3,
    image: "https://www.roccia.com/cdn/shop/collections/Kitchen_Floor_Tile_1_1_67d4a759-2470-4e44-beab-ce35aea7e54c.jpg?v=1754469575",
    title: "Designer Kitchen Concepts",
    subtitle: "Stunning floors and backsplashes for the modern home.",
    btnText: "Get Inspired"
  },
  {
    id: 4,
    image: "https://www.roccia.com/cdn/shop/files/Cianni_Residence_-_Kitchen_Banner.jpg?v=1727103735&width=1100",
    title: "Architectural Excellence",
    subtitle: "Premium wood-look planks for a warm, natural feel.",
    btnText: "View Details"
  },
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
    <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl mb-12 uppercase tracking-tight">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full relative h-[70vh]">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover block select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-20">
              <div className="max-w-2xl text-white">
                <motion.h2
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  key={`t-${currentIndex}`}
                  className="text-6xl font-black mb-4 leading-tight"
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  key={`s-${currentIndex}`}
                  className="text-xl mb-8 text-gray-200"
                >
                  {slide.subtitle}
                </motion.p>
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  key={`b-${currentIndex}`}
                  className="px-10 py-4 bg-orange-500 text-white font-black rounded-lg hover:bg-white hover:text-[#1a1a1a] transition-all text-sm tracking-widest shadow-xl"
                >
                  {slide.btnText}
                </motion.button>
              </div>
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