import axios from 'axios';
import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./Admin.css";

function AdminUpload() {
  const [product, setProduct] = useState({
    name: "",
    size: "300x300mm",
    priceSqFt: "",
    priceBox: "",
    category: "BATHROOM",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [previews, setPreviews] = useState([]);

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    // Saare fields append ho rahe hain
    Object.keys(product).forEach(key => data.append(key, product[key]));
    
    if (images.length > 0) {
      images.forEach((file) => data.append('images', file));
    }
    if (video) data.append('video', video);

    try {
      await axios.post('http://localhost:5000/api/products/add', data);
      alert("Success! Product Uploaded.");
      window.location.reload();
    } catch (error) {
      alert("Server Error!");
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main-content">
        <div className="admin-card">
          <h2>Upload New Product</h2>
          <form onSubmit={handleSubmit} className="upload-form">
            <div className="form-group">
              <label>Product Name</label>
              <input type="text" name="name" value={product.name} onChange={handleInputChange} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Size</label>
                <input type="text" name="size" value={product.size} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={product.category} onChange={handleInputChange} required>
                  <option value="BATHROOM">BATHROOM</option>
                  <option value="KITCHEN">KITCHEN</option>
                  <option value="LIVING ROOM">LIVING ROOM</option>
                  <option value="BEDROOM">BEDROOM</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price (₹/Sq.Ft)</label>
                <input type="number" name="priceSqFt" value={product.priceSqFt} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Price (₹/Box)</label>
                <input type="number" name="priceBox" value={product.priceBox} onChange={handleInputChange} />
              </div>
            </div>

            <div className="form-group">
              <label>Select Images (Multiple)</label>
              <input type="file" multiple accept="image/*" onChange={handleImageChange} />
              <div className="preview-container">
                {previews.map((url, i) => (
                  <img key={i} src={url} alt="preview" className="img-preview-thumb" />
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea name="description" rows="3" value={product.description} onChange={handleInputChange}></textarea>
            </div>

            <button type="submit" className="upload-btn">Publish Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AdminUpload;