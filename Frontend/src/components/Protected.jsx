import React from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const { isAuthenticated } = useAuth();
  console.log("isauth",isAuthenticated);
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
export default Protected;
