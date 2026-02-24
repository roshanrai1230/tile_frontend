import React, { useState, useEffect, useRef } from "react";
import "./Slider.css";

const slides = [
  { id: 1, image: "https://content.iconworldoftile.com/content/slider/slider-7.jpg", title: "Slide 1" },
  { id: 2, image: "https://i0.wp.com/wp.tilemountain.co.uk/wp-content/uploads/2019/07/03-TileMountain_3160326_PalatinaWhiteGlossTiles.jpg?resize=1000%2C667&ssl=1", title: "Slide 2" },
  { id: 3, image: "https://www.roccia.com/cdn/shop/collections/Kitchen_Floor_Tile_1_1_67d4a759-2470-4e44-beab-ce35aea7e54c.jpg?v=1754469575", title: "Slide 3" },
  { id: 4, image: "https://www.roccia.com/cdn/shop/files/Cianni_Residence_-_Kitchen_Banner.jpg?v=1727103735&width=1100", title: "Slide 4" },
];

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider" ref={slideRef}>
      <div
        className="slider-inner"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div className="slide" key={slide.id}>
            <img src={slide.image} alt={slide.title} />
            <div className="caption">{slide.title}</div>
          </div>
        ))}
      </div>

      <button className="prev" onClick={prevSlide} aria-label="Previous Slide">
        &#10094;
      </button>
      <button className="next" onClick={nextSlide} aria-label="Next Slide">
        &#10095;
      </button>

      <div className="dots">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;