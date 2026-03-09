import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiArrowRight } from "react-icons/hi";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#111111] text-white mt-16 font-sans">

      {/* Top Banner */}
      <div className="bg-blue-600 py-4 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white font-bold text-sm tracking-wide text-center">
            🏠 India's No.1 Premium Tile Brand — Free Delivery on Orders Above ₹10,000
          </p>
          <a href="/contact" className="shrink-0 bg-white text-blue-600 font-black text-xs px-5 py-2 rounded-none hover:bg-blue-50 transition-colors">
            Get a Free Quote →
          </a>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand Column */}
        <div className="lg:col-span-1">
          <h2 className="text-3xl font-black tracking-tight mb-4">
            My<span className="text-blue-600">Tiles</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Premium quality wall and floor tiles with world-class designs. Transforming your dream spaces since 2010.
          </p>

          {/* Contact Info */}
          <div className="space-y-2.5 mb-6">
            <p className="flex items-center gap-2.5 text-gray-400 text-sm">
              <HiOutlinePhone className="text-blue-600 shrink-0 text-base" />
              1800-123-4567 (Toll Free)
            </p>
            <p className="flex items-center gap-2.5 text-gray-400 text-sm">
              <HiOutlineMail className="text-blue-600 shrink-0 text-base" />
              info@mytiles.com
            </p>
            <p className="flex items-center gap-2.5 text-gray-400 text-sm">
              <HiOutlineLocationMarker className="text-blue-600 shrink-0 text-base" />
              New Delhi, India — 110001
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {[
              { Icon: FaFacebookF, href: "#" },
              { Icon: FaInstagram, href: "#" },
              { Icon: FaTwitter, href: "#" },
              { Icon: FaLinkedinIn, href: "#" },
              { Icon: FaYoutube, href: "#" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-9 h-9 bg-white/5 border border-white/10 rounded-none flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300"
              >
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-white mb-5 pb-2 border-b border-white/10">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              ["Home", "/"],
              ["About Us", "/about"],
              ["Products", "/products"],
              ["Contact", "/contact"],
              ["Careers", "/careers"],
              ["Admin Panel", "/admin/login"],
            ].map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-gray-400 text-sm hover:text-blue-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 group"
                >
                  <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200">
                    <HiArrowRight className="text-blue-400 text-xs" />
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-white mb-5 pb-2 border-b border-white/10">
            Categories
          </h3>
          <ul className="space-y-3">
            {[
              ["Bathroom Tiles", "/"],
              ["Kitchen Tiles", "/"],
              ["Living Room", "/"],
              ["Floor Tiles", "/"],
              ["Wall Tiles", "/"],
              ["Outdoor & Parking", "/"],
              ["Bedroom Tiles", "/"],
            ].map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-gray-400 text-sm hover:text-blue-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 group"
                >
                  <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200">
                    <HiArrowRight className="text-blue-400 text-xs" />
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-white mb-5 pb-2 border-b border-white/10">
            Stay Updated
          </h3>
          <p className="text-gray-400 text-sm mb-5 leading-relaxed">
            Subscribe for the latest tile collections, design inspiration and exclusive offers.
          </p>

          {subscribed ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-none p-4 text-center">
              <p className="text-green-400 font-bold text-sm">✓ You're subscribed!</p>
              <p className="text-green-400/70 text-xs mt-1">Thanks for joining MyTiles.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-base" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-none text-sm text-white placeholder:text-gray-600 outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-none text-sm transition-colors flex items-center justify-center gap-2"
              >
                Subscribe Now
                <HiArrowRight />
              </button>
            </form>
          )}

          {/* Trust Badges */}
          <div className="mt-6 flex gap-3 flex-wrap">
            {["ISO Certified", "100% Original", "Pan India Delivery"].map((badge) => (
              <span key={badge} className="text-[10px] font-bold text-gray-500 bg-white/5 border border-white/10 px-2.5 py-1 rounded-none uppercase tracking-wider">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8 px-6 py-5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600 text-center">
            © 2025 MyTiles. All Rights Reserved. Crafted with ❤️ in India.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((link) => (
              <a key={link} href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;