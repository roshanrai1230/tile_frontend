import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiOutlineViewGrid, HiOutlineShoppingCart, HiOutlineMail, HiOutlineCloudUpload } from "react-icons/hi";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <HiOutlineViewGrid />, path: "/admin" },
    { name: "Orders", icon: <HiOutlineShoppingCart />, path: "/admin/orders" },
    { name: "Inquiries", icon: <HiOutlineMail />, path: "/admin/contact" },
    { name: "Upload", icon: <HiOutlineCloudUpload />, path: "/admin/upload" },
  ];

  return (
    <div className="admin-sidebar">
      <div className="sidebar-logo">MYTILES <span>Admin</span></div>
      <ul className="sidebar-links">
        {menuItems.map((item) => (
          <li 
            key={item.path} 
            className={location.pathname === item.path ? "active" : ""} 
            onClick={() => navigate(item.path)}
          >
            {item.icon} {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;