import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LivingRoom() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLivingRoomTiles = async () => {
      try {
        const res = await axios.get("https://tile-backend-n9ps.onrender.com/api/products/all");
        const filtered = res.data.filter(tile => tile.category === "LIVING ROOM");
        setProducts(filtered);
      } catch (err) {
        console.error("Data laane mein error:", err);
      }
    };
    fetchLivingRoomTiles();
  }, []);

  return (
    <div className="max-w-[1250px] mx-auto px-4 py-10">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">Living Room Tiles Collection</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-100 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            onClick={() => navigate(`/product/${item._id}`)}
          >
            <div>
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-1 truncate">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{item.size}</p>
              <p className="text-base font-bold text-orange-500">
                ₹{item.priceSqFt}/Sq.Ft
                <span className="block text-xs text-gray-400 font-normal mt-0.5">Or ₹{item.priceBox}/Box</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LivingRoom;