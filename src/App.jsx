import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import TopNavbar from "./components/TopNavbar";
import LeadPopup from "./components/LeadPopup";
import Slider from "./components/Slider";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ShowroomPage from "./pages/ShowroomPage";
import TradePage from "./pages/TradePage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AuthPage from "./pages/AuthPage";

// Admin Imports
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";
import AdminUpload from "./admin/AdminUpload";
import AdminOrders from "./admin/AdminOrders";
import AdminContact from "./admin/AdminContact";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import useIdleLogout from "./hooks/useIdleLogout";

import ProtectedRoute from "./admin/ProtectedRoute";

function AppContent() {
  const location = useLocation();

  // Watch for idle admin users (5 minutes timeout)
  useIdleLogout(5);

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <TopNavbar />}
      {!isAdminRoute && <LeadPopup />}

      <main className="flex-1" style={!isAdminRoute ? { paddingTop: "138px" } : {}}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/showrooms" element={<ShowroomPage />} />
          <Route path="/trade" element={<TradePage />} />
          <Route path="/login" element={<AuthPage />} />

          {/* Dynamic Category Route */}
          <Route path="/category/:categoryName" element={<CategoryPage />} />

          {/* Compatibility Redirects */}
          <Route path="/bathroom" element={<CategoryPage />} />
          <Route path="/kitchen" element={<CategoryPage />} />
          <Route path="/livingroom" element={<CategoryPage />} />

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Admin Login Route (Unprotected) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/upload" element={<ProtectedRoute><AdminUpload /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
          <Route path="/admin/contact" element={<ProtectedRoute><AdminContact /></ProtectedRoute>} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
