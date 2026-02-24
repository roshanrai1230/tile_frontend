import axios from 'axios';
import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";

function AdminUpload() {
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
  const [video, setVideo] = useState(null);
  const [previews, setPreviews] = useState([]);

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
    const data = new FormData();

    // Append product fields
    Object.keys(product).forEach(key => data.append(key, product[key]));

    // Append arrays as JSON strings
    data.append('sizes', JSON.stringify(sizes));
    data.append('colors', JSON.stringify(colors));

    if (images.length > 0) {
      images.forEach((file) => data.append('images', file));
    }
    if (video) data.append('video', video);

    try {
      await axios.post('http://localhost:5000/api/products/add', data);
      alert("Success! Product Uploaded.");
      window.location.reload();
    } catch (error) {
      console.error("Submission Error:", error);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || "Server Error!";
      alert("Error: " + errorMsg);
    }
  };

  return (
    <div className="flex h-[calc(100vh-140px)] bg-slate-50 overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">

        <header className="p-8 pb-4 shrink-0">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800">Upload New Product</h1>
            <p className="text-slate-500 mt-2">Add new tiles to your inventory with detailed specifications.</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-8 pb-8 pt-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8">
              {/* Basic Info */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-700">Product Name</label>
                <input
                  type="text"
                  name="name"
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
                    <label className="block text-sm font-semibold text-slate-700">Price (₹/Sq.Ft)</label>
                    <input
                      type="number"
                      name="priceSqFt"
                      value={product.priceSqFt}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-slate-700">Price (₹/Box)</label>
                    <input
                      type="number"
                      name="priceBox"
                      value={product.priceBox}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Variations: Sizes & Colors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
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
                        <option value="1000x1000mm">1000x1000mm</option>
                        <option value="1200x1200mm">1200x1200mm</option>
                      </optgroup>
                      <optgroup label="Rectangular Sizes">
                        <option value="300x450mm">300x450mm</option>
                        <option value="300x600mm">300x600mm</option>
                        <option value="600x1200mm">600x1200mm</option>
                        <option value="800x1600mm">800x1600mm</option>
                        <option value="1200x2400mm">1200x2400mm</option>
                      </optgroup>
                      <optgroup label="Plank / Wooden Sizes">
                        <option value="200x1000mm">200x1000mm</option>
                        <option value="200x1200mm">200x1200mm</option>
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

                  <div className="flex flex-wrap gap-2 min-h-8">
                    {sizes.map(s => (
                      <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 shadow-sm">
                        {s}
                        <button type="button" onClick={() => removeSize(s)} className="hover:text-red-500 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
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
                      <optgroup label="Neutrals">
                        <option value="White">White</option>
                        <option value="Ivory">Ivory</option>
                        <option value="Cream">Cream</option>
                        <option value="Beige">Beige</option>
                        <option value="Sand">Sand</option>
                      </optgroup>
                      <optgroup label="Greys & Blacks">
                        <option value="Light Grey">Light Grey</option>
                        <option value="Dark Grey">Dark Grey</option>
                        <option value="Charcoal">Charcoal</option>
                        <option value="Black">Black</option>
                        <option value="Silver">Silver</option>
                      </optgroup>
                      <optgroup label="Earthy Tones">
                        <option value="Brown">Brown</option>
                        <option value="Chocolate">Chocolate</option>
                        <option value="Terracotta">Terracotta</option>
                        <option value="Copper">Copper</option>
                        <option value="Bronze">Bronze</option>
                      </optgroup>
                      <optgroup label="Decorative Colors">
                        <option value="Blue">Blue</option>
                        <option value="Aqua">Aqua</option>
                        <option value="Green">Green</option>
                        <option value="Olive">Olive</option>
                        <option value="Pink">Pink</option>
                        <option value="Red">Red</option>
                        <option value="Multicolor">Multicolor</option>
                      </optgroup>
                    </select>
                    <button
                      type="button"
                      onClick={addColor}
                      className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 min-h-8">
                    {colors.map(c => (
                      <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-700 rounded-lg text-xs font-semibold border border-orange-100 shadow-sm">
                        {c}
                        <button type="button" onClick={() => removeColor(c)} className="hover:text-red-500 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <label className="block text-sm font-semibold text-slate-700">Product Images</label>
                <div className="group relative border-2 border-dashed border-slate-300 rounded-2xl p-8 hover:border-orange-400 hover:bg-orange-50/30 transition-all text-center cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="space-y-2">
                    <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                      <svg className="w-6 h-6 text-slate-500 group-hover:text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-slate-600">Click or drag images here to upload</p>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Multiple Allowed</p>
                  </div>
                </div>

                {/* Previews */}
                {previews.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-6">
                    {previews.map((url, i) => (
                      <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200 group">
                        <img src={url} alt="preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button type="button" className="text-white hover:text-red-400">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <label className="block text-sm font-semibold text-slate-700">Product Description</label>
                <textarea
                  name="description"
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
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
export default AdminUpload;