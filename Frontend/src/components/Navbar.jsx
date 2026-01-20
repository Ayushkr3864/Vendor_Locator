import React, { useState,useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { LogIn, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../store/auth";
import Toast from "./Toast";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  
  const { checkAuth, isAuthenticated, loading, user, Logout, message, toastType, showtoast } = useAuth();
  useEffect(() => { checkAuth() }, [])
  console.log("authen",isAuthenticated);
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

  return (
    <>
      <Toast message={message} type={toastType} show={showtoast} />
      <header className="bg-linear-to-r from-blue-500 to-purple-600 shadow-lg w-full fixed top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Vendor<span className="text-amber-300">Track</span>
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 font-medium text-lg">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative inline-block transition-transform duration-200 transform hover:scale-110 ${
                  isActive ? "text-amber-300 scale-110" : "text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Home
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 w-full bg-amber-300 transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </>
              )}
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative inline-block transition-transform duration-200 transform hover:scale-110 ${
                  isActive ? "text-amber-300 scale-110" : "text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  About
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-full bg-amber-300 transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </>
              )}
            </NavLink>

            <NavLink
              to="/features"
              className={({ isActive }) =>
                `relative inline-block transition-transform duration-200 transform hover:scale-110 ${
                  isActive ? "text-amber-300 scale-110" : "text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Features
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-full bg-amber-300 transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </>
              )}
            </NavLink>

            <NavLink
              to="/how-it-works"
              className={({ isActive }) =>
                `relative inline-block transition-transform duration-200 transform hover:scale-110 ${
                  isActive ? "text-amber-300 scale-110" : "text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  How it Works
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-full bg-amber-300 transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </>
              )}
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `relative inline-block transition-transform duration-200 transform hover:scale-110 ${
                  isActive ? "text-amber-300 scale-110" : "text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Contact
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-full bg-amber-300 transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={38} /> : <Menu size={38} />}
          </button>
          <div className="space-x-4 hidden md:flex">
            <button
              className="bg-gradient-to-r from-blue-200 to-indigo-300 hover:from-blue-600 hover:to-indigo-700 text-black hover:text-white px-6 py-3 rounded-lg shadow-lg cursor-pointer"
              onClick={handleNavigate}
            >
              {isAuthenticated ? "Dashbaord" : "Register"}
            </button>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition"
              >
                <LogOut size={18}/>
                Logout
              </button>
            ) : (
              <button
                className="bg-gradient-to-r flex from-yellow-300 items-center gap-3 to-pink-300 hover:from-yellow-400 hover:to-pink-400 text-black px-6 py-3 rounded-lg shadow-lg"
                onClick={() => navigate("/Login")}
              >
                <LogIn size={18}  /> Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gradient-to-r from-blue-500 to-purple-600 px-6 pb-4">
            <ul className="flex flex-col gap-4 text-lg font-medium text-white">
              <li>
                <NavLink
                  to="/"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/About"
                  onClick={() => {
                    setIsOpen;
                  }}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/About"
                  onClick={() => {
                    setIsOpen;
                  }}
                >
                  Features
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/About"
                  onClick={() => {
                    setIsOpen;
                  }}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
            <div class="space-x-4 w-full flex justify-center">
              <Link
                to="/Register"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <button class="bg-linear-to-r from-blue-200 to-indigo-300 hover:from-blue-600 hover:to-indigo-70 hover:text-white text-black px-6 py-3 rounded-lg shadow-lg">
                  Register
                </button>
              </Link>
              {/* <button class="bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
                Learn More
              </button> */}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
