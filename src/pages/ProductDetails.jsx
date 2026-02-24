import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { HiStar, HiOutlineHeart, HiCheckCircle, HiOutlineInformationCircle } from "react-icons/hi";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        if (res.data.images && res.data.images.length > 0) {
          setActiveImg(res.data.images[0]);
        } else {
          setActiveImg(res.data.image);
        }

        if (res.data.sizes && res.data.sizes.length > 0) {
          setSelectedSize(res.data.sizes[0]);
        } else if (res.data.size) {
          setSelectedSize(res.data.size);
        }

        if (res.data.colors && res.data.colors.length > 0) {
          setSelectedColor(res.data.colors[0]);
        }
      } catch (err) {
        console.error("Error details:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    navigate("/cart");
  };

  if (!product) return (
    <div className="flex items-center justify-center min-h-[50vh] text-gray-500 text-lg font-bold animate-pulse">
      Loading Premium Tiles...
    </div>
  );

  return (
    <div className="max-w-[1250px] mx-auto px-4 py-8 relative">
      {/* Custom Toast Notification */}
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-gray-900 text-white px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border border-gray-800">
            <HiCheckCircle className="text-orange-500 text-2xl" />
            <div className="flex flex-col">
              <span className="font-black text-sm uppercase tracking-wider italic">Added to Cart!</span>
              <span className="text-[10px] text-gray-400 font-bold">Checkout now or add more variants.</span>
            </div>
            <button
              onClick={() => navigate("/cart")}
              className="ml-2 bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-black px-4 py-2 rounded-xl transition-all uppercase tracking-widest"
            >
              View Cart
            </button>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <span className="hover:text-orange-500 cursor-pointer transition-colors" onClick={() => navigate("/")}>Home</span>
        <span className="text-xs">&gt;</span>
        <span className="hover:text-orange-500 cursor-pointer transition-colors capitalize">{product.category?.toLowerCase()}</span>
        <span className="text-xs">&gt;</span>
        <span className="text-gray-900 font-bold">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Gallery Section */}
        <div className="flex gap-4 lg:w-1/2">
          <div className="flex flex-col gap-3 w-20 shrink-0">
            {product.images && product.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImg(img)}
                className={`w-full aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${activeImg === img ? "border-orange-500" : "border-gray-200 hover:border-orange-300"
                  }`}
              >
                <img src={img} alt={`tile-${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="flex-1 rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white">
            <img src={activeImg} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
          </div>
        </div>

        {/* Info Section */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-2 leading-tight uppercase tracking-tighter italic">{product.name}</h1>
            <div className="flex items-center gap-4">
              <span className="bg-gray-900 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest italic">{product.category}</span>
              <div className="flex items-center gap-1 text-orange-400 text-xs text-sm">
                <HiStar /><HiStar /><HiStar /><HiStar /><HiStar />
                <span className="text-gray-400 font-bold ml-1">5.0 (PREMIUM)</span>
              </div>
            </div>
          </div>

          {/* Variants Tip Box */}
          <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-start gap-3">
            <HiOutlineInformationCircle className="text-blue-500 text-xl shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-700 leading-relaxed font-bold italic">
              <span className="uppercase text-blue-900 block mb-0.5 tracking-widest">Multi-Variant Guide:</span>
              To purchase different sizes or colors, select your first choice and click "Add to Cart", then repeat for others.
            </p>
          </div>

          <div className="bg-orange-50/50 border border-orange-100 p-5 rounded-3xl">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-orange-600 italic tracking-tighter">₹{product.priceSqFt}</span>
              <span className="text-sm font-bold text-orange-400 uppercase tracking-widest">/ Sq.Ft</span>
            </div>
            {product.priceBox && (
              <div className="text-xs text-gray-500 font-bold mt-1 uppercase tracking-tight">
                Or <span className="text-gray-900 font-black">₹{product.priceBox}</span> per Box
              </div>
            )}
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider flex items-center gap-2">
                Choose Color
                <span className="text-[10px] text-gray-400 font-black bg-gray-100 px-2 rounded-full py-0.5 italic">{selectedColor}</span>
              </h4>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black border-2 transition-all uppercase tracking-tighter ${selectedColor === color
                      ? "border-orange-500 bg-orange-600 text-white shadow-lg shadow-orange-200"
                      : "border-gray-100 bg-white text-gray-400 hover:border-orange-200 hover:text-orange-500"
                      }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full border border-black/10`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Select Size</h4>
            <div className="flex flex-wrap gap-2">
              {product.sizes && product.sizes.length > 0 ? (
                product.sizes.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(s)}
                    className={`px-5 py-2 rounded-xl text-xs font-black border-2 transition-all uppercase tracking-tighter ${selectedSize === s
                      ? "border-orange-500 bg-white text-orange-600 shadow-md"
                      : "border-gray-100 bg-white text-gray-400 hover:border-orange-200 hover:text-orange-500"
                      }`}
                  >
                    {s}
                  </button>
                ))
              ) : (
                <span className="px-5 py-2 rounded-xl text-xs font-black border-2 border-orange-500 bg-white text-orange-600 shadow-md uppercase tracking-tighter">
                  {product.size || "Standard"}
                </span>
              )}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Quantity</h4>
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-gray-100 rounded-2xl p-1 bg-gray-50/50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm text-xl font-bold transition-all disabled:opacity-30"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <div className="w-12 text-center font-black text-gray-900">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm text-xl font-bold transition-all"
                >
                  +
                </button>
              </div>
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest italic">Boxes / Pieces</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
            <h4 className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest italic tracking-wider">Description</h4>
            <p className="text-sm text-gray-500 leading-relaxed italic line-clamp-4">{product.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button className="flex items-center justify-center w-14 h-14 border-2 border-gray-100 rounded-2xl text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm">
              <HiOutlineHeart className="text-2xl" />
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 border-2 border-orange-500 text-orange-600 font-black py-4 rounded-2xl hover:bg-orange-50 transition-all uppercase tracking-widest text-xs shadow-sm hover:shadow-orange-100"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-orange-950/20 uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98]"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;