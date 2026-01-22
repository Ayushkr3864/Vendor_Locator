import React,{useEffect} from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const isAuthenticated = localStorage.getItem("authenticate");
  console.log("isauthen", isAuthenticated);
  if (!isAuthenticated) {
    return  <Navigate to="/login" replace />;
  }
  return children
}

export default Protected;
