import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-5 mt-12 font-sans">
      <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_2fr] gap-10">

        {/* Section 1: Brand */}
        <div>
          <h2 className="text-3xl font-bold tracking-widest mb-5">
            Mytile<span className="text-orange-500">.</span>
          </h2>
          <p className="text-gray-400 leading-relaxed text-sm">
            India's No. 1 tile company. We provide premium quality wall and floor tiles
            with world-class designs for your dream spaces.
          </p>
          <div className="flex gap-4 mt-5">
            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 bg-[#333] rounded-full flex items-center justify-center text-white hover:bg-orange-500 transition-colors duration-300"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-8 relative after:absolute after:left-0 after:-bottom-2 after:w-10 after:h-0.5 after:bg-orange-500">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[["Home", "/"], ["About Us", "/about"], ["Contact", "/contact"], ["Careers", "/career"]].map(([label, href]) => (
              <li key={href}>
                <a href={href} className="text-gray-400 text-sm hover:text-orange-500 hover:pl-1.5 transition-all duration-300 no-underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-8 relative after:absolute after:left-0 after:-bottom-2 after:w-10 after:h-0.5 after:bg-orange-500">
            Categories
          </h3>
          <ul className="space-y-3">
            {[["Bathroom", "/bathroom"], ["Kitchen", "/kitchen"], ["Living Room", "/livingroom"], ["Outdoor", "/outdoor"]].map(([label, href]) => (
              <li key={href}>
                <a href={href} className="text-gray-400 text-sm hover:text-orange-500 hover:pl-1.5 transition-all duration-300 no-underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4: Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-8 relative after:absolute after:left-0 after:-bottom-2 after:w-10 after:h-0.5 after:bg-orange-500">
            Contact Us
          </h3>
          <p className="text-gray-400 text-sm mb-1">Toll Free: 1800-123-4567</p>
          <p className="text-gray-400 text-sm mb-4">Email: info@kajaria.com</p>
          <div className="flex mt-4">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 px-3 py-2.5 border-0 rounded-l outline-none text-gray-800"
            />
            <button className="px-4 py-2.5 bg-orange-500 text-white rounded-r border-0 cursor-pointer hover:bg-orange-600 transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-12 pt-5 border-t border-[#333] text-xs text-gray-500">
        <p>© 2024 Mytile. All Rights Reserved. | Designed with ❤️</p>
      </div>
    </footer>
  );
};

export default Footer;