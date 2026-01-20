import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Modal state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addSuccess, setAddSuccess] = useState(false);
  // Fetch Products
    const fetchProducts = async () => {
      const Token = localStorage.getItem("token")
    try {
        const res = await fetch("http://localhost:3000/explore/product", {
            method: "get",
            headers:{"Authorization":`Bearer ${Token}`}
      });
        const data = await res.json();
        console.log(data);
      setProducts(data.allProduct);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add to cart animation
  const handleAddToCart = () => {
    setAddSuccess(true);
    setTimeout(() => {
      setAddSuccess(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-8">
      <h1 className="text-4xl font-extrabold text-white text-center mb-10 drop-shadow-lg">
        Featured Products
      </h1>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            className="rounded-2xl overflow-hidden shadow-xl border border-white/20
                       bg-white/10 backdrop-blur-2xl hover:shadow-2xl cursor-pointer"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              rotateX: 8,
              rotateY: -8,
              scale: 1.06,
            }}
            onClick={() => setSelectedProduct(product)}
          >
            {/* Product Image */}
            <div className="h-48 w-full overflow-hidden">
              {product.productImg ? (
                <motion.img
                  src={product.productImg}
                  alt="product"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.4 }}
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-700 font-medium">
                  No Image
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 text-white">
              <h2 className="text-xl font-bold mb-1 drop-shadow-md">
                {product.productName}
              </h2>
              <p className="opacity-90">
                Price: <span className="font-semibold">₹{product.price}</span>
              </p>

              <span
                className="inline-block mt-3 px-3 py-1 text-sm font-medium rounded-full 
                               bg-white/30 text-white shadow-md backdrop-blur-lg"
              >
                {product.tag}
              </span>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className="mt-4 w-full py-2 rounded-xl bg-white text-purple-600 font-bold text-lg hover:bg-gray-100 transition shadow-md"
              >
                {addSuccess ? "✔ Added!" : "Add to Cart"}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 160 }}
            className="bg-white/20 backdrop-blur-xl border border-white/30 p-6 rounded-2xl w-[90%] max-w-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <img
              src={selectedProduct.productImg}
              alt="product"
              className="w-full h-56 object-cover rounded-xl mb-4"
            />

            <h2 className="text-3xl font-bold text-white drop-shadow-md">
              {selectedProduct.productName}
            </h2>
            <p className="text-white/90 mt-2">
              Price:{" "}
              <span className="text-white font-bold">
                ₹{selectedProduct.price}
              </span>
            </p>

            <p
              className={`mt-2 font-semibold ${
                selectedProduct.available ? "text-green-300" : "text-red-300"
              }`}
            >
              {selectedProduct.available ? "🟢 In Stock" : "🔴 Out of Stock"}
            </p>

            {/* Tag */}
            <div className="mt-3 inline-block px-4 py-1 rounded-full bg-white/30 text-white backdrop-blur-xl shadow-md">
              {selectedProduct.tag}
            </div>

            {/* Add to Cart in Modal */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="mt-5 w-full py-3 bg-white rounded-xl text-purple-600 text-lg font-bold shadow-md"
            >
              Add to Cart
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
export default ProductList;
