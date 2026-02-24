import React from "react";
import AdminSidebar from "./AdminSidebar";

const AdminContact = () => {
  const messages = [
    { id: 1, name: "Suresh", email: "suresh@mail.com", msg: "Bulk order discount milega?" },
    { id: 2, name: "Priya", email: "priya@mail.com", msg: "Sample tiles chahiye." },
  ];

  return (
    <div className="flex h-[calc(100vh-140px)] bg-[#f4f7f6] overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Fixed Header Section */}
        <header className="p-10 pb-6 shrink-0">
          <h1 className="text-2xl font-bold text-gray-800">Contact Inquiries</h1>
        </header>

        {/* Scrollable Body Section */}
        <div className="flex-1 overflow-y-auto px-10 pb-10">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Name", "Email", "Message", "Action"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-gray-500 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {messages.map(m => (
                  <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-800">{m.name}</td>
                    <td className="px-5 py-3 text-gray-500">{m.email}</td>
                    <td className="px-5 py-3 text-gray-600">{m.msg}</td>
                    <td className="px-5 py-3">
                      <button className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors">
                        Reply
                      </button>
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

export default AdminContact;