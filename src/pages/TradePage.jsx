import React from "react";
import { HiOutlineDocumentText, HiOutlineUserGroup, HiOutlineTag, HiOutlineArrowRight, HiOutlineCheckCircle } from "react-icons/hi";

export default function TradePage() {
  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* ─── HERO ─────────────────────────────────── */}
      <section className="relative bg-[#0a0a0a] text-white pt-32 pb-40 px-6 overflow-hidden">
        {/* Architect/Interior Designer Vibe Image */}
        <img
          src="https://images.unsplash.com/photo-1536895058696-a69b1c7ba34e?q=80&w=2070&auto=format&fit=crop"
          alt="Trade Professional Workspace"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#0a0a0a]/60 to-[#0a0a0a] opacity-90"></div>
        
        <div className="relative max-w-5xl mx-auto text-center z-10 w-full flex flex-col items-center">
          <span className="inline-block py-1 px-4 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-black tracking-[0.2em] uppercase mb-8 backdrop-blur-md">
            MyTiles Pro
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1]">
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Design Practice</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            Exclusive privileges, dedicated concierge support, and unmatched trade pricing for Architects, Interior Designers, Builders, and Contractors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
            <button className="bg-orange-600 hover:bg-orange-500 text-white font-black px-8 py-4 rounded-xl shadow-[0_10px_30px_rgba(234,88,12,0.3)] hover:shadow-[0_15px_40px_rgba(234,88,12,0.4)] transition-all flex items-center justify-center gap-2 group w-full">
              Apply Now
              <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-8 py-4 rounded-xl backdrop-blur-sm transition-all w-full">
              Member Login
            </button>
          </div>
        </div>
      </section>

      {/* ─── FLOATING BENEFITS CARDS ──────────────── */}
      <section className="relative -mt-24 px-6 z-20 max-w-7xl mx-auto mb-20">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1 */}
          <div className="bg-white p-10 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
              <HiOutlineTag className="text-3xl text-orange-500" />
            </div>
            <h3 className="text-2xl font-black mb-4 text-gray-900">Trade Pricing</h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              Unlock exclusive tier-based trade discounts up to <span className="text-orange-600 font-bold">30% off</span> retail pricing across our entire catalog of 2500+ premium tiles.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white p-10 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
              <HiOutlineUserGroup className="text-3xl text-orange-500" />
            </div>
            <h3 className="text-2xl font-black mb-4 text-gray-900">Concierge Service</h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              Get priority support from a dedicated <span className="text-orange-600 font-bold">Account Manager</span> to handle quotes, inventory holds, and complex logistics instantly.
            </p>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white p-10 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-400 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-orange-500/30">
              <HiOutlineDocumentText className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-black mb-4 text-gray-900">Unlimited Samples</h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              Never pay for samples. Request <span className="text-orange-600 font-bold">complimentary swatches</span> sent via priority overnight shipping straight to your office or client site.
            </p>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS & PREMIUM FORM ───────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-gray-50 rounded-[3rem] p-8 md:p-16 border border-gray-200">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Side: Steps & Info */}
            <div>
              <span className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-4 block">Join The Community</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 leading-tight">Partner with the fastest growing tile brand.</h2>
              <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                We believe in empowering creatives. Fill out the application form with your firm's details, and our Trade Team will activate your custom-tier account within 24 hours.
              </p>
              
              <ul className="space-y-8">
                <li className="flex gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 shadow-sm text-gray-900 flex items-center justify-center font-black text-xl shrink-0 group-hover:border-orange-500 group-hover:text-orange-500 transition-colors">1</div>
                  <div>
                    <b className="block text-gray-900 text-lg mb-1">Submit Application</b>
                    <span className="text-gray-500 font-medium">Provide your business, GST, or Tax ID documents.</span>
                  </div>
                </li>
                <li className="flex gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 shadow-sm text-gray-900 flex items-center justify-center font-black text-xl shrink-0 group-hover:border-orange-500 group-hover:text-orange-500 transition-colors">2</div>
                  <div>
                    <b className="block text-gray-900 text-lg mb-1">Fast Verification</b>
                    <span className="text-gray-500 font-medium">Our team verifies your professional credentials same-day.</span>
                  </div>
                </li>
                <li className="flex gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-gray-900 shadow-md text-white flex items-center justify-center font-black text-xl shrink-0 group-hover:bg-orange-500 transition-colors">
                    <HiOutlineCheckCircle />
                  </div>
                  <div>
                    <b className="block text-gray-900 text-lg mb-1">Start Specifying</b>
                    <span className="text-gray-500 font-medium">Log in to view trade prices, create project boards, and order.</span>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Right Side: Form Block */}
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>
              <h3 className="text-2xl font-black mb-2 text-gray-900">Trade Application</h3>
              <p className="text-gray-500 font-medium mb-8 text-sm">Secure, confidential, and free to join.</p>
              
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">First Name</label>
                    <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-colors" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Last Name</label>
                    <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-colors" />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Company Name</label>
                  <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-colors" />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Profession / Business Type</label>
                  <select className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-colors text-gray-700">
                    <option value="">Select Category</option>
                    <option value="architect">Architect</option>
                    <option value="interior_designer">Interior Designer</option>
                    <option value="builder">Builder / Developer</option>
                    <option value="contractor">Contractor</option>
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Business Email</label>
                  <input type="email" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-colors" />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">GSTIN / Tax ID</label>
                  <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-colors" />
                </div>
                
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-black py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-4 text-lg group">
                  Submit Application
                  <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-xs text-gray-400 font-medium mt-4">By applying, you agree to our Pro Terms of Service.</p>
              </form>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}
