import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineSearch,
  HiOutlineUser,
  HiOutlineShoppingCart,
  HiOutlineHeart,
  HiMenu,
  HiX,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const announcements = [
  "🚚 Free Shipping on Orders Over ₹5,000",
  "✨ New Collection: Luxury Marble Series — Shop Now",
  "🎨 Schedule a Free Virtual Design Consultation",
];

const navLinks = [
  { name: "All Tiles", link: "/" },
  { name: "Floor", link: "/category/FLOOR" },
  { name: "Wall", link: "/category/WALL" },
  { name: "Bathroom", link: "/category/BATHROOM" },
  { name: "Kitchen", link: "/category/KITCHEN" },
  { name: "Living Room", link: "/category/LIVING ROOM" },
  { name: "Outdoor", link: "/category/OUTDOOR" },
  { name: "Parking", link: "/category/PARKING" },
  { name: "Ceramic", link: "/category/CERAMIC" },
  { name: "Stone", link: "/category/STONE" },
];

function TopNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  // Scroll hide/show announcement bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 60) {
        setShowAnnouncement(false);
      } else {
        setShowAnnouncement(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate announcements
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const prevAnnouncement = () =>
    setAnnouncementIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  const nextAnnouncement = () =>
    setAnnouncementIndex((prev) => (prev + 1) % announcements.length);

  return (
    <header className="w-full font-sans fixed top-0 left-0 z-[1000]">
      {/* === ANNOUNCEMENT BAR === */}
      <div
        className="announcement-bar"
        style={{
          maxHeight: showAnnouncement ? "44px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
          background: "#1b3a4b",
        }}
      >
        <div className="flex items-center justify-center gap-3 py-2.5 px-4 relative">
          <button
            onClick={prevAnnouncement}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <HiChevronLeft className="text-lg" />
          </button>
          <span
            key={announcementIndex}
            className="text-white text-xs font-semibold tracking-widest uppercase text-center announcement-text"
          >
            {announcements[announcementIndex]}
          </span>
          <button
            onClick={nextAnnouncement}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <HiChevronRight className="text-lg" />
          </button>
        </div>
      </div>

      {/* === MAIN HEADER === */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-[64px] gap-6">

          {/* Logo */}
          <Link to="/" className="shrink-0 no-underline flex items-center gap-1">
            <span className="text-2xl font-black tracking-tighter text-gray-900">
              my<span className="text-orange-500">tiles</span>
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-[420px] relative">
            <input
              type="text"
              placeholder="Search tiles, styles, rooms..."
              className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-sm text-sm outline-none bg-gray-50 focus:bg-white focus:border-gray-500 transition-all"
            />
            <HiOutlineSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            <div className="relative">
              {user ? (
                <div 
                  className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 text-sm transition-colors cursor-pointer"
                  onMouseEnter={() => setProfileOpen(true)}
                  onMouseLeave={() => setProfileOpen(false)}
                >
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-bold">{user.name?.split(' ')[0] || 'User'}</span>
                  
                  {/* Profile Dropdown */}
                  {profileOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl w-48 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100 mb-2">
                        <p className="text-xs text-gray-500">Signed in as</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                      </div>
                      <button 
                        onClick={() => { logout(); setProfileOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 font-semibold hover:bg-red-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 text-sm transition-colors no-underline">
                  <HiOutlineUser className="text-xl" />
                  <span className="text-xs font-medium">Account</span>
                </Link>
              )}
            </div>

            <button className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 text-sm transition-colors">
              <HiOutlineHeart className="text-xl" />
              <span className="text-xs font-medium">Wishlist</span>
            </button>

            <Link
              to="/cart"
              className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 no-underline relative transition-colors"
            >
              <div className="relative">
                <HiOutlineShoppingCart className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-bold px-1 py-0.5 rounded-full leading-none min-w-[17px] text-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">Cart</span>
            </Link>
          </div>

          {/* Mobile: Search + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-700 text-2xl"
            >
              <HiOutlineSearch />
            </button>
            <Link to="/cart" className="relative text-gray-700 text-2xl no-underline">
              <HiOutlineShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold px-1 rounded-full leading-tight min-w-[16px] text-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="text-gray-700 text-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3 pt-1 bg-white">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tiles..."
                className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-sm text-sm outline-none bg-gray-50 focus:bg-white focus:border-gray-500"
                autoFocus
              />
              <HiOutlineSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* === CATEGORY NAV BAR === */}
      <div className="bg-white border-b border-gray-200 hidden md:block">
        <div className="max-w-[1400px] mx-auto px-6">
          <ul className="flex gap-0 list-none m-0 p-0 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
            {navLinks.map((item, i) => (
              <li key={i} className="shrink-0">
                <Link
                  to={item.link}
                  className="inline-block px-4 py-3 text-[13px] font-semibold text-gray-700 uppercase tracking-wide no-underline hover:text-orange-500 hover:border-b-2 hover:border-orange-500 transition-all duration-150 whitespace-nowrap border-b-2 border-transparent"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {/* Right side links like TileBar */}
            <li className="ml-auto shrink-0">
              <Link to="/showrooms" className="inline-block px-4 py-3 text-[13px] font-semibold text-gray-600 no-underline hover:text-gray-900 whitespace-nowrap border-b-2 border-transparent hover:border-gray-400 transition-all">
                Showrooms
              </Link>
            </li>
            <li className="shrink-0">
              <Link to="/trade" className="inline-block px-4 py-3 text-[13px] font-semibold text-gray-600 no-underline hover:text-gray-900 whitespace-nowrap border-b-2 border-transparent hover:border-gray-400 transition-all">
                Trade
              </Link>
            </li>
            <li className="shrink-0">
              <Link to="/about" className="inline-block px-4 py-3 text-[13px] font-semibold text-gray-600 no-underline hover:text-gray-900 whitespace-nowrap border-b-2 border-transparent hover:border-gray-400 transition-all">
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* === MOBILE DRAWER === */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[1500]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-[2000] shadow-2xl transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link to="/" className="text-xl font-black tracking-tighter text-gray-900 no-underline" onClick={() => setIsMenuOpen(false)}>
            my<span className="text-orange-500">tiles</span>
          </Link>
          <button onClick={() => setIsMenuOpen(false)} className="text-2xl text-gray-600">
            <HiX />
          </button>
        </div>
        <ul className="list-none m-0 p-0">
          {navLinks.map((item, i) => (
            <li key={i} className="border-b border-gray-100">
              <Link
                to={item.link}
                className="block px-6 py-4 text-gray-800 font-semibold text-sm no-underline hover:text-orange-500 hover:bg-orange-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li className="border-b border-gray-100">
            <a href="#" className="block px-6 py-4 text-gray-800 font-semibold text-sm no-underline hover:text-orange-500 hover:bg-orange-50 transition-colors">
              Login / Register
            </a>
          </li>
        </ul>
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .announcement-text {
          animation: fadeSlide 0.4s ease;
        }
      `}</style>
    </header>
  );
}

export default TopNavbar;