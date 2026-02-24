import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HiOutlineShoppingCart } from "react-icons/hi";

function ProductCard({ product }) {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.stopPropagation(); // Prevent navigating to details
        addToCart(product, 1, null, null); // Pass default quantity, size, and color
        // Optional: show a small toast or visual feedback
    };

    const handleBuyNow = (e) => {
        e.stopPropagation();
        addToCart(product, 1, null, null);
        alert("Product added! Going to Cart.");
        navigate("/cart");
    };



    return (
        <div
            className="group bg-white border border-gray-100 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col h-full"
            onClick={() => navigate(`/product/${product._id}`)}
        >
            {/* Image Container */}
            <div className="aspect-square overflow-hidden bg-gray-50 relative">
                <img
                    src={product.images && product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Hover Overlay Button (Optional) */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content Container */}
            <div className="p-4 flex flex-col flex-1">
                <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-orange-500 transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                    <p className="text-[11px] text-gray-400 mb-2 uppercase tracking-wider font-medium">
                        {product.sizes?.[0] || product.size || "Standard Size"}
                    </p>

                    <div className="flex items-baseline gap-1.5 mb-1">
                        <span className="text-lg font-black text-gray-900 leading-none">
                            ₹{product.priceSqFt}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">/ Sq.Ft</span>
                    </div>

                    {product.priceBox && (
                        <p className="text-[10px] text-gray-400 font-semibold mb-4">
                            Or ₹{product.priceBox} / Box
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 mt-auto">
                    <button
                        onClick={handleAddToCart}
                        className="flex items-center justify-center gap-1.5 py-2 px-1 border-2 border-orange-500 text-orange-600 rounded-lg text-[11px] font-bold hover:bg-orange-50 transition-colors uppercase tracking-tight"
                    >
                        <HiOutlineShoppingCart className="text-sm" />
                        Add
                    </button>
                    <button
                        onClick={handleBuyNow}
                        className="py-2 px-1 bg-orange-500 text-white rounded-lg text-[11px] font-black hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200 uppercase tracking-tight"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
