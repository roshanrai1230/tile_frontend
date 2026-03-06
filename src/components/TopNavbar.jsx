import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineSearch, HiOutlineUser, HiOutlineShoppingCart, HiOutlineHeart, HiMenu, HiX } from "react-icons/hi";
import { useCart } from "../context/CartContext";

function TopNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();


  return (
    <nav className="w-full font-sans">
      {/* Upper Bar — Desktop only */}
      <div className="hidden md:block bg-gray-100 border-b border-gray-200 text-xs py-2">
        <div className="max-w-[1250px] mx-auto px-4 flex justify-between">
          <div className="flex gap-4">
            <a href="#" className="text-gray-500 hover:text-gray-700">Blog</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Inspiration</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Store Locator</a>
          </div>
          <div className="text-gray-500">Toll Free: 1800-123-4567</div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-100 py-4">

        <div className="max-w-[1250px] mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link to="/" className="text-2xl font-bold tracking-tight text-gray-900 no-underline">
              MY<span className="text-orange-500">TILES</span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex relative flex-[0_1_40%]">
            <input
              type="text"
              placeholder="Search for tiles..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded outline-none focus:border-orange-400"
            />
            <HiOutlineSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <div className="hidden md:flex flex-col items-center text-xs cursor-pointer group">
              <HiOutlineUser className="text-xl group-hover:text-orange-500 transition-colors" />
              <span>Login</span>
            </div>

            <div className="hidden md:flex flex-col items-center text-xs cursor-pointer group">
              <HiOutlineHeart className="text-xl group-hover:text-orange-500 transition-colors" />
              <span>Wishlist</span>
            </div>

            <Link to="/cart" className="flex flex-col items-center text-xs cursor-pointer relative no-underline text-gray-900 group">
              <HiOutlineShoppingCart className="text-xl group-hover:text-orange-500 transition-colors" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full leading-none min-w-[18px] text-center">
                  {cartCount}
                </span>
              )}
            </Link>


            {/* Hamburger — Mobile only */}
            <div
              className="md:hidden text-3xl cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <HiX /> : <HiMenu />}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden bg-white border-b border-gray-100 px-4 py-2.5 relative">
        <input
          type="text"
          placeholder="Search for tiles..."
          className="w-full px-4 py-2 border border-gray-300 rounded outline-none"
        />
        <HiOutlineSearch className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-[2000] shadow-xl pt-16 transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <ul className="list-none">
          <li className="px-6 py-4 border-b border-gray-100">
            <Link to="/" className="text-gray-800 font-bold no-underline" onClick={() => setIsMenuOpen(false)}>Home</Link>
          </li>
          <li className="px-6 py-4 border-b border-gray-100"><a href="#" className="text-gray-800 font-bold no-underline">Floor Tiles</a></li>
          <li className="px-6 py-4 border-b border-gray-100"><a href="#" className="text-gray-800 font-bold no-underline">Wall Tiles</a></li>
          <li className="px-6 py-4 border-b border-gray-100"><a href="#" className="text-gray-800 font-bold no-underline">Bathroom</a></li>
          <li className="px-6 py-4 border-b border-gray-100"><a href="#" className="text-gray-800 font-bold no-underline">Kitchen</a></li>
          <li className="px-6 py-4 border-b border-gray-100"><a href="#" className="text-gray-800 font-bold no-underline">Login / Register</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default TopNavbar;