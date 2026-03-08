import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { HiOutlineAdjustments, HiChevronDown, HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";

// ─── Style Chips ───────────────────────────────────────
const styleChips = [
  { label: "New Arrivals", color: "#e8c4a0" },
  { label: "Subway", color: "#d9d5ce" },
  { label: "Marble & Natural Stone", color: "#c5c0b8" },
  { label: "Warm Colors", color: "#d4a573" },
  { label: "Handmade Look", color: "#a8c5b8" },
  { label: "Stone Look", color: "#9ba8a0" },
];

// ─── Categories ───────────────────────────────────────
const categories = [
  { label: "All", value: null },
  { label: "Bathroom", value: "BATHROOM" },
  { label: "Kitchen", value: "KITCHEN" },
  { label: "Living Room", value: "LIVING ROOM" },
  { label: "Bedroom", value: "BEDROOM" },
  { label: "Floor", value: "FLOOR" },
  { label: "Wall", value: "WALL" },
  { label: "Outdoor", value: "OUTDOOR" },
  { label: "Parking", value: "PARKING" },
];

// ─── Filter options ────────────────────────────────────
const filterOptions = {
  Size: ['12x12"', '24x24"', '12x24"', '18x18"', '6x6"', '3x6"'],
  Finish: ["Matte", "Glossy", "Polished", "Textured", "Satin"],
  "Sort By": ["Price: Low to High", "Price: High to Low", "Newest First", "Most Popular"],
};

// ─── Hero Slides ───────────────────────────────────────
const heroSlides = [
  {
    image: "https://www.roccia.com/cdn/shop/files/Cianni_Residence_-_Kitchen_Banner.jpg?v=1727103735&width=1100",
    tag: "New Collection",
    title: "DESIGN STARTS",
    highlight: "HERE",
    desc: "Find stunning designs with these trend-first collections. Browse a curated selection of our finishes and looks.",
    link: "/category/FLOOR",
  },
  {
    image: "https://i0.wp.com/wp.tilemountain.co.uk/wp-content/uploads/2019/07/03-TileMountain_3160326_PalatinaWhiteGlossTiles.jpg?resize=1000%2C667&ssl=1",
    tag: "Wall Collection",
    title: "ELEVATE YOUR",
    highlight: "WALLS",
    desc: "Explore our premium wall tile range — from sleek subway tiles to textured stone finishes.",
    link: "/category/WALL",
  },
  {
    image: "https://www.roccia.com/cdn/shop/collections/Kitchen_Floor_Tile_1_1_67d4a759-2470-4e44-beab-ce35aea7e54c.jpg?v=1754469575",
    tag: "Kitchen Special",
    title: "KITCHEN",
    highlight: "PERFECTION",
    desc: "Our kitchen tile collections blend style and durability — designed to last a lifetime.",
    link: "/category/KITCHEN",
  },
  {
    image: "https://content.iconworldoftile.com/content/slider/slider-7.jpg",
    tag: "Outdoor Range",
    title: "BEYOND THE",
    highlight: "INTERIOR",
    desc: "Durable tiles for outdoor spaces. Weather-resistant and beautifully designed.",
    link: "/category/OUTDOOR",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChip, setActiveChip] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [openFilter, setOpenFilter] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  const [sortBy, setSortBy] = useState("Newest First");
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);

  // Products fetch
  useEffect(() => {
    axios
      .get('https://tile-backend-6xtp.onrender.com/api/products/all')
      .then((res) => {
        setProducts(res.data?.products || res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filtered products
  let filteredProducts = [...products];

  // 1. Category Filter
  if (activeCategory) {
    filteredProducts = filteredProducts.filter(p => p.category?.toUpperCase() === activeCategory);
  }

  // 2. Style Chip Filter (Bonus)
  if (activeChip) {
    filteredProducts = filteredProducts.filter(p => {
        const searchStr = `${p.name} ${p.description || ""}`.toLowerCase();
        return searchStr.includes(activeChip.toLowerCase().split(' ')[0]);
    });
  }

  // 3. Dropdown Filters (Size, Finish)
  Object.entries(activeFilters).forEach(([key, filterValue]) => {
    if (key === "Size") {
      filteredProducts = filteredProducts.filter(p => {
        // filterValue from dropdown usually has quotes e.g. '12x12"'
        // Backend sizes usually look like '12x12"' or '12x12" '
        const val = filterValue.trim().toLowerCase();
        const strippedVal = val.replace(/["\s]/g, '');

        if (p.sizes && Array.isArray(p.sizes)) {
          return p.sizes.some(s => {
            const cleanS = s.toLowerCase().trim();
            return cleanS.includes(val) || cleanS.replace(/["\s]/g, '').includes(strippedVal);
          });
        }
        if (p.size) {
            const cleanS = p.size.toLowerCase().trim();
            return cleanS.includes(val) || cleanS.replace(/["\s]/g, '').includes(strippedVal);
        }
        return false;
      });
    } else if (key === "Finish") {
      filteredProducts = filteredProducts.filter(p => {
        const val = filterValue.toLowerCase().trim();
        // Check exact finish property if it exists
        if (p.finish && p.finish.toLowerCase().includes(val)) return true;
        
        // Otherwise search within name and description
        const searchStr = `${p.name || ''} ${p.description || ''}`.toLowerCase();
        return searchStr.includes(val);
      });
    }
  });

  // 4. Sort By
  if (sortBy === "Price: Low to High") {
    filteredProducts.sort((a, b) => (a.priceSqFt || 0) - (b.priceSqFt || 0));
  } else if (sortBy === "Price: High to Low") {
    filteredProducts.sort((a, b) => (b.priceSqFt || 0) - (a.priceSqFt || 0));
  } else if (sortBy === "Newest First") {
    filteredProducts.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }

  // Auto-rotate hero every 4 seconds with fade
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroVisible(false);
      setTimeout(() => {
        setHeroIndex((prev) => (prev + 1) % heroSlides.length);
        setHeroVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (idx) => {
    setHeroVisible(false);
    setTimeout(() => {
      setHeroIndex(idx);
      setHeroVisible(true);
    }, 300);
  };

  const prevHero = () => goToSlide((heroIndex - 1 + heroSlides.length) % heroSlides.length);
  const nextHero = () => goToSlide((heroIndex + 1) % heroSlides.length);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The announcement bar hides after 60px.
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const clearFilter = (key) => {
    const updated = { ...activeFilters };
    delete updated[key];
    setActiveFilters(updated);
  };

  const activeFilterCount = Object.keys(activeFilters).length;
  const slide = heroSlides[heroIndex];

  return (
    <div className="bg-white min-h-screen">

      {/* ══════════════════════════════════════════ */}
      {/* HERO BANNER — AUTO-ROTATING CAROUSEL      */}
      {/* ══════════════════════════════════════════ */}
      <section className="relative mx-4 md:mx-8 mt-4 rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[280px] md:min-h-[340px] bg-[#f5f0ea]">

        {/* Left — Text (fade transition) */}
        <div
          className="flex-1 flex flex-col justify-center px-8 md:px-14 py-10 z-10 transition-opacity duration-400"
          style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.4s ease" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">
            {slide.tag}
          </p>
          <h1 className="text-4xl md:text-5xl font-black leading-tight text-gray-900 mb-4">
            {slide.title}
            <br />
            <span className="text-orange-500">{slide.highlight}</span>
          </h1>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-6">
            {slide.desc}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(slide.link)}
              className="px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-sm hover:bg-gray-700 transition-colors tracking-wide"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2.5 border border-gray-400 text-gray-700 text-sm font-bold rounded-sm hover:bg-gray-100 transition-colors tracking-wide"
            >
              View All
            </button>
          </div>

          {/* Dots */}
          <div className="flex gap-2 mt-6">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === heroIndex
                    ? "w-6 h-2 bg-gray-900"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right — Hero Image (fade transition) */}
        <div className="w-full md:w-[42%] relative">
          <img
            key={heroIndex}
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover min-h-[220px]"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />
          {/* overlay fade left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f5f0ea] via-[#f5f0ea]/30 to-transparent hidden md:block" />
        </div>

        {/* Prev / Next Arrows */}
        <button
          onClick={prevHero}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-1.5 shadow z-20 transition-all"
        >
          <HiChevronLeft className="text-xl" />
        </button>
        <button
          onClick={nextHero}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-1.5 shadow z-20 transition-all md:right-auto md:left-[56%]"
        >
          <HiChevronRight className="text-xl" />
        </button>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* STYLE CHIPS                               */}
      {/* ══════════════════════════════════════════ */}
      <section className="mt-8 px-4 md:px-8">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {styleChips.map((chip) => (
            <button
              key={chip.label}
              onClick={() => setActiveChip(activeChip === chip.label ? null : chip.label)}
              className={`shrink-0 flex flex-col items-center gap-2 focus:outline-none group transition-all`}
            >
              <div
                className={`w-16 h-16 rounded-lg transition-all duration-200 ${
                  activeChip === chip.label
                    ? "ring-2 ring-gray-900 ring-offset-2 scale-105"
                    : "hover:scale-105"
                }`}
                style={{ backgroundColor: chip.color }}
              />
              <span
                className={`text-[11px] font-semibold whitespace-nowrap transition-colors ${
                  activeChip === chip.label ? "text-gray-900" : "text-gray-500 group-hover:text-gray-800"
                }`}
              >
                {chip.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* EXPLORE TOP CATEGORIES (SLIDER)           */}
      {/* ══════════════════════════════════════════ */}
      <section className="mt-14 px-4 md:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black tracking-widest uppercase text-gray-900">Explore Top Categories</h2>
          <p className="text-gray-400 text-sm mt-2">The materials and finishes you're looking for.</p>
        </div>

        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => document.getElementById('cat-slider').scrollBy({ left: -320, behavior: 'smooth' })}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white border border-gray-200 shadow-lg rounded-full p-2.5 hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100"
          >
            <HiChevronLeft className="text-xl text-gray-700" />
          </button>

          {/* Slider */}
          <div
            id="cat-slider"
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden scroll-smooth"
          >
            {[
              { label: "Kitchen", image: "https://www.roccia.com/cdn/shop/files/Cianni_Residence_-_Kitchen_Banner.jpg?v=1727103735&width=800", value: "KITCHEN" },
              { label: "Bathroom & Shower", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80", value: "BATHROOM" },
              { label: "Wall Tile", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80", value: "WALL" },
              { label: "Floor Tile", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", value: "FLOOR" },
              { label: "Living Room", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", value: "LIVING ROOM" },
              { label: "Outdoor", image: "https://images.unsplash.com/photo-1558002038-1055907ede4d?w=600&q=80", value: "OUTDOOR" },
              { label: "Bedroom", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80", value: "BEDROOM" },
              { label: "Parking", image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=600&q=80", value: "PARKING" },
            ].map((cat) => (
              <button
                key={cat.label}
                onClick={() => {
                  setActiveCategory(cat.value);
                  document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="relative shrink-0 w-[220px] md:w-[260px] aspect-[3/4] rounded-xl group/card overflow-hidden bg-gray-100"
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent group-hover/card:from-black/60 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="text-white text-xs font-black uppercase tracking-widest drop-shadow-lg">{cat.label}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => document.getElementById('cat-slider').scrollBy({ left: 320, behavior: 'smooth' })}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white border border-gray-200 shadow-lg rounded-full p-2.5 hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100"
          >
            <HiChevronRight className="text-xl text-gray-700" />
          </button>
        </div>
      </section>


      {/* ══════════════════════════════════════════ */}
      {/* CATEGORY PILLS                            */}
      {/* ══════════════════════════════════════════ */}
      <section className="mt-8 px-4 md:px-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.value)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                activeCategory === cat.value
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>


      <section 
        className="mt-6 px-4 md:px-8 border-y border-gray-200 py-3 sticky bg-white z-[100] transition-all duration-300"
        style={{ top: isScrolled ? "108px" : "152px" }}
      >
        {/* Changed from overflow-x-auto to flex-wrap to prevent clipping absolute dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter buttons */}
          {Object.keys(filterOptions).filter(k => k !== "Sort By").map((key) => (
            <div key={key} className="relative shrink-0">
              <button
                onClick={() => setOpenFilter(openFilter === key ? null : key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-xs font-semibold transition-colors ${
                  activeFilters[key]
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-300 text-gray-600 hover:border-gray-500 bg-white"
                }`}
              >
                {key}
                {activeFilters[key] ? (
                  <span className="ml-1 text-[10px] bg-white/20 rounded-full px-1">{activeFilters[key]}</span>
                ) : (
                  <HiChevronDown className="text-sm" />
                )}
              </button>
              {/* Dropdown */}
              {openFilter === key && (
                <div className="absolute top-[calc(100%+4px)] left-0 bg-white border border-gray-200 rounded-xl shadow-xl z-[200] min-w-[160px] py-2">
                  {filterOptions[key].map((opt) => (
                    <button
                      key={opt}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveFilters({ ...activeFilters, [key]: opt });
                        setOpenFilter(null);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors ${
                        activeFilters[key] === opt ? "font-bold text-orange-600 bg-orange-50" : "text-gray-700"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* All Filters */}
          <button className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full text-xs font-semibold text-gray-600 hover:border-gray-500 bg-white transition-colors">
            <HiOutlineAdjustments className="text-sm" />
            All Filters
            {activeFilterCount > 0 && (
              <span className="ml-0.5 bg-orange-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort By */}
          <div className="ml-auto shrink-0 relative">
            <button
              onClick={() => setOpenFilter(openFilter === "Sort By" ? null : "Sort By")}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full text-xs font-semibold text-gray-600 hover:border-gray-500 bg-white transition-colors"
            >
              Sort: {sortBy}
              <HiChevronDown className="text-sm" />
            </button>
            {openFilter === "Sort By" && (
              <div className="absolute top-[calc(100%+4px)] right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-[200] min-w-[180px] py-2">
                {filterOptions["Sort By"].map((opt) => (
                  <button
                    key={opt}
                    onClick={(e) => { 
                      e.stopPropagation();
                      setSortBy(opt); 
                      setOpenFilter(null); 
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors ${
                      sortBy === opt ? "font-bold text-orange-600 bg-orange-50" : "text-gray-700"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active Filter Pills */}
        {activeFilterCount > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {Object.entries(activeFilters).map(([key, val]) => (
              <span
                key={key}
                className="flex items-center gap-1.5 bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full border border-orange-200"
              >
                {key}: {val}
                <button onClick={() => clearFilter(key)} className="hover:text-orange-900">
                  <HiX className="text-xs" />
                </button>
              </span>
            ))}
            <button
              onClick={() => setActiveFilters({})}
              className="text-xs text-gray-500 underline hover:text-gray-800"
            >
              Clear all
            </button>
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* PRODUCTS GRID                             */}
      {/* ══════════════════════════════════════════ */}
      <section className="px-4 md:px-8 py-6">
        {/* Count */}
        {!loading && (
          <p className="text-sm text-gray-500 mb-4 font-medium">
            <span className="font-bold text-gray-800">{filteredProducts.length}</span> results
            {activeCategory && <span className="text-orange-500 font-bold"> · {activeCategory}</span>}
          </p>
        )}

        {loading ? (
          /* Skeleton Loader */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-gray-100 animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-8 bg-gray-200 rounded mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg font-semibold">No products in this category</p>
            <p className="text-gray-400 text-sm mt-1">Try selecting a different category</p>
            <button onClick={() => setActiveCategory(null)} className="mt-4 px-6 py-2 bg-gray-900 text-white text-sm font-bold rounded-full">Show All</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Click outside to close filter dropdowns */}
      {openFilter && (
        <div
          className="fixed inset-0 z-[100]"
          onClick={() => setOpenFilter(null)}
        />
      )}
    </div>
  );
}
