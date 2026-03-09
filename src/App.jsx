import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
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

          {/* Catch-all 404 */}
          <Route path="*" element={<div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
            <h1 className="text-9xl font-black text-blue-600/10 absolute select-none">404</h1>
            <h2 className="text-4xl font-black text-gray-900 mb-4 relative">Lost in Space?</h2>
            <p className="text-gray-500 max-w-md mb-8 relative">The page you're looking for doesn't exist. Let's get you back to the premium collections.</p>
            <Link to="/" className="px-8 py-3 bg-blue-600 text-white font-black rounded-none shadow-xl hover:bg-black transition-all relative">Back to Home</Link>
          </div>} />
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
