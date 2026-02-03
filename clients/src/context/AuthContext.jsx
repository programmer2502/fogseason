import React, { createContext, useContext, useState } from 'react';
import { loginUser } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Initialize user from localStorage immediately to avoid auth delay
    const [user, setUser] = useState(() => {
        try {
            const userInfo = localStorage.getItem('userInfo');
            return userInfo ? JSON.parse(userInfo) : null;
        } catch (error) {
            console.error("Error parsing user info from storage:", error);
            localStorage.removeItem('userInfo');
            return null;
        }
    });

    // Derive authentication state from user object
    const isAuthenticated = !!user;

    const login = async (username, password) => {
        try {
            const data = await loginUser(username, password);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading: false }}>
            {children}
        </AuthContext.Provider>
    );
};
