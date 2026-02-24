import React from "react";
import { useNavigate } from "react-router-dom";

import bathroomImg from "../assets/images/bathroom.webp";
import kitchenImg from "../assets/images/kitchen.webp";
import livingroomImg from "../assets/images/livingroom.webp";
import bedroomImg from "../assets/images/bedroom.webp";
import outdoorImg from "../assets/images/outdoor.webp";
import commercialImg from "../assets/images/commercial.webp";

const categories = [
  { name: "BATHROOM", link: "/category/BATHROOM", image: bathroomImg },
  { name: "KITCHEN", link: "/category/KITCHEN", image: kitchenImg },
  { name: "LIVING ROOM", link: "/category/LIVING ROOM", image: livingroomImg },
  { name: "BEDROOM", link: "/category/BEDROOM", image: bedroomImg },
  { name: "OUTDOOR", link: "/category/OUTDOOR", image: outdoorImg },
  { name: "COMMERCIAL SPACES", link: "/category/COMMERCIAL", image: commercialImg },
];

function TilesCategory() {
  const navigate = useNavigate();

  return (
    <section className="py-12 px-4 max-w-[1250px] mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Find Tiles by Category</h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nulla amet recusandae,
          soluta corrupti sequi veritatis? Explicabo incidunt hic architecto.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="cursor-pointer group text-center"
            onClick={() => navigate(cat.link)}
          >
            <div className="overflow-hidden rounded-xl aspect-square mb-3">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h3 className="text-sm font-bold text-gray-700 tracking-wide">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TilesCategory;