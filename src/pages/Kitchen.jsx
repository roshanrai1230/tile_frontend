import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Bathroom.css"; // same styling reuse kar rahe hain

function Kitchen() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKitchenTiles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/all");

        // 🔥 Sirf KITCHEN category filter
        const filtered = res.data.filter(
          tile => tile.category === "KITCHEN"
        );

        setProducts(filtered);
      } catch (err) {
        console.error("Data laane mein error:", err);
      }
    };

    fetchKitchenTiles();
  }, []);

  return (
    <div className="bathroom-page container">
      <h2 className="page-title">Kitchen Tiles Collection</h2>

      <div className="product-grid">
        {products.map((item) => (
          <div
            key={item._id}
            className="p-card"
            onClick={() => navigate(`/product/${item._id}`)}
          >
            <div className="p-img">
              <img
                src={item.images?.[0]}
                alt={item.name}
              />
            </div>

            <div className="p-info">
              <h3>{item.name}</h3>
              <p className="p-size">{item.size}</p>
              <p className="p-price">
                ₹{item.priceSqFt}/Sq.Ft
                <span> Or ₹{item.priceBox}/Box</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kitchen;