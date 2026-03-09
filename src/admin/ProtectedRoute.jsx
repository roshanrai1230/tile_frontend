import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineRefresh } from 'react-icons/hi';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      try {
        await axios.get('/api/auth/check', { withCredentials: true });
        if (isMounted) setIsAuthenticated(true);
      } catch (err) {
        if (isMounted) setIsAuthenticated(false);
      }
    };

    verifyAuth();

    return () => {
       isMounted = false;
    };
  }, [location.pathname]); // Re-verify on page change

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 text-slate-400">
        <HiOutlineRefresh className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
