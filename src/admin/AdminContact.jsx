import React from "react";
import AdminSidebar from "./AdminSidebar";

const AdminContact = () => {
  const messages = [
    { id: 1, name: "Suresh", email: "suresh@mail.com", msg: "Bulk order discount milega?" },
    { id: 2, name: "Priya", email: "priya@mail.com", msg: "Sample tiles chahiye." },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main-content">
        <h1>Contact Inquiries</h1>
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(m => (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{m.email}</td>
                  <td>{m.msg}</td>
                  <td><button className="edit-icon">Reply</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminContact;