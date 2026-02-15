import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    // Auto Logout Logic
    useEffect(() => {
        if (!isAuthenticated) return;

        const LOGOUT_TIME = 20 * 60 * 1000; // 20 minutes
        let logoutTimer;

        const resetTimer = () => {
            if (logoutTimer) clearTimeout(logoutTimer);
            logoutTimer = setTimeout(() => {
                logout();
            }, LOGOUT_TIME);
        };

        const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

        events.forEach(event => {
            window.addEventListener(event, resetTimer);
        });

        resetTimer();

        return () => {
            if (logoutTimer) clearTimeout(logoutTimer);
            events.forEach(event => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [isAuthenticated]);

    const login = async (username, password) => {
        try {
            const data = await loginUser(username, password);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
