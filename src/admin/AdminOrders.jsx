import React from "react";
import AdminSidebar from "./AdminSidebar";

const AdminOrders = () => {
  const orders = [
    { id: "#101", customer: "Rahul Kumar", product: "Ceramic Yellow", status: "Pending", total: "₹5,400" },
    { id: "#102", customer: "Amit Singh", product: "Grey Stone", status: "Shipped", total: "₹12,000" },
  ];

  const statusStyle = {
    Pending: "bg-yellow-100 text-yellow-700",
    Shipped: "bg-green-100 text-green-700",
  };

  return (
    <div className="flex h-[calc(100vh-140px)] bg-[#f4f7f6] overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Fixed Header Section */}
        <header className="p-10 pb-6 shrink-0">
          <h1 className="text-2xl font-bold text-gray-800">Customer Orders</h1>
        </header>

        {/* Scrollable Body Section */}
        <div className="flex-1 overflow-y-auto px-10 pb-10">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Order ID", "Customer", "Product", "Total", "Status"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-gray-500 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-3 font-semibold text-gray-700">{order.id}</td>
                    <td className="px-5 py-3 text-gray-600">{order.customer}</td>
                    <td className="px-5 py-3 text-gray-600">{order.product}</td>
                    <td className="px-5 py-3 font-semibold text-orange-500">{order.total}</td>
                    <td className="px-5 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyle[order.status] || "bg-gray-100 text-gray-600"}`}>
                        {order.status}
                      </span>
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

export default AdminOrders;