import React from "react";
import AdminSidebar from "./AdminSidebar";

const AdminOrders = () => {
  const orders = [
    { id: "#101", customer: "Rahul Kumar", product: "Ceramic Yellow", status: "Pending", total: "₹5,400" },
    { id: "#102", customer: "Amit Singh", product: "Grey Stone", status: "Shipped", total: "₹12,000" },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main-content">
        <h1>Customer Orders</h1>
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>{order.total}</td>
                  <td><span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;