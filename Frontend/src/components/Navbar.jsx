import React, { useState,useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Search,
  Eye,
  GitCompare,
  Navigation,
  Target,
  Shield,
  Clock,
  Zap,
  Award,
  TrendingUp,
  Menu,
  X,
  Home,
  Compass,
  Users,
  Phone,
} from "lucide-react";
import { useAuth } from "../store/auth";
import Toast from "./Toast";
function Navbar({home}) {
  const navigate = useNavigate()
   const [scrollY, setScrollY] = useState(0);

   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const { checkAuth, isAuthenticated, loading, user, Logout, message, toastType, showtoast } = useAuth();
  // useEffect(() => { checkAuth() }, [])
  // console.log("authen",isAuthenticated);
  const handleNavigate = () => {
    if (isAuthenticated) {
      if (user?.role === "vendor") return navigate("/vendorDash")
      navigate("/userDash");
    } 
    navigate("/register")
  }
  const handleLogout = () => {
    Logout()
    navigate("/")

  }
    useEffect(() => {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <>
      {/* <Toast message={message} type={toastType} show={showtoast} /> */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50
            ? "backdrop-blur-xl bg-slate-900/80 border-b border-white/10 shadow-2xl"
            : `${home == "true" ? "bg-transparent" : "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden"}`
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  VendorHub
                </h1>
                <p className="text-xs text-blue-300">Find Local Vendors</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                onClick={()=>(navigate("/"))}
                className="group flex items-center gap-2 text-blue-100 hover:text-white transition-colors duration-300"
              >
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Home</span>
              </a>
              <a
                onClick={()=>(navigate("/explore/vendor"))}
                className="group flex items-center gap-2 text-blue-100 cursor-pointer hover:text-white transition-colors duration-300"
              >
                <Compass className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Explore</span>
              </a>
              <a
                href="#"
                className="group flex items-center gap-2 text-blue-100 hover:text-white transition-colors duration-300"
              >
                <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">About</span>
              </a>
              <a
                href="#"
                className="group flex items-center gap-2 text-blue-100 hover:text-white transition-colors duration-300"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Contact</span>
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 overflow-hidden" onClick={()=>(navigate("/login"))}>
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <Search className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-blue-100 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-6 animate-fadeInUp">
              <div className="flex flex-col gap-4">
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Home</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  <Compass className="w-5 h-5" />
                  <span className="font-medium">Explore</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  <Users className="w-5 h-5" />
                  <span className="font-medium">About</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">Contact</span>
                </a>
                <button className="mt-2 w-full px-6 py-3 backdrop-blur-xl bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all">
                  Join as Vendor
                </button>
                <button className="mt-2 w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
