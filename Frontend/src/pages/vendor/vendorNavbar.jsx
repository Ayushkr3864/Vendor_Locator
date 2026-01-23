import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Search,
  Menu,
  X,
  Home,
  Compass,
  Users,
  Phone,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../store/auth";
import StatusBadge from "../../components/StatusBadge";
import ActiveBadge from "../../components/ActiveBadge";

function Navbar({ home }) {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { fetchUser, vendor, Logout,isAuthenticated } = useAuth();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleLogout = () => {
    Logout();
    navigate("/vendor");
    setIsUserMenuOpen(false);
  };

  // Get user data (could be from user or vendor object)
  // const currentUser = user || vendor;
  // const userName = currentUser?.name || currentUser?.businessName || "User";
  // const userAvatar = currentUser?.avatar || currentUser?.profileImage;

  // // Generate initials for avatar fallback
  // const getInitials = (name) => {
  //   return name
  //     .split(" ")
  //     .map((n) => n[0])
  //     .join("")
  //     .toUpperCase()
  //     .slice(0, 2);
  // };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50
            ? "backdrop-blur-xl bg-slate-900/80 border-b border-white/10 shadow-2xl"
            : "bg-slate-900 border-b border-emerald-500/30 shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div
              className="flex items-center gap-3 group cursor-pointer"
              onClick={() => navigate("/vendor")}
            >
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
                onClick={() => navigate("/vendor")}
                className="group flex items-center gap-2 text-blue-100 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Home</span>
              </a>
              {vendor && (
                <>
                  <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <span className="text-blue-200 font-medium truncate max-w-[140px]">
                      {vendor.businessname || "business"}
                    </span>

                    <span className="w-px h-4 bg-white/20" />

                    <ActiveBadge isActive={vendor?.isActive} />

                    <span className="w-px h-4 bg-white/20" />

                    <StatusBadge status={vendor?.isProfileComplete} />
                  </div>
                </>
              )}
              <a
                href="#"
                className="group flex items-center gap-2 text-blue-100 hover:text-white transition-colors duration-300"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Contact</span>
              </a>
            </div>

            {/* User Profile or CTA Button */}
            <div className="hidden md:block z-10">
              {vendor ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                  >
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold shadow-lg overflow-hidden">
                      {vendor?.vendorimg ? (
                        <img
                          src={vendor?.vendorimg}
                          alt={vendor?.avatar}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm">{vendor?.name}</span>
                      )}
                    </div>
                    {/* Username */}
                    <span className="text-white font-medium max-w-[120px] truncate">
                      {vendor?.name}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-blue-200 transition-transform duration-300 ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fadeInUp ">
                      <div className="p-4 border-b border-white/10">
                        <p className="text-white font-semibold truncate">
                          {vendor?.name}
                        </p>
                        <p className="text-blue-300 text-sm truncate">
                          {vendor?.email || ""}
                        </p>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => navigate("/vendorDash")}
                          className="w-full flex items-center gap-3 px-4 py-3 text-blue-100 hover:text-white hover:bg-white/10 transition-all duration-300"
                        >
                          <User className="w-4 h-4" />
                          <span>Dashboard</span>
                        </button>
                        <button
                          onClick={() => {
                            navigate("/settings");
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-blue-100 hover:text-white hover:bg-white/10 transition-all duration-300"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                  onClick={() => navigate("/login")}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <Search className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              )}
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
                {/* Mobile User Profile */}
                {isAuthenticated && currentUser && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl border border-white/20">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold shadow-lg overflow-hidden">
                      {userAvatar ? (
                        <img
                          src={userAvatar}
                          alt={userName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{getInitials(userName)}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold truncate">
                        {userName}
                      </p>
                      <p className="text-blue-300 text-sm truncate">
                        {currentUser?.email || ""}
                      </p>
                    </div>
                  </div>
                )}

                <a
                  onClick={() => navigate("/")}
                  className="flex items-center gap-3 px-4 py-3 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Home</span>
                </a>
                <a
                  onClick={() => navigate("/explore/vendor")}
                  className="flex items-center gap-3 px-4 py-3 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 cursor-pointer"
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

                {isAuthenticated && vendor ? (
                  <>
                    <button
                      onClick={handleNavigate}
                      className="mt-2 w-full px-6 py-3 backdrop-blur-xl bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full shadow-lg"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/register")}
                      className="mt-2 w-full px-6 py-3 backdrop-blur-xl bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all"
                    >
                      Join as Vendor
                    </button>
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default Navbar;
