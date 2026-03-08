import axios from 'axios';
import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { HiOutlinePlus, HiOutlineViewGrid } from "react-icons/hi";

function AdminUpload() {
  const [activeTab, setActiveTab] = useState("list"); // 'list' | 'add'
  const [productsList, setProductsList] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  // Form State
  const [product, setProduct] = useState({
    name: "",
    category: "BATHROOM",
    description: "",
    priceSqFt: "",
    priceBox: "",
  });

  const [sizes, setSizes] = useState(["300x300mm"]);
  const [colors, setColors] = useState([]);
  const [currentSize, setCurrentSize] = useState("");
  const [currentColor, setCurrentColor] = useState("");

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Products
  useEffect(() => {
    if (activeTab === "list") {
      fetchProducts();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    setLoadingList(true);
    try {
      const res = await axios.get('/api/products/all');
      setProductsList(res.data || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoadingList(false);
    }
  };

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addSize = () => {
    if (currentSize && !sizes.includes(currentSize)) {
      setSizes([...sizes, currentSize]);
      setCurrentSize("");
    }
  };

  const removeSize = (sizeToRemove) => {
    setSizes(sizes.filter(s => s !== sizeToRemove));
  };

  const addColor = () => {
    if (currentColor && !colors.includes(currentColor)) {
      setColors([...colors, currentColor]);
      setCurrentColor("");
    }
  };

  const removeColor = (colorToRemove) => {
    setColors(colors.filter(c => c !== colorToRemove));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();

    Object.keys(product).forEach(key => data.append(key, product[key]));
    data.append('sizes', JSON.stringify(sizes));
    data.append('colors', JSON.stringify(colors));

    if (images.length > 0) {
      images.forEach((file) => data.append('images', file));
    }

    try {
      // Must use withCredentials true because /add is protected by admin middleware
      await axios.post('/api/products/add', data, { withCredentials: true });
      alert("Success! Product Uploaded.");
      // Reset form and switch to list tab
      setProduct({ name: "", category: "BATHROOM", description: "", priceSqFt: "", priceBox: "" });
      setImages([]);
      setPreviews([]);
      setActiveTab("list");
    } catch (error) {
      console.error("Submission Error:", error);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || "Server Error!";
      alert("Error: " + errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <AdminSidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden md:ml-64">
        <AdminHeader 
          title="Product Management" 
          subtitle="View inventory and upload new products"
        />

        <div className="flex-1 overflow-y-auto px-8 pb-8 pt-2">
          
          {/* Tabs */}
          <div className="flex mb-6 bg-white border border-slate-200 p-1 rounded-xl w-fit shadow-sm">
            <button 
              onClick={() => setActiveTab("list")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'list' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}
            >
              <HiOutlineViewGrid className="text-lg" />
              Existing Products
            </button>
            <button 
              onClick={() => setActiveTab("add")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'add' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}
            >
              <HiOutlinePlus className="text-lg" />
              Add New Product
            </button>
          </div>

          {/* LIST VIEW */}
          {activeTab === "list" && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-800">Inventory Overview</h2>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 pb-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {productsList.length} items
                </span>
              </div>
              
              <div className="overflow-x-auto">
                {loadingList ? (
                  <div className="p-10 flex justify-center"><div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div></div>
                ) : productsList.length === 0 ? (
                  <div className="p-20 text-center">
                    <p className="text-slate-400 font-medium mb-4">No products found in the database.</p>
                    <button onClick={() => setActiveTab("add")} className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800">Upload your first product</button>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500">
                        <th className="p-4 pl-6 font-bold">Product</th>
                        <th className="p-4 font-bold">Category</th>
                        <th className="p-4 font-bold">Price (Box)</th>
                        <th className="p-4 font-bold">Status</th>
                        <th className="p-4 pr-6 text-right font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100/80">
                      {productsList.map((prod) => (
                        <tr key={prod._id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="p-4 pl-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                                {prod.images && prod.images.length > 0 ? (
                                  <img 
                                    src={prod.images[0].startsWith('http') ? prod.images[0] : `https://tile-backend-6xtp.onrender.com${prod.images[0]}`} 
                                    alt={prod.name} 
                                    className="w-full h-full object-cover" 
                                    crossOrigin="anonymous"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">No img</div>
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-slate-800">{prod.name}</p>
                                <p className="text-xs text-slate-500 max-w-[200px] truncate">{prod.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-[11px] font-bold uppercase tracking-wider">
                              {prod.category}
                            </span>
                          </td>
                          <td className="p-4 text-sm font-bold text-slate-700">
                            {prod.priceBox ? `₹${prod.priceBox}` : 'N/A'}
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-xs font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active
                            </span>
                          </td>
                          <td className="p-4 pr-6 text-right">
                            <button className="text-sm font-bold text-orange-600 hover:text-orange-700 opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}


          {/* ADD VIEW */}
          {activeTab === "add" && (
            <div className="max-w-4xl">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8">
                {/* Basic Info */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-slate-700">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={product.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder:text-slate-400"
                    placeholder="Enter a descriptive product name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Category */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-slate-700">Category *</label>
                    <select
                      name="category"
                      value={product.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all bg-white"
                    >
                      {['BATHROOM', 'KITCHEN', 'LIVING ROOM', 'BEDROOM', 'FLOOR', 'WALL', 'OUTDOOR', 'PARKING'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <label className="block text-sm font-semibold text-slate-700">Price (₹/Sq.Ft) *</label>
                      <input
                        type="number"
                        name="priceSqFt"
                        required
                        value={product.priceSqFt}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="block text-sm font-semibold text-slate-700">Price (₹/Box) *</label>
                      <input
                        type="number"
                        name="priceBox"
                        required
                        value={product.priceBox}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Variations: Sizes & Colors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                  {/* Sizes */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-slate-700">Available Sizes</label>
                    <div className="flex gap-2">
                      <select
                        value={currentSize}
                        onChange={(e) => setCurrentSize(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white"
                      >
                        <option value="">Select Size</option>
                        <optgroup label="Square Sizes">
                          <option value="200x200mm">200x200mm</option>
                          <option value="300x300mm">300x300mm</option>
                          <option value="400x400mm">400x400mm</option>
                          <option value="600x600mm">600x600mm</option>
                          <option value="800x800mm">800x800mm</option>
                        </optgroup>
                        <optgroup label="Rectangular Sizes">
                          <option value="300x450mm">300x450mm</option>
                          <option value="300x600mm">300x600mm</option>
                          <option value="600x1200mm">600x1200mm</option>
                          <option value="800x1600mm">800x1600mm</option>
                        </optgroup>
                      </select>
                      <button
                        type="button"
                        onClick={addSize}
                        className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 min-h-[32px]">
                      {sizes.length === 0 && <p className="text-xs text-slate-400 pt-2">No sizes added.</p>}
                      {sizes.map(s => (
                        <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 shadow-sm">
                          {s}
                          <button type="button" onClick={() => removeSize(s)} className="hover:text-red-500 transition-colors">
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-slate-700">Available Colors</label>
                    <div className="flex gap-2">
                      <select
                        value={currentColor}
                        onChange={(e) => setCurrentColor(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white"
                      >
                        <option value="">Select Color</option>
                        <option value="White">White</option>
                        <option value="Ivory">Ivory</option>
                        <option value="Grey">Grey</option>
                        <option value="Black">Black</option>
                        <option value="Brown">Brown</option>
                        <option value="Blue">Blue</option>
                      </select>
                      <button
                        type="button"
                        onClick={addColor}
                        className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 min-h-[32px]">
                      {colors.length === 0 && <p className="text-xs text-slate-400 pt-2">No colors added.</p>}
                      {colors.map(c => (
                        <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-700 rounded-lg text-xs font-semibold border border-orange-100 shadow-sm">
                          {c}
                          <button type="button" onClick={() => removeColor(c)} className="hover:text-red-500 transition-colors">
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <label className="block text-sm font-semibold text-slate-700">Product Images *</label>
                  <div className="group relative border-2 border-dashed border-slate-300 rounded-2xl p-8 hover:border-orange-400 hover:bg-orange-50/30 transition-all text-center cursor-pointer">
                    <input
                      type="file"
                      multiple
                      required={previews.length === 0}
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className="space-y-2">
                      <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                        <svg className="w-6 h-6 text-slate-500 group-hover:text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-slate-600">Click or drag images here to upload</p>
                      <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Multiple Allowed (max 10)</p>
                    </div>
                  </div>

                  {/* Previews */}
                  {previews.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-6">
                      {previews.map((url, i) => (
                        <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200 group bg-slate-50">
                          <img src={url} alt="preview" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <label className="block text-sm font-semibold text-slate-700">Product Description *</label>
                  <textarea
                    name="description"
                    required
                    rows="4"
                    value={product.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
                    placeholder="Describe the product features, durability, etc."
                  ></textarea>
                </div>

                {/* Actions */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-200 transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'active:scale-[0.99]'}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Uploading...
                      </span>
                    ) : (
                      "Publish Product to Store"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
export default AdminUpload;