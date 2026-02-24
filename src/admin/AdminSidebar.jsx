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
    <div className="w-64 bg-[#1a2a3a] text-white h-full shrink-0 py-5">

      <div className="px-6 pb-7 border-b border-[#2c3e50] text-xl font-bold text-orange-400">
        MYTILES <span className="text-sm text-white font-normal">Admin</span>
      </div>
      <ul className="list-none py-5">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-4 px-6 py-4 text-sm cursor-pointer transition-all duration-300 text-[#bdc3c7] hover:bg-[#2c3e50] hover:text-orange-400 hover:border-l-4 hover:border-orange-400 ${isActive ? "bg-[#2c3e50] text-orange-400 border-l-4 border-orange-400" : "border-l-4 border-transparent"
                }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminSidebar;