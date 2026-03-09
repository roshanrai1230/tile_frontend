import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Optional: Setup Axios defaults if needed
    // axios.defaults.withCredentials = true; // Make sure cookies are sent

    useEffect(() => {
        // Check if user is logged in when the app loads
        const checkUser = async () => {
            try {
                const res = await axios.get('https://tile-backend-6xtp.onrender.com/api/users/profile', { withCredentials: true });
                setUser(res.data);
            } catch (error) {
                // If 401, it means no valid cookie/token, which is fine
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post('https://tile-backend-6xtp.onrender.com/api/users/login', { email, password }, { withCredentials: true });
            setUser(res.data);
            return { success: true, data: res.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await axios.post('https://tile-backend-6xtp.onrender.com/api/users/register', { name, email, password }, { withCredentials: true });
            setUser(res.data);
            return { success: true, data: res.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Registration failed' };
        }
    };

    const logout = async () => {
        try {
            await axios.post('https://tile-backend-6xtp.onrender.com/api/users/logout', {}, { withCredentials: true });
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
