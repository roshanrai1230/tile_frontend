import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

// Custom hook to automatically log out the admin if they are idle for 5 minutes
const useIdleLogout = (timeoutMinutes = 5) => {
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutIdRef = useRef(null);

  // Check if we are on an admin route (don't log out customers!)
  const isAdminRoute = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  const logout = async () => {
    try {
      // Call backend to clear the HttpOnly cookies
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
    } catch (err) {
      console.error("Error during auto-logout:", err);
    } finally {
      // Always redirect to login
      navigate('/admin/login');
    }
  };

  const resetTimeout = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    
    // Only set timeout if we are actually on an admin page
    if (isAdminRoute) {
      timeoutIdRef.current = setTimeout(logout, timeoutMinutes * 60 * 1000);
    }
  };

  useEffect(() => {
    if (!isAdminRoute) return;

    // Events that signify the user is NOT idle
    const events = [
      'mousemove',
      'keydown',
      'wheel',
      'DOMMouseScroll',
      'mousewheel',
      'mousedown',
      'touchstart',
      'touchmove',
      'MSPointerDown',
      'MSPointerMove'
    ];

    // Initial setup
    resetTimeout();

    // Attach listeners
    events.forEach((event) => {
      window.addEventListener(event, resetTimeout);
    });

    // Cleanup
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, resetTimeout);
      });
    };
  }, [isAdminRoute]); // Re-run setup if they navigate in/out of admin area
};

export default useIdleLogout;
