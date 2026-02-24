import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineSearch, HiOutlineUser, HiOutlineShoppingCart, HiMenu, HiX } from "react-icons/hi";
import "./Navbar.css";

function TopNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar-wrapper">
      {/* Upper Bar (Desktop only) */}
      <div className="top-bar desktop-only">
        <div className="container">
          <div className="top-bar-links">
            <a href="#">Blog</a>
            <a href="#">Inspiration</a>
            <a href="#">Store Locator</a>
          </div>
          <div className="top-bar-contact">Toll Free: 1800-123-4567</div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="container header-content">
          {/* Logo */}
          <div className="logo">
            <Link to="/">MY<span>TILES</span></Link>
          </div>

          {/* Desktop Search */}
          <div className="search-container desktop-only">
            <input type="text" placeholder="Search for tiles..." />
            <HiOutlineSearch className="s-icon" />
          </div>

          {/* Icons & Hamburger */}
          <div className="header-actions">
            <div className="action-item desktop-only">
              <HiOutlineUser />
              <span>Login</span>
            </div>
            <div className="action-item">
              <HiOutlineShoppingCart />
              <span className="cart-count">1</span>
            </div>
            {/* Mobile Menu Toggle */}
            <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <HiX /> : <HiMenu />}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (Only on Mobile) */}
      <div className="mobile-search-bar mobile-only">
        <div className="container">
          <input type="text" placeholder="Search for tiles..." />
          <HiOutlineSearch className="s-icon" />
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav ${isMenuOpen ? "active" : ""}`}>
        <ul className="mobile-nav-links">
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><a href="#">Floor Tiles</a></li>
          <li><a href="#">Wall Tiles</a></li>
          <li><a href="#">Bathroom</a></li>
          <li><a href="#">Kitchen</a></li>
          <li><a href="#">Login / Register</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default TopNavbar;