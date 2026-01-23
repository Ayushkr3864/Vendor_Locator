import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {useNavigate} from "react-router-dom"
import Toast from "../components/Toast";
import SuccessMessage from "./success";

const API_URL = import.meta.env.VITE_BACKEND_URL;
console.log(API_URL);



const inputClass =
  "w-full rounded-xl border border-[#0F2B52]/20 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0F2B52]/30 transition";

const Register = () => {
  const [user, setUser] = useState(true);
  const [vendor, setVendor] = useState(false);
  const [preview, setPreview] = useState(null);
  const [vendorForm, setVendorForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    city: "",
  });
  const naviagte = useNavigate()
  const [userForm, setUserForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("error")
  const [success,setSuccess] = useState(false)

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVendorChange = (e) => {
    setVendorForm({ ...vendorForm, [e.target.name]: e.target.value });
  };

  const handleUserChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };


  // 🔥 LOCATION STATE
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
  });

  const [locError, setLocError] = useState("");

 const handleImage = (e) => {
   const file = e.target.files[0];
   if (file) {
     setImage(file);
     setPreview(URL.createObjectURL(file));
   }
 };
const handleVendorSubmit = async (e) => {
  e.preventDefault();
  setLoading(true)
  if (!location.lat || !location.lng) {
    alert("Please capture location");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", vendorForm.name);
    formData.append("phone", vendorForm.phone);
    formData.append("email", vendorForm.email);
    formData.append("password", vendorForm.password);
    formData.append("city", vendorForm.city);
    formData.append("lat", location.lat);
    formData.append("lng", location.lng);

    if (image) {
      formData.append("vendorimg", image);
    }
   
    
    const res = await fetch(`${API_URL}/vendor/register`, {
      method: "POST",
      body: formData, // 
    });
    console.log(res);
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    
    const data = await res.json();
    console.log(data);
    
    if (!res.ok) {
      console.log(data.message);
       setMessage(data.message);
       setType("error");
      setShow(true);
      console.log("Toast triggered:", type, message, show);
       setTimeout(() => {
         setShow(false);
       }, 2000);
      return;
    }
    setMessage(data.message);
    setType("success");
    setShow(true);
    setSuccess(true)
    setTimeout(() => {
      setShow(false);
      setSuccess(false)
      naviagte("/login")
    }, 2000);
     console.log("Toast triggered:", type, message,show);
    // alert("Vendor registered successfully 🎉");
    console.log(data);
    console.log();
    
  } catch (err) {
    console.error(err);
    setMessage("something went wrong");
    setType("error");
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 5000);
  } finally {
    setLoading(false);
  }
};
const handleUserSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", userForm.name);
    formData.append("phone", userForm.phone);
    formData.append("email", userForm.email);
    formData.append("password", userForm.password);

    if (image) {
      formData.append("avatar", image);
    }

    const res = await fetch(`${API_URL}/user/register`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data.message);
      setMessage(data.message);
      setType("error");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);
      return; 
    }
     setMessage(data.message);
     setType("success");
     setShow(true);
    setSuccess(true);
    setUserForm({
      name: "",
      phone: "",
      email: "",
      password: "",
    });
     setTimeout(() => {
       setShow(false);
       setSuccess(false);
       naviagte("/login");
     }, 2000);
  } catch (err) {
    console.error(err);
     console.error(err);
     setMessage("something went wrong");
     setType("error");
     setShow(true);
     setTimeout(() => {
       setShow(false);
     }, 5000);
  } finally {
    setLoading(false);
  }
};
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLocError("");
        console.log(pos);
        
      },
      () => {
        setLocError("Location permission denied");
      }
    );
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#D6E6FF] via-[#CFE1FF] to-white px-4">
        <Toast type={type} show={show} message={message} />
        <AnimatePresence>
          {" "}
          {success ? (
            <SuccessMessage message={"Regitered successfully 🎉 "} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-md bg-white/70 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_rgba(15,43,82,0.2)] p-8"
            >
              {/* 🔘 Toggle Buttons */}
              <div className="relative flex mb-8 bg-[#EAF1FF] rounded-2xl p-1">
                <motion.div
                  layout
                  className="absolute top-1 bottom-1 w-1/2 rounded-xl bg-[#0F2B52]"
                  initial={false}
                  animate={{ x: user ? "0%" : "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />

                <button
                  onClick={() => {
                    setUser(true);
                    setVendor(false);
                  }}
                  className={`relative z-10 w-1/2 py-3 font-semibold transition ${
                    user ? "text-white" : "text-[#0F2B52]"
                  }`}
                >
                  User
                </button>

                <button
                  onClick={() => {
                    setVendor(true);
                    setUser(false);
                  }}
                  className={`relative z-10 w-1/2 py-3 font-semibold transition ${
                    vendor ? "text-white" : "text-[#0F2B52]"
                  }`}
                >
                  Vendor
                </button>
              </div>

              <AnimatePresence mode="wait">
                {user && (
                  <motion.form
                    key="user"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                    onSubmit={handleUserSubmit}
                  >
                    <h2 className="text-2xl font-bold text-[#0F2B52] text-center">
                      Create User Account
                    </h2>

                    <label className="block text-center cursor-pointer">
                      <input
                        type="file"
                        name="avatar"
                        hidden
                        accept="image/*"
                        onChange={handleImage}
                      />
                      <div className="mx-auto h-24 w-24 rounded-full border flex items-center justify-center overflow-hidden">
                        {preview ? (
                          <img
                            src={preview}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-sm text-gray-500">
                            Upload Photo
                          </span>
                        )}
                      </div>
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={userForm.name}
                      onChange={handleUserChange}
                      className={inputClass}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={userForm.phone}
                      onChange={handleUserChange}
                      placeholder="Phone Number"
                      className={inputClass}
                    />
                    <input
                      type="email"
                      name="email"
                      value={userForm.email}
                      onChange={handleUserChange}
                      placeholder="Email"
                      className={inputClass}
                    />
                    <input
                      type="password"
                      name="password"
                      value={userForm.password}
                      onChange={handleUserChange}
                      placeholder="Password"
                      className={inputClass}
                    />

                    <motion.button
                      className={`w-full rounded-xl bg-[#0F2B52] py-3 ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#0F2B52] hover:bg-[#0a1f3d]"
                      } text-white font-semibold`}
                      disabled={loading}
                    >
                      {loading ? "Registering...." : " Register User"}
                    </motion.button>
                  </motion.form>
                )}

                {/*  VENDOR FORM */}
                {vendor && (
                  <motion.form
                    key="vendor"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                    onSubmit={handleVendorSubmit}
                  >
                    <h2 className="text-2xl font-bold text-[#0F2B52] text-center">
                      Register
                    </h2>

                    {/* Image Upload */}
                    <label className="block text-center cursor-pointer">
                      <input
                        type="file"
                        hidden
                        name="vendorimg"
                        accept="image/*"
                        onChange={handleImage}
                      />
                      <div className="mx-auto h-24 w-24 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#0F2B52] transition flex items-center justify-center overflow-hidden">
                        {preview ? (
                          <img
                            src={preview}
                            alt="Shop preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="text-center">
                            <span className="text-sm text-gray-500">
                              Upload Shop Image
                            </span>
                          </div>
                        )}
                      </div>
                    </label>

                    {/* Form Fields */}
                    <input
                      type="text"
                      name="name"
                      value={vendorForm.name}
                      onChange={handleVendorChange}
                      placeholder="Name"
                      className={inputClass}
                      required
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={vendorForm.phone}
                      onChange={handleVendorChange}
                      placeholder="Phone Number"
                      className={inputClass}
                      required
                    />

                    <input
                      type="email"
                      name="email"
                      value={vendorForm.email}
                      onChange={handleVendorChange}
                      placeholder="Email"
                      className={inputClass}
                      required
                    />

                    <input
                      type="password"
                      name="password"
                      value={vendorForm.password}
                      onChange={handleVendorChange}
                      placeholder="Password"
                      className={inputClass}
                      required
                      minLength={6}
                    />

                    <input
                      type="text"
                      name="city"
                      value={vendorForm.city}
                      onChange={handleVendorChange}
                      placeholder="City"
                      className={inputClass}
                      required
                    />
                    {/* Location Button */}
                    <motion.button
                      type="button"
                      onClick={handleGetLocation}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={location.lat !== null}
                      className={`w-full border-2 py-2 rounded-xl font-semibold transition ${
                        location.lat
                          ? "border-green-500 text-green-600 bg-green-50"
                          : "border-[#0F2B52] text-[#0F2B52] hover:bg-[#0F2B52] hover:text-white"
                      }`}
                    >
                      {location.lat
                        ? "Location Captured ✓"
                        : "📍 Use My Location"}
                    </motion.button>

                    {location.lat && (
                      <p className="text-sm text-green-600 text-center font-medium">
                        ✔ Location: {location.lat.toFixed(4)},{" "}
                        {location.lng.toFixed(4)}
                      </p>
                    )}

                    {locError && (
                      <p className="text-sm text-red-500 text-center">
                        {locError}
                      </p>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={loading || !location.lat}
                      whileHover={{ scale: loading ? 1 : 1.04 }}
                      whileTap={{ scale: loading ? 1 : 0.96 }}
                      className={`w-full rounded-xl py-3 text-white font-semibold transition ${
                        loading || !location.lat
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#0F2B52] hover:bg-[#0a1f3d]"
                      }`}
                    >
                      {loading ? "Registering..." : "Register Vendor"}
                    </motion.button>

                    {/* Terms & Conditions */}
                    <p className="text-xs text-gray-500 text-center">
                      By registering, you agree to our{" "}
                      <a href="#" className="text-[#0F2B52] underline">
                        Terms & Conditions
                      </a>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Register;
