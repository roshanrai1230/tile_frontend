import React from "react";
import "./Footer.css";
// Icons ke liye aap react-icons use kar sakte hain ya simple text
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section 1: Brand/About */}
        <div className="footer-section about">
          <h2 className="footer-logo">Mytile<span>.</span></h2>
          <p>
            India's No. 1 tile company. We provide premium quality wall and floor tiles 
            with world-class designs for your dream spaces.
          </p>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Section 2: Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/career">Careers</a></li>
          </ul>
        </div>

        {/* Section 3: Categories */}
        <div className="footer-section links">
          <h3>Categories</h3>
          <ul>
            <li><a href="/bathroom">Bathroom</a></li>
            <li><a href="/kitchen">Kitchen</a></li>
            <li><a href="/livingroom">Living Room</a></li>
            <li><a href="/outdoor">Outdoor</a></li>
          </ul>
        </div>

        {/* Section 4: Newsletter/Contact */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Toll Free: 1800-123-4567</p>
          <p>Email: info@kajaria.com</p>
          <div className="newsletter">
            <input type="email" placeholder="Your Email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Mytile. All Rights Reserved. | Designed with ❤️</p>
      </div>
    </footer>
  );
};

export default Footer;