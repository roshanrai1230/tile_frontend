import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineTemplate, HiOutlineShoppingBag, HiOutlineInboxIn, HiOutlineViewGridAdd, HiOutlineLogout } from "react-icons/hi";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <HiOutlineTemplate />, path: "/admin" },
    { name: "Orders", icon: <HiOutlineShoppingBag />, path: "/admin/orders" },
    { name: "Products", icon: <HiOutlineViewGridAdd />, path: "/admin/upload" },
    { name: "Inquiries", icon: <HiOutlineInboxIn />, path: "/admin/contact" },
  ];

  return (
    <div className="flex flex-col w-64 h-screen bg-slate-900 border-r border-slate-800 text-slate-300 fixed left-0 top-0 z-50">
      
      {/* Brand Logo */}
      <div className="flex items-center justify-center h-20 border-b border-slate-800/60 mb-6">
        <Link to="/" className="text-2xl font-black tracking-wider text-white">
          MY<span className="text-orange-500">TILES</span>
          <span className="block text-[10px] text-slate-500 tracking-[0.2em] font-medium text-center -mt-1 uppercase">Admin Panel</span>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto scrollbar-none">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                isActive 
                  ? "bg-slate-800 text-orange-400 shadow-sm" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              }`}
            >
              <div className={`text-xl transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                {item.icon}
              </div>
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-800/60">
        <button 
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group"
        >
          <HiOutlineLogout className="text-xl group-hover:-translate-x-1 transition-transform" />
          Back to Store
        </button>
      </div>

    </div>
  );
};

export default AdminSidebar;