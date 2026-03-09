import React from "react";
import { HiOutlineBadgeCheck, HiOutlineTruck, HiOutlineGlobe, HiOutlineSparkles } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "2,500+", label: "Tile Designs" },
  { value: "50,000+", label: "Happy Customers" },
  { value: "28", label: "States Served" },
];

const values = [
  {
    Icon: HiOutlineBadgeCheck,
    title: "Premium Quality",
    desc: "Every tile is crafted to international standards, rigorously tested for durability, finish, and aesthetics.",
  },
  {
    Icon: HiOutlineSparkles,
    title: "Innovative Designs",
    desc: "Our design team travels the world to bring you the most on-trend patterns, textures, and color palettes.",
  },
  {
    Icon: HiOutlineTruck,
    title: "Pan India Delivery",
    desc: "Safe, insured shipping across all 28 states. Free delivery on orders above ₹10,000.",
  },
  {
    Icon: HiOutlineGlobe,
    title: "Sustainable Sourcing",
    desc: "We partner with eco-conscious manufacturers who follow responsible mining and production practices.",
  },
];

const team = [
  {
    name: "Rajesh Sharma",
    role: "Founder & CEO",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    name: "Priya Mehta",
    role: "Head of Design",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "Anil Gupta",
    role: "Head of Operations",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Sneha Joshi",
    role: "Customer Experience",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* ─── HERO ─────────────────────────────────── */}
      <section className="relative bg-[#111] text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1400&q=80"
          alt="About MyTiles"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative max-w-4xl mx-auto px-6 py-28 text-center">
          <p className="text-blue-500 text-xs font-black uppercase tracking-[0.3em] mb-4">Our Story</p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            Built on <span className="text-blue-600">Passion</span>,<br />
            Crafted for <span className="text-blue-600">Perfection</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Since 2010, MyTiles has been India's most trusted name in premium tile solutions —
            bringing beauty, durability, and innovation to homes and commercial spaces across the country.
          </p>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────── */}
      <section className="bg-blue-600 py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-black text-white">{s.value}</p>
              <p className="text-orange-100 text-sm font-semibold mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── OUR STORY ────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-blue-600 text-xs font-black uppercase tracking-widest mb-3">Who We Are</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
            India's #1 Destination<br />for Premium Tiles
          </h2>
          <p className="text-gray-500 leading-relaxed mb-4">
            Founded in New Delhi, MyTiles began with a simple idea: everyone deserves a beautiful home.
            Over 15 years later, we've grown into a nationwide brand with over 2,500 tile designs spanning
            kitchens, bathrooms, living rooms, outdoors, and more.
          </p>
          <p className="text-gray-500 leading-relaxed mb-6">
            We work with the world's finest manufacturers in Italy, Spain, and India to bring you tiles
            that are not just beautiful but also incredibly durable and easy to maintain.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-900 text-white px-7 py-3 rounded-none text-sm font-bold hover:bg-blue-600 transition-colors"
          >
            Browse Our Collection →
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <img
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=400&q=80"
            alt="Showroom"
            className="rounded-none w-full aspect-[3/4] object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80"
            alt="Living Room"
            className="rounded-none w-full aspect-[3/4] object-cover mt-8"
          />
        </div>
      </section>

      {/* ─── VALUES ───────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-blue-600 text-xs font-black uppercase tracking-widest text-center mb-3">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-none p-7 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-none flex items-center justify-center mb-5">
                  <Icon className="text-2xl text-blue-600" />
                </div>
                <h3 className="font-black text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-blue-600 text-xs font-black uppercase tracking-widest text-center mb-3">The People</p>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((m) => (
            <div key={m.name} className="text-center group">
              <div className="relative overflow-hidden rounded-none mb-4 aspect-square">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300 rounded-none" />
              </div>
              <p className="font-black text-gray-900 text-sm">{m.name}</p>
              <p className="text-gray-400 text-xs mt-1">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────── */}
      <section className="bg-[#111] text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-5">
            Ready to Transform<br />Your Space?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Browse 2,500+ tiles and find the perfect match for your dream space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-black text-white font-black px-8 py-4 rounded-none transition-all"
            >
              Shop All Tiles
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="border border-white/20 hover:border-white/50 text-white font-bold px-8 py-4 rounded-none transition-all"
            >
              Get Free Consultation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
