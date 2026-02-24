
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Bathroom.css";

function Bathroom() {
  const [products, setProducts] = useState([]); // Database se data yahan aayega
  const navigate = useNavigate();

  useEffect(() => {
    // Database se data lene ka function
    const fetchBathroomTiles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/all");
        // 🔥 Yahan filter lagayenge: Sirf wo tiles jo BATHROOM category ki hain
        const filtered = res.data.filter(tile => tile.category === "BATHROOM");
        setProducts(filtered);
      } catch (err) {
        console.error("Data laane mein error:", err);
      }
    };
    fetchBathroomTiles();
  }, []);

  return (
    <div className="bathroom-page container">
      <h2 className="page-title">Bathroom Tiles Collection</h2>
      <div className="product-grid">
        {products.map((item) => (
          <div 
            key={item._id} // MongoDB ki ID '_id' hoti hai
            className="p-card" 
            onClick={() => navigate(`/product/${item._id}`)} // Click par detail page
          >
            <div className="p-img">
              <img src={item.images && item.images[0]} alt={item.name} />
            </div>
            <div className="p-info">
              <h3>{item.name}</h3>
              <p className="p-size">{item.size}</p>
              <p className="p-price">
                ₹{item.priceSqFt}/Sq.Ft <span>Or ₹{item.priceBox}/Box</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bathroom;