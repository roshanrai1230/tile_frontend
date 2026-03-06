import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import TopNavbar from "./components/TopNavbar";
import SecondNavbar from "./components/SecondNavbar";
import Slider from "./components/Slider";
import Footer from "./components/Footer";
import LeadFormModal from "./components/LeadFormModal";
import ShopByRoom from "./components/ShopByRoom";
import BrandTrust from "./components/BrandTrust";
import FeaturedProducts from "./components/FeaturedProducts";
import TilesCategory from "./pages/TilesCategory";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";


// Admin
import AdminDashboard from "./admin/AdminDashboard";
import AdminUpload from "./admin/AdminUpload";
import AdminOrders from "./admin/AdminOrders";
import AdminContact from "./admin/AdminContact";

import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}


function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      <LeadFormModal />
      <header className="sticky top-0 z-[1000] w-full shadow-sm">
        <TopNavbar />
        <SecondNavbar />
      </header>

      <main className="flex-1">
        <Routes>
          {/* Home Page: Yahan Sab Sections dikhenge */}
          <Route path="/" element={
            <>
              <Slider />
              <TilesCategory />
              <ShopByRoom />
              <BrandTrust />
              <FeaturedProducts />
            </>
          } />

          {/* Dynamic Category Route */}
          <Route path="/category/:categoryName" element={<CategoryPage />} />

          {/* Compatibility Redirects (Optional if we update navs) */}
          <Route path="/bathroom" element={<CategoryPage />} />
          <Route path="/kitchen" element={<CategoryPage />} />
          <Route path="/livingroom" element={<CategoryPage />} />

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />



          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/upload" element={<AdminUpload />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/contact" element={<AdminContact />} />
        </Routes>
      </main>

      {!isAdminPath && <Footer />}
    </div>
  );
}



export default App;
