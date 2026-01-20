import React, { useState } from "react";
import { motion } from "framer-motion";
import VendorNavbar from "../../components/VendorNav";

const CreateProduct = () => {
  const [productImg, setProductImg] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    available: true,
    tag: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "available" ? e.target.checked : e.target.value,
    });
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
    const Token = localStorage.getItem("token")
    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));
    if (productImg) form.append("productImg", productImg);

    const res = await fetch("http://localhost:3000/create/product", {
        method: "POST",
        headers:{"Authorization":`Bearer ${Token}`},
      body: form,
    });

    const data = await res.json();
    console.log(data);
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
        {/* Card animation */}
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
              />
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="text-white font-medium">Tags</label>
              <input
                type="text"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none"
                placeholder="E.g., electronics, fruits, clothing"
              />
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
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span className="text-white font-medium">Available</span>
            </motion.div>

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
              Create Product
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default CreateProduct;
