import React, { useEffect, useState, useCallback } from "react";
import { Navigate } from "react-router-dom";

const api = import.meta.env.VITE_BACKEND_URL;

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // 👈 null = unknown
  const [role,setRole] = useState()
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking authentication...
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if(role !== "vendor") return <Navigate to="/user" replace />
  return children;
};

export default ProtectedRoute;
