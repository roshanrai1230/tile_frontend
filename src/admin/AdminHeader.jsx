import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HiOutlineBell, HiOutlineSearch, HiOutlineLogout } from "react-icons/hi";

const AdminHeader = ({ title, subtitle, action }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      navigate("/admin/login");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-5 mb-8 -mx-8 md:-mx-10 md:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Page Title & Subtitle */}
      <div className="flex-1">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-1 font-medium">{subtitle}</p>}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-64 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all shadow-sm"
          />
          <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-slate-700 transition-colors">
          <HiOutlineBell className="text-2xl" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Vertical Divider */}
        <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

        {/* Profile & Logout */}
        <div className="flex items-center gap-4 cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 leading-none">Admin User</p>
            <p className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wide">Super Admin</p>
          </div>
          <img 
            src="https://ui-avatars.com/api/?name=Admin+User&background=f97316&color=fff&bold=true" 
            alt="Admin Profile" 
            className="w-10 h-10 rounded-none border-2 border-white shadow-sm ring-2 ring-transparent hover:ring-blue-600/30 transition-all"
          />
          
          <button 
            onClick={handleLogout}
            title="Logout"
            className="flex items-center justify-center px-4 h-10 ml-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 font-bold text-sm tracking-wide hover:text-red-600 transition-colors shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
