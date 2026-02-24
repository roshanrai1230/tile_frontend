import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HiStar, HiOutlineHeart } from "react-icons/hi";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);

        // Backend se full URL aa raha hai
        if (res.data.images && res.data.images.length > 0) {
          setActiveImg(res.data.images[0]);
        } else {
          setActiveImg(res.data.image);
        }
      } catch (err) {
        console.error("Error details:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="loader">Loading...</div>;

  return (
    <div className="product-details-container">
      <div className="breadcrumb">Home &gt; {product.category} &gt; {product.name}</div>

      <div className="main-content-wrapper">
        <div className="gallery-section">
          <div className="thumbnail-stack">
            {product.images && product.images.map((img, i) => (
              <div
                key={i}
                className={`thumb-box ${activeImg === img ? "active-thumb" : ""}`}
                onClick={() => setActiveImg(img)}
              >
                {/* Yahan 'img' hi wo unique URL hai jo backend se aaya hai */}
                <img src={img} alt={`tile-${i}`} />
              </div>
            ))}
          </div>

          <div className="main-image-preview">
            <img src={activeImg} alt={product.name} />
          </div>
        </div>

        <div className="info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="sku">Category: {product.category}</p>
          <div className="rating-row">
            <HiStar /><HiStar /><HiStar /><HiStar /><HiStar /> <span>5.0 (New)</span>
          </div>
          <div className="price-tag">
            ₹{product.priceSqFt}/Sq.Ft <span>Or ₹{product.priceBox}/Box</span>
          </div>
          <div className="options-group">
            <h4>Available Sizes: <span className="size-chip">{product.size}</span></h4>
          </div>
          <div className="description-box">
            <h4>Description</h4>
            <p>{product.description}</p>
          </div>
          <div className="action-buttons">
            <button className="wishlist-btn"><HiOutlineHeart /> Wishlist</button>
            <button className="cart-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;