import React, { useState } from "react";
import { motion } from "framer-motion";
import VendorNavbar from "./VendordashNav";
import SuccessMessage from "../success";
const api = import.meta.env.VITE_BACKEND_URL;
import Toast from "../../components/Toast";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const Tags = [
  "new",
  "popular",
  "featured",
  "bestseller",
  "trending",
  "veg",
  "non-veg",
  "premium",
  "budget",
  "discounted",
  "on-sale",
  "free-delivery",
  "same-day-delivery",
  "local-vendor",
  "verified-vendor",
  "eco-friendly",
  "handcrafted",
];
const CreateProduct = () => {
  const navigate = useNavigate();
  const { Logout } = useAuth();
  const [productImg, setProductImg] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showtoast, setShowtoast] = useState(false);
  const [toastType, settoastType] = useState("success");
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    available: false,
    tag: "",
    quantity: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheck = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
    setCheck(e.target.checked);
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImg(file);
    setPreview(URL.createObjectURL(file));
  };
  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append("tag", formData.tag);
      form.append("available", formData.available);
      form.append("price", formData.price);
      form.append("productName", formData.productName);
      if (productImg) form.append("productImage", productImg);

      const res = await fetch(`${api}/addProduct`, {
        method: "POST",
        credentials: "include",
        body: form,
      });
      const data = await res.json();
      console.log(res);

      if (!res.ok) {
        if (!res.ok) {
          settoastType("error");
          setMessage(data.message || "Invalid email or password");
          setShowtoast(true);
          setTimeout(() => {
            setShowtoast(false);
          }, 2000);
          if (
            res.status == 401 &&
            data.message == "Token expired please login again"
          ) {
            setTimeout(() => {
              Logout();
              navigate("/login");
            }, 3000);
          }
          return;
        }
      }
      setTimeout(() => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setLoading(false);
          setFormData({
            productName: "",
            price: "",
            available: "",
            tag: "",
          });
          setProductImg(null);
          setPreview(null);
        }, 3000);
      }, 2000);

      console.log(data);
    } catch (e) {
      console.error(e.message);
      setMessage(e.message);
      setShowtoast(true);
      settoastType("failed");
    } finally {
      setLoading(false);
      setSuccess(false);
    }
  };
  return (
    <>
      <VendorNavbar />

      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-6"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <Toast message={message} type={toastType} show={showtoast} />

        {/* Card animation */}
        {success ? (
          <SuccessMessage message={"Product Listed Successfully 🎉"} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/20 backdrop-blur-xl border border-white/30 max-w-lg w-full p-8 rounded-2xl shadow-xl"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl text-white font-bold text-center mb-6"
            >
              Add New Product
            </motion.h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Product Name */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="text-white font-medium">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none"
                  placeholder="Enter product name"
                  required
                />
              </motion.div>

              {/* Price */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="text-white font-medium">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none"
                  placeholder="Enter price"
                  required
                />
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="text-white font-medium">Tags</label>
                <select
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-white/20 text-black placeholder-white/70 outline-none"
                  required
                >
                  <option value="">Select a tag</option>
                  {Tags.map((tag, index) => (
                    <option key={index} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Availability */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleCheck}
                  className="w-5 h-5"
                />
                <span className="text-white font-medium">Available</span>
              </motion.div>
              {/* quantity */}
              {check && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="text-white font-medium">Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none"
                    placeholder="Enter Quantity"
                    required
                  />
                </motion.div>
              )}
              {/* Image Upload */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <label className="text-white font-medium">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-white mt-2"
                />

                {preview && (
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={preview}
                    alt="preview"
                    className="w-32 h-32 rounded-lg object-cover mt-4 border border-white/40 shadow-lg"
                  />
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                type="submit"
                className="w-full py-3 bg-white/30 hover:bg-white/50 transition text-white font-semibold rounded-lg shadow-lg backdrop-blur-lg"
              >
                {loading ? "adding...." : "Add product"}
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default CreateProduct;
