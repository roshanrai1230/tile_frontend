import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  HiOutlineViewGrid, 
  HiOutlineShoppingCart, 
  HiOutlineMail, 
  HiOutlineCloudUpload,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash 
} from "react-icons/hi";
import "./Admin.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Mock Data
  const [products, setProducts] = useState([
    { id: 1, name: "Ceramic Yellow Moroccan", price: "128", category: "Bathroom", size: "300x300mm" },
  ]);

  return (
    <div className="admin-layout">
      {/* LEFT SIDEBAR */}
      <div className="admin-sidebar">
        <div className="sidebar-logo">MYTILES <span>Admin</span></div>
        <ul className="sidebar-links">
          <li className="active" onClick={() => navigate("/admin")}>
            <HiOutlineViewGrid /> Dashboard
          </li>
          <li onClick={() => navigate("/admin/orders")}>
            <HiOutlineShoppingCart /> Orders
          </li>
          <li onClick={() => navigate("/admin/contact")}>
            <HiOutlineMail /> Contact Inquiries
          </li>
          <li onClick={() => navigate("/admin/upload")}>
            <HiOutlineCloudUpload /> Product Upload
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="admin-main-content">
        <div className="dashboard-header">
          <h1>Dashboard Overview</h1>
          <button className="add-btn" onClick={() => navigate("/admin/upload")}>
            <HiOutlinePlus /> Add New Product
          </button>
        </div>

        <div className="stats-cards">
          <div className="stat-box"><h3>Total Products</h3><p>{products.length}</p></div>
          <div className="stat-box"><h3>New Orders</h3><p>12</p></div>
          <div className="stat-box"><h3>Messages</h3><p>5</p></div>
        </div>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id}>
                  <td><img src="https://via.placeholder.com/50" alt="product" className="admin-thumb" /></td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <div className="action-btns">
                      <button className="edit-icon"><HiOutlinePencil /></button>
                      <button className="delete-icon"><HiOutlineTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;