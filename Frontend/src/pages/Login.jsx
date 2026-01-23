import React, { useState } from "react";

import {
  faFacebook,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Store } from "lucide-react";
import { useNavigate } from "react-router";
import AnimatedLoginButton from "../components/AnimatedButton";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
const api = import.meta.env.VITE_BACKEND_URL
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 
  const navigate = useNavigate();
  const [active, setActive] = useState("user");
    const [loading, setLoading] = useState(false);
  const [showtoast, setShowtoast] = useState(false);
  const [toastType, settoastType] = useState("success")
  const [toastMessage,settoastmessage] = useState("")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleVendorLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const res = await fetch(`${api}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const res_data = await res.json();
      console.log(res_data);
      if (!res.ok) {
        settoastType("error");
        settoastmessage(res_data.message || "Invalid email or password");
        setShowtoast(true);
        localStorage.setItem("authenticate",false)
        return;
      }
      settoastType("success");
      settoastmessage("Vendor login successful");
      setShowtoast(true);
       localStorage.setItem("authenticate", true);
      setFormData({
        email: "",
        password: "",
        role: "vendor",
      });

      setTimeout(() => {
        navigate("/vendor")
        setLoading(false)
      }, 1500);
    } catch (error) {
      console.error(error);
      settoastType("error");
      settoastmessage("Something went wrong. Please try again.");
      setShowtoast(true);
      setLoading(false)
       localStorage.setItem("authenticate", false);
    } finally {
      setLoading(false)
    }
  };

 const handleUserLogin = async (e) => {
   e.preventDefault();

   try {
     setLoading(true);

     const res = await fetch(`${api}/user/login`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       credentials: "include", // 👈 cookie ke liye MUST
       body: JSON.stringify({
         email: formData.email,
         password: formData.password,
       }),
     });

     const res_data = await res.json();
     console.log(res_data);

     if (!res.ok) {
       settoastType("error");
       settoastmessage(res_data.message || "Invalid email or password");
       setShowtoast(true);
       localStorage.setItem("authenticate", false);
       return;
     }

     // ✅ success
     settoastType("success");
     settoastmessage("User login successful");
     setShowtoast(true);
     localStorage.setItem("authenticate", true);

     setFormData({
       email: "",
       password: "",
       role: "user",
     });

     setTimeout(() => {
       navigate("/"); // 
       setLoading(false);
     }, 1500);
   } catch (error) {
     console.error(error);
     settoastType("error");
     settoastmessage("Something went wrong. Please try again.");
     setShowtoast(true);
     localStorage.setItem("authenticate", false);
   } finally {
     setLoading(false);
   }
 };


  
  return (
    <>
      <Navbar />
      <div className="mt-20 mt-15 relative min-h-screen flex  flex-col justify-center items-center w-full">
        <Toast show={showtoast} message={toastMessage} type={toastType} />
        <div className="absolute inset-0">
          <img
            src="/market.png"
            alt="market background"
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="flex mb-8 rounded-lg z-10 overflow-hidden md:w-[20%] w-[80%]  border border-gray-600">
          <button
            onClick={() => setActive("user")}
            className={`w-[60%] py-3  font-semibold ${
              active === "user"
                ? "bg-green-500 text-white"
                : "bg-amber-700 text-gray-300"
            }`}
          >
            User Login
          </button>

          <button
            onClick={() => setActive("vendor")}
            className={`w-[70%] py-3 font-semibold ${
              active === "vendor"
                ? "bg-green-500 text-white"
                : "bg-amber-700 text-gray-300"
            }`}
          >
            Vendor Login
          </button>
        </div>
        <motion.div
          className="relative bg-[#23354b]/90 flex flex-col md:w-2xl h[80%] text-[#cbd3e0] p-3 md:py-10 rounded-2xl shadow-2xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: "easeOut",
              },
            },
          }}
        >
          {/* Header */}
          <motion.div
            className="flex items-center gap-x-2 justify-center border-b-amber-300 border-b-2 pb-2"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <motion.div
              initial={{ rotate: 45, x: -30, opacity: 0 }}
              animate={{ rotate: 0, x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Store size={60} color="#28a745" />
            </motion.div>
            <motion.div>
              <h1 className="text-center text-2xl font-semibold tracking-wide">
                LOGIN ACCOUNT
              </h1>
              <p className="text-center text-sm text-gray-300">
                Join to find amazing local vendors!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30, rotate: 45 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            >
              <ShoppingBag size={60} color="#28a745" />
            </motion.div>
          </motion.div>

          {/* Login Form */}
          <div className="mt-10 min-h-[260px] relative overflow-hidden">
            <Toast show={showtoast} message={toastMessage} type={toastType} />
            <AnimatePresence mode="wait">
              {active === "user" && (
                <motion.form
                  key="user-form"
                  onSubmit={handleUserLogin}
                  className="space-y-6"
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  exit={{ y: -100, opacity: 0 }}
                >
                  {/* Email + Password */}
                  <motion.div className="flex flex-col ">
                    <div className="flex  md:items-center gap-x-5 items-center justify-center  mt-5 ">
                      {" "}
                      <label className="capitalize">Email:</label>
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border w-[90%] md:w-[60%] rounded-lg focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 p-2 bg-transparent text-white"
                      />
                    </div>
                    <div className="flex  md:items-center gap-x-5 items-center justify-center  mt-5 ">
                      {" "}
                      <label className="capitalize">Password:</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border w-[90%] md:w-[60%] rounded-lg focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 p-2 bg-transparent text-white"
                      />
                    </div>
                  </motion.div>

                  {/* Submit button */}
                  <motion.div className="flex flex-col md:items-center gap-x-5 justify-center md:flex-row mt-5">
                    <AnimatedLoginButton
                      role={"user"}
                      disabled={!formData.email || !formData.password}
                      loading={loading}
                    />
                  </motion.div>
                </motion.form>
              )}
              {active === "vendor" && (
                <motion.form
                  key="vendor-form"
                  className="space-y-6"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  onSubmit={handleVendorLogin}
                  exit={{ y: 100, opacity: 0 }}
                >
                  {/* Email + Password */}
                  <motion.div className="flex flex-col ">
                    <div className="flex  md:items-center gap-x-5 items-center justify-center  mt-5 ">
                      {" "}
                      <label className="capitalize">Email:</label>
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border w-[90%] md:w-[60%] rounded-lg focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 p-2 bg-transparent text-white"
                      />
                    </div>
                    <div className="flex  md:items-center gap-x-5 items-center justify-center  mt-5 ">
                      {" "}
                      <label className="capitalize">Password:</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border w-[90%] md:w-[60%] rounded-lg focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 p-2 bg-transparent text-white"
                      />
                    </div>
                  </motion.div>

                  {/* Submit button */}
                  <motion.div className="flex flex-col md:items-center gap-x-5 justify-center md:flex-row mt-5">
                    <AnimatedLoginButton
                      onClick={handleVendorLogin}
                      role={"vendor"}
                      disabled={!formData.email || !formData.password}
                      loading={loading}
                    />
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Register Redirect */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-gray-300 text-sm">
                Don&apos;t have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-green-400 font-semibold cursor-pointer hover:underline"
                >
                  Register here
                </span>
              </p>
            </motion.div>
            {/* Google Login */}
            {/* Google Login */}
            <div className="flex justify-center mt-6">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse); 
                }}
                onError={() => {
                  console.log("Google Login Failed");
                }}
                theme="filled_green"
                size="large"
                shape="pill"
                width="300"
                text="continue_with"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Login;
