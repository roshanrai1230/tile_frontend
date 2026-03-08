import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

import { HiOutlineArrowLeft, HiOutlineCheckCircle, HiOutlineTruck, HiOutlineCreditCard, HiOutlineCash } from "react-icons/hi";

const CheckoutPage = () => {
    const { cart, cartCount, clearCart } = useCart();
    const navigate = useNavigate();
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        paymentMethod: "COD"
    });

    const subtotal = cart.reduce((acc, item) => {
        const price = Number(item.priceSqFt) || 0;
        const qty = Number(item.quantity) || 0;
        return acc + (price * qty);
    }, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            customer: formData,
            items: cart.map(item => ({
                productId: item._id,
                name: item.name,
                selectedSize: item.selectedSize,
                selectedColor: item.selectedColor,
                quantity: item.quantity,
                priceSqFt: item.priceSqFt
            })),
            totalAmount: subtotal,
            paymentMethod: formData.paymentMethod
        };

        try {
            await axios.post("https://tile-backend-n9ps.onrender.com/api/orders", orderData);
            setOrderPlaced(true);
            clearCart();
        } catch (err) {
            console.error("Error placing order:", err);
            alert("Failed to place order. Please try again.");
        }
    };


    if (orderPlaced) {
        return (
            <div className="max-w-[800px] mx-auto px-4 py-20 text-center animate-in fade-in zoom-in duration-500">
                <div className="mb-8 flex justify-center">
                    <div className="bg-green-50 p-10 rounded-full border-4 border-green-100 shadow-xl shadow-green-100/50">
                        <HiOutlineCheckCircle className="text-8xl text-green-500" />
                    </div>
                </div>
                <h1 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tighter italic">Order Placed Successfully!</h1>
                <p className="text-gray-500 text-lg mb-10 italic max-w-md mx-auto">
                    Thank you for choosing premium tiles. Your order has been received and is being processed for delivery.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="bg-gray-900 text-white font-black px-10 py-4 rounded-2xl hover:bg-orange-600 transition-all shadow-2xl uppercase tracking-[0.2em] text-xs"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="max-w-[1250px] mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tighter italic">Checkout requires items</h2>
                <button onClick={() => navigate("/")} className="text-orange-500 font-black hover:underline uppercase tracking-widest text-xs italic">Back to Home</button>
            </div>
        );
    }

    return (
        <div className="max-w-[1250px] mx-auto px-4 py-10 min-h-screen">
            <div className="mb-10">
                <button
                    onClick={() => navigate("/cart")}
                    className="flex items-center gap-2 text-gray-400 hover:text-orange-500 font-black text-[10px] uppercase tracking-[.2em] transition-all"
                >
                    <HiOutlineArrowLeft /> Back to Cart
                </button>
                <h1 className="text-4xl font-black text-gray-900 mt-4 uppercase tracking-tighter italic">Checkout</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Form Section */}
                <div className="lg:w-2/3">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Shipping Address */}
                        <div className="bg-white border border-gray-100 rounded-[40px] p-8 sm:p-10 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                                    <HiOutlineTruck className="text-xl" />
                                </div>
                                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic">Shipping Address</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="fullName"
                                        placeholder="John Doe"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all italic"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        placeholder="+91 00000 00000"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all italic"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Complete Address</label>
                                    <textarea
                                        required
                                        name="address"
                                        rows="3"
                                        placeholder="House No., Street, Landmark"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all italic resize-none"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
                                    <input
                                        required
                                        type="text"
                                        name="city"
                                        placeholder="Jaipur"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all italic"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pincode</label>
                                    <input
                                        required
                                        type="text"
                                        name="pincode"
                                        placeholder="302001"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all italic"
                                        value={formData.pincode}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white border border-gray-100 rounded-[40px] p-8 sm:p-10 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                                    <HiOutlineCreditCard className="text-xl" />
                                </div>
                                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic">Payment Method</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label
                                    className={`flex items-center gap-4 p-6 rounded-3xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'COD'
                                        ? "border-orange-500 bg-orange-50/50"
                                        : "border-gray-50 bg-gray-50/50 hover:border-gray-200"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="COD"
                                        className="hidden"
                                        onChange={handleInputChange}
                                    />
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${formData.paymentMethod === 'COD' ? "bg-orange-500 text-white" : "bg-white text-gray-400 border border-gray-100"}`}>
                                        <HiOutlineCash className="text-2xl" />
                                    </div>
                                    <div>
                                        <span className="block font-black text-gray-900 uppercase tracking-tight italic">Cash on Delivery</span>
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Pay at your doorstep</span>
                                    </div>
                                    <div className={`ml-auto w-5 h-5 rounded-full border-4 flex items-center justify-center ${formData.paymentMethod === 'COD' ? "border-orange-500 bg-white" : "border-gray-200"}`}>
                                        {formData.paymentMethod === 'COD' && <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />}
                                    </div>
                                </label>

                                <label
                                    className={`flex items-center gap-4 p-6 rounded-3xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'ONLINE'
                                        ? "border-orange-500 bg-orange-50/50"
                                        : "border-gray-50 bg-gray-50/50 hover:border-gray-200 opacity-60"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="ONLINE"
                                        className="hidden"
                                        onChange={handleInputChange}
                                    />
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${formData.paymentMethod === 'ONLINE' ? "bg-orange-500 text-white" : "bg-white text-gray-400 border border-gray-100"}`}>
                                        <HiOutlineCreditCard className="text-2xl" />
                                    </div>
                                    <div>
                                        <span className="block font-black text-gray-900 uppercase tracking-tight italic">Online Payment</span>
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Pay safely online</span>
                                    </div>
                                    <div className={`ml-auto w-5 h-5 rounded-full border-4 flex items-center justify-center ${formData.paymentMethod === 'ONLINE' ? "border-orange-500 bg-white" : "border-gray-200"}`}>
                                        {formData.paymentMethod === 'ONLINE' && <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />}
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="lg:hidden mt-10">
                            <button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-5 rounded-3xl transition-all shadow-2xl shadow-orange-950/20 uppercase tracking-[0.2em] text-xs"
                            >
                                Place My Order Now
                            </button>
                        </div>
                    </form>
                </div>

                {/* Info Column */}
                <div className="lg:w-1/3">
                    <div className="bg-gray-900 rounded-[40px] p-10 text-white sticky top-40 shadow-2xl border border-gray-800 space-y-8">
                        <div>
                            <h2 className="text-2xl font-black tracking-tighter uppercase italic mb-1">Order Summary</h2>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Confirm your premium selection</p>
                        </div>

                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map((item, i) => (
                                <div key={i} className="flex gap-4 border-b border-gray-800/50 pb-4 last:border-0 last:pb-0">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-800 shrink-0">
                                        <img src={item.images?.[0]} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[11px] font-black uppercase tracking-tight truncate italic">{item.name}</h4>
                                        <div className="text-[9px] text-gray-500 font-bold uppercase flex gap-2 mt-0.5">
                                            <span>{item.selectedSize}</span>
                                            {item.selectedColor && <span>| {item.selectedColor}</span>}
                                            <span className="text-gray-400">x{item.quantity}</span>
                                        </div>
                                    </div>
                                    <div className="text-[11px] font-black italic">₹{(Number(item.priceSqFt) * item.quantity).toLocaleString()}</div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6 pt-4 border-t border-gray-800/50">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Subtotal</span>
                                <span className="text-base font-black tracking-tight italic">₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Shipping</span>
                                <span className="text-[10px] font-black text-green-500 uppercase tracking-widest italic bg-green-500/10 px-3 py-1 rounded-full">FREE</span>
                            </div>

                            <div className="h-px bg-gradient-to-r from-transparent via-gray-800/50 to-transparent my-2" />

                            <div className="flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-orange-500/50">To Pay</span>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase italic">Inclusive of GST</span>
                                </div>
                                <span className="text-3xl font-black text-orange-500 tracking-tighter italic">₹{subtotal.toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => document.querySelector('form').requestSubmit()}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-5 rounded-3xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-orange-950/40 uppercase tracking-[0.2em] text-[11px]"
                        >
                            Complete Order 🔒
                        </button>

                        <div className="text-[8px] font-black uppercase tracking-[0.2em] text-center text-gray-600 opacity-50 px-4 leading-relaxed">
                            By placing this order, you agree to our premium service terms & quality assurance guarantee.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
