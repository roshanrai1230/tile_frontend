import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineMail, HiOutlineLockClosed, HiArrowRight } from 'react-icons/hi';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Send credentials; axios configured in App.js to send/receive cookies
      const res = await axios.post('https://tile-backend-6xtp.onrender.com/api/auth/login', {
        email,
        password
      }, {
        withCredentials: true // Crucial for receiving HttpOnly cookies
      });

      if (res.data.success) {
        // Redirect to admin dashboard
        navigate('/admin');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      {/* Logo Area */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          MY<span className="text-orange-500">TILES</span>
        </h1>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Admin Portal</p>
      </div>

      {/* Login Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 p-8 md:p-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h2>
        <p className="text-slate-500 text-sm mb-8">Please enter your admin credentials to continue.</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-md font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineMail className="text-slate-400 text-lg" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors text-slate-800 bg-slate-50 focus:bg-white"
                placeholder="admin@mytiles.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineLockClosed className="text-slate-400 text-lg" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors text-slate-800 bg-slate-50 focus:bg-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-slate-900 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : 'active:scale-[0.98]'}`}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            {!loading && <HiArrowRight className="text-lg" />}
          </button>
        </form>
      </div>

      {/* Back to store link */}
      <button 
        onClick={() => navigate('/')}
        className="mt-8 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
      >
        ← Back to Main Store
      </button>
    </div>
  );
};

export default AdminLogin;
