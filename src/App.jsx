import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNavbar from "./components/TopNavbar";
import SecondNavbar from "./components/SecondNavbar";
import Slider from "./components/Slider";
import Footer from "./components/Footer";
import TilesCategory from "./pages/TilesCategory";
import Bathroom from "./pages/Bathroom";
import Kitchen from "./pages/Kitchen";
import LivingRoom from "./pages/LivingRoom";
import ProductDetails from "./pages/ProductDetails";

// Admin
import AdminDashboard from "./admin/AdminDashboard";
import AdminUpload from "./admin/AdminUpload";
import AdminOrders from "./admin/AdminOrders";
import AdminContact from "./admin/AdminContact";

function App() {
  return (
    <Router>
      <TopNavbar />
      <SecondNavbar />

      <Routes>
        {/* Home Page: Yahan Slider aur Categories dono dikhenge */}
        <Route path="/" element={
          <>
            <Slider />
            <TilesCategory />
          </>
        } />
        <Route path="/bathroom" element={<Bathroom />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/livingroom" element={<LivingRoom />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/kitchen" element={<div>Kitchen Page</div>} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/upload" element={<AdminUpload />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/contact" element={<AdminContact />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;