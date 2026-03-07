import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineMail,
  HiOutlineDotsVertical,
  HiOutlinePlus
} from "react-icons/hi";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const API = "http://localhost:5000";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/api/products/all`)
      .then((res) => {
        setProducts(res.data?.products || res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const stats = [
    { label: "Total Products", value: products.length, icon: <HiOutlineCube />, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "New Orders", value: "12", icon: <HiOutlineShoppingCart />, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Unread Inquiries", value: "5", icon: <HiOutlineMail />, color: "text-green-500", bg: "bg-green-50" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      {/* Main Content Area — Offset by Sidebar width (256px = w-64) */}
      <main className="flex-1 ml-64 p-8 md:p-10 max-h-screen overflow-y-auto">
        
        {/* Header */}
        <AdminHeader 
          title="Dashboard Overview" 
          subtitle="Welcome back, here's what's happening today." 
          action={
            <button
              onClick={() => navigate("/admin/upload")}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm hover:shadow active:scale-95"
            >
              <HiOutlinePlus className="text-lg text-orange-400" /> Add Product
            </button>
          }
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-5">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-1">{stat.label}</h3>
                <p className="text-3xl font-black text-slate-800 leading-none">
                  {loading ? "—" : stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Products Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Recently Added Products</h2>
            <button onClick={() => navigate("/admin/upload")} className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 uppercase text-[11px] tracking-wider">Product</th>
                  <th className="px-6 py-4 uppercase text-[11px] tracking-wider">Category</th>
                  <th className="px-6 py-4 uppercase text-[11px] tracking-wider">Price (Sq.Ft)</th>
                  <th className="px-6 py-4 uppercase text-[11px] tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.slice(0, 5).map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.images?.[0] || "https://via.placeholder.com/50"}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover bg-slate-100"
                        />
                        <span className="font-bold text-slate-700">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 uppercase tracking-wide">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      ${item.priceSqFt?.toFixed(2) || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                        <HiOutlineDotsVertical className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
                {!loading && products.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                      No products found. Start by adding one!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;