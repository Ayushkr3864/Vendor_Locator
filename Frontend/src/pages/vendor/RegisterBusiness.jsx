import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../store/auth";
import {
  Store,
  MapPin,
  Upload,
  CheckCircle,
  Camera,
  X,
  Sparkles,
} from "lucide-react";
import SuccessMessage from "../success";
import { useEffect } from "react";
import VendorNavbar from "./VendordashNav";
const api = import.meta.env.VITE_BACKEND_URL;
export default function VendorShopForm() {
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    address: "",
    businessName:""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const categories = [
    "Grocery",
    "Vegetables & Fruits",
    "Bakery",
    "Meat & Fish",
    "Dairy",
    "Pharmacy",
    "Hardware",
    "Electronics",
    "Clothing",
    "Stationery",
    "Salon & Beauty",
    "Repair Services",
    "Restaurant",
    "Cafe",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      if (value.length <= 300) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setCharCount(value.length);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const { vendor, fetchUser } = useAuth();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  const vendorId = vendor?._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (image.length === 0) {
        alert("Please upload at least one shop image");
        return;
      }
      const newFormData = new FormData();
      newFormData.append("category", formData.category);
      newFormData.append("address", formData.address);
      newFormData.append("description", formData.description);
      newFormData.append("businessName",formData.businessName);
      if (image) {
        newFormData.append("shopImage", image);
      }
      setLoading(true);
      const res = await fetch(`${api}/registerBusiness/${vendorId}`, {
        method: "PUT",
        credentials: "include",
        body: newFormData,
      });
      const data = await res.json();
      console.log(data);
      
      if (!res.ok) throw new Error("unable to update profile");
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        console.log("Form submitted:", {
          ...formData,
          location,
          imagesCount: image.length,
        });

        setTimeout(() => {
          setSuccess(false);
          setFormData({ category: "", description: "", address: "" });
          setImage([]);
          setPreview([]);
          setCharCount(0);
        }, 3000);
      }, 2000);
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
      setSuccess(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition bg-white/90 backdrop-blur-sm";
  return (
    <>
      <VendorNavbar />
      <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-400 to-pink-500">
          {/* Overlay pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Floating shapes */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl"
            animate={{
              y: [0, 40, 0],
              x: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-300/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-2xl relative z-10 border border-white/20"
        >
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-orange-400 z-10 to-pink-500 rounded-full opacity-20 blur-xl" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-red-400 to-orange-500 rounded-full opacity-20 blur-xl" />

          <AnimatePresence mode="wait">
            {success ? (
              <SuccessMessage message={"Business registered successfully"} />
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 relative z-10"
              >
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <motion.div
                    className="flex justify-center mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-4 rounded-2xl shadow-lg">
                      <Store size={36} className="text-white" />
                    </div>
                  </motion.div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                    Register Your Shop
                  </h2>
                  <p className="text-gray-600 mt-2 font-medium">
                    Complete your shop details below
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-pink-500">●</span> Business Name *
                  </label>
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-3 top-3.5 text-orange-500"
                    />
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Enter business name"
                      className={`${inputClass} pl-10`}
                      required
                    />
                  </div>
                </motion.div>
                {/* Category Selection */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-orange-500">●</span> Shop Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-red-500">●</span> Shop Description *
                  </label>
                  <div className="relative">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your shop, products, and services..."
                      className={`${inputClass} min-h-32 resize-none`}
                      required
                      maxLength={300}
                    />
                    <div
                      className={`absolute bottom-3 right-3 text-xs font-semibold ${
                        charCount > 250 ? "text-orange-600" : "text-gray-500"
                      }`}
                    >
                      {charCount}/300
                    </div>
                  </div>
                </motion.div>

                {/* Address */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-pink-500">●</span> Shop Address *
                  </label>
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-3 top-3.5 text-orange-500"
                    />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter complete shop address"
                      className={`${inputClass} pl-10`}
                      required
                    />
                  </div>
                </motion.div>

                {/* Image Upload */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-red-500">●</span> Shop Image *
                  </label>

                  <label className="block cursor-pointer">
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImage}
                    />
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="border-3 border-dashed rounded-2xl p-8 text-center transition border-orange-400 bg-gradient-to-br from-orange-50 to-pink-50 hover:from-orange-100 hover:to-pink-100"
                    >
                      {preview ? (
                        <div className="relative">
                          <img
                            src={preview}
                            alt="Shop preview"
                            className="w-full h-48 object-cover rounded-xl border-2 border-orange-200 shadow-md mx-auto"
                          />
                          <div className="mt-3 text-sm font-bold text-green-600">
                            ✓ Image uploaded - Click to change
                          </div>
                        </div>
                      ) : (
                        <>
                          <Camera
                            size={40}
                            className="text-orange-600 mx-auto mb-2"
                          />
                          <p className="text-sm font-bold text-gray-700">
                            Click to upload shop image
                          </p>
                          <p className="text-xs text-orange-600 font-semibold mt-1">
                            JPG, PNG or WebP
                          </p>
                        </>
                      )}
                    </motion.div>
                  </label>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !image}
                    whileHover={{
                      scale: loading || !image ? 1 : 1.05,
                      boxShadow: "0 20px 40px rgba(249, 115, 22, 0.4)",
                    }}
                    whileTap={{ scale: loading || !image ? 1 : 0.95 }}
                    className={`w-full py-4 rounded-2xl text-white font-bold transition flex items-center justify-center gap-2 text-lg shadow-2xl ${
                      loading || !image
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600"
                    }`}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Upload size={22} />
                        Register Shop
                      </>
                    )}
                  </motion.button>
                </motion.div>

                {/* Help Text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-[15px] text-red-500 text-center font-medium"
                >
                  All fields marked with{" "}
                  <span className="text-orange-600">●</span> are required
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
