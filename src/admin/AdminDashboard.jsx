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
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([
    { id: 1, name: "Ceramic Yellow Moroccan", price: "128", category: "Bathroom", size: "300x300mm" },
  ]);

  return (
    <div className="flex h-[calc(100vh-140px)] bg-[#f4f7f6] overflow-hidden">
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Fixed HeaderSection */}
        <header className="p-10 pb-6 shrink-0">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
            <button
              onClick={() => navigate("/admin/upload")}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
            >
              <HiOutlinePlus className="text-lg" /> Add New Product
            </button>
          </div>
        </header>

        {/* Scrollable Body Section */}
        <div className="flex-1 overflow-y-auto px-10 pb-10">
          {/* Stats Cards */}
          <div className="flex gap-5 mb-8">
            {[
              { label: "Total Products", value: products.length },
              { label: "New Orders", value: 12 },
              { label: "Messages", value: 5 },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg p-6 flex-1 shadow-sm">
                <h3 className="text-sm text-gray-400 mb-2">{stat.label}</h3>
                <p className="text-3xl font-bold text-[#2c3e50]">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Product Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Image", "Product Name", "Category", "Price", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-gray-500 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <img
                        src="https://via.placeholder.com/50"
                        alt="product"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-800">{item.name}</td>
                    <td className="px-5 py-3 text-gray-500">{item.category}</td>
                    <td className="px-5 py-3 font-semibold text-orange-500">₹{item.price}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                          <HiOutlinePencil />
                        </button>
                        <button className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors">
                          <HiOutlineTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;