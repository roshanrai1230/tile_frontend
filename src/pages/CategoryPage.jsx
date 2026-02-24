import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";

function CategoryPage() {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:5000/api/products/all");
                // Filter by category (case-insensitive check but comparing with uppercase slugs)
                const filtered = res.data.filter(
                    (tile) => tile.category.toUpperCase() === categoryName.toUpperCase()
                );
                setProducts(filtered);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [categoryName]);

    return (
        <div className="max-w-[1250px] mx-auto px-4 py-10 min-h-screen">
            <div className="flex items-center justify-between mb-10">
                <div className="space-y-1">
                    <h2 className="text-4xl font-black text-gray-900 capitalize tracking-tight">
                        {categoryName.toLowerCase()}
                    </h2>
                    <div className="h-1.5 w-12 bg-orange-500 rounded-full" />
                </div>
                <div className="bg-gray-100 px-4 py-1.5 rounded-full">
                    <span className="text-sm font-bold text-gray-600 tracking-wide">{products.length} Products</span>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {products.map((item) => (
                        <ProductCard key={item._id} product={item} />
                    ))}
                </div>
            ) : (

                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-400 text-lg">No products found in this category.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-4 text-orange-500 font-semibold hover:underline"
                    >
                        Back to Home
                    </button>
                </div>
            )}
        </div>
    );
}

export default CategoryPage;
