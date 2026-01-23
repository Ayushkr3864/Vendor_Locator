import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  Package,
  PlusCircle,
  Briefcase,
  LogOut,
  Menu,
  X,
  ShoppingBag,
  Store,
} from "lucide-react";
import { useAuth } from "../../store/auth";
import { useEffect } from "react";
import { color } from "framer-motion";

export default function VendordashNav() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate()
  const {Logout,vendor} = useAuth()
  const handleLogout = () => {
    Logout();
    navigate("/")
  };

  const navItems = [
    {
      name: "Dashboard",
      icon: <Store size={20} />,
      to:"/vendorDash",
    color:"text-red-600"
  },
    {
      name: "Add Product",
      icon: <PlusCircle size={20} />,
     to:"/create/product",
      color: "text-blue-600",
    },
    {
      name: `${vendor?.isProfileComplete ? "Update Business" : "Register Business"}`,
      icon: <Briefcase size={20} />,
      to:"/registerBusiness",
      color: "text-green-600",
    },
    {
      name: "Show Products",
      icon: <ShoppingBag size={20} />,
     to: "/viewProduct",
      color: "text-purple-600",
    },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <Package className="text-blue-600" size={32} />
            <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VendorHub
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg ${isActive ? "bg-gray-300" : ""} hover:bg-gray-100 transition-all duration-200 group`
                }
              >
                <span
                  className={`${item.color} group-hover:scale-110 transition-transform`}
                >
                  {item.icon}
                </span>
                <span className="text-gray-700 font-medium">{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* User Info & Logout - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 hover:shadow-lg"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-gray-50 border-t border-gray-200">
          {/* User Info - Mobile */}
        

          {/* Navigation Items - Mobile */}
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.to();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <span className={item.color}>{item.icon}</span>
              <span className="text-gray-700 font-medium">{item.name}</span>
            </button>
          ))}

          {/* Logout - Mobile */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
