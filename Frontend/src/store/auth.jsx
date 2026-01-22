import React, { createContext, useContext, useState, useEffect } from "react";
const api = import.meta.env.VITE_BACKEND_URL;
  import { useCallback } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showtoast, setShowtoast] = useState(false);
  const [toastType, settoastType] = useState("success");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [vendor, setVendor] = useState(null);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch(`${api}/authenticate`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Authentication check failed");
      }
      const data = await res.json();
      setIsAuthenticated(data.isauthenticate);
      if (data.isauthenticate) {
        localStorage.setItem("authenticate",true)
      }
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      return data;
    } catch (e) {
      console.error("Auth check error:", e.message);
      setIsAuthenticated(false);
      return false;
    } finally {
      setLoading(false);
    }
  }, []); 
 

  const Logout = async () => {
    try {
      const res = await fetch(`${api}/Logout`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      const data = await res.json();
      console.log(data);
      setIsAuthenticated(false);
      localStorage.clear()
      setUser(null);
      setVendor(null);
      setMessage(data.message || "Logout successful");
      setShowtoast(true);
      settoastType("success");

      setTimeout(() => {
        setShowtoast(false);
      }, 5000);
    } catch (e) {
      console.error("Logout error:", e.message);
      setMessage(e.message || "Logout failed");
      setShowtoast(true);
      settoastType("failed");

      setTimeout(() => {
        setShowtoast(false);
      }, 5000);
    }
  };

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/vendorProfile`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("User fetching failed");
      }
      const data = await res.json();
      console.log(data);
      setTotalProducts(data.totalProducts);
      setVendor(data.vendor || data);
      return data.vendor || data;
    } catch (e) {
      console.error("Fetch user error:", e.message);
      setMessage(e.message || "Failed to fetch user profile");
      setShowtoast(true);
      settoastType("failed");
      setTimeout(() => {
        setShowtoast(false);
      }, 5000);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <authContext.Provider
      value={{
        checkAuth,
        isAuthenticated,
        loading,
        user,
        Logout,
        showtoast,
        message,
        toastType,
        fetchUser,
        vendor,
        setShowtoast,
        setMessage,
        settoastType,
        totalProducts,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authContext);
 
  return context;
};
