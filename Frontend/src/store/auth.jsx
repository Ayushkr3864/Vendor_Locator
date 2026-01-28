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
  const [role,setRole] = useState(null)

 const checkAuth = useCallback(async () => {
     try {
       const res = await fetch(`${api}/authenticate`, {
         method: "GET",
         credentials: "include",
       });
       if (!res.ok) throw new Error("Auth failed");
       const data = await res.json();
       setIsAuthenticated(!!data.isauthenticate)
       setRole(data.role)
       console.log(data.role);
       
     } catch (err) {
       console.error(err);
       setIsAuthenticated(false);
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
   const getLoggedInUser = useCallback(async () => {
     try {
       setLoading(true);

       const res = await fetch(`${api}/user/get`, {
         method: "GET",
         credentials: "include", 
       });

       const data = await res.json();

       if (!res.ok) {
         setUser(null);
         return;
       }

       setUser(data.user);
     } catch (err) {
       console.error("Fetch user failed:", err);
       setUser(null);
     } finally {
       setLoading(false);
     }
   }, []);
  // useEffect(() => {
  //   getLoggedInUser()
  // },[getLoggedInUser])
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
        getLoggedInUser,
        role,
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
