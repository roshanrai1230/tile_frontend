import React from "react";
import { useNavigate } from "react-router-dom";
import "./TilesCategory.css";

import bathroomImg from "../assets/images/bathroom.webp";
import kitchenImg from "../assets/images/kitchen.webp";
import livingroomImg from "../assets/images/livingroom.webp";
import bedroomImg from "../assets/images/bedroom.webp";
import outdoorImg from "../assets/images/outdoor.webp";
import commercialImg from "../assets/images/commercial.webp";

const categories = [
  { name: "BATHROOM", link: "/bathroom", image: bathroomImg },
  { name: "KITCHEN", link: "/kitchen", image: kitchenImg },
  { name: "LIVING ROOM", link: "/livingroom", image: livingroomImg },
  { name: "BEDROOM", link: "/bedroom", image: bedroomImg },
  { name: "OUTDOOR", link: "/outdoor", image: outdoorImg },
  { name: "COMMERCIAL SPACES", link: "/commercial", image: commercialImg },
];

function TilesCategory() {
  const navigate = useNavigate();

  return (
    <section className="category-section">
      <div className="category-header">
        <h2>Find Tiles by Category</h2>
        <p>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nulla amet recusandae, soluta corrupti sequi veritatis? Explicabo incidunt hic architecto.
        </p>
      </div>

      <div className="tiles-grid">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="tile-card"
            onClick={() => navigate(cat.link)}
          >
            <div className="tile-image-wrapper">
              <img src={cat.image} alt={cat.name} />
            </div>
            <h3 className="tile-title">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TilesCategory;