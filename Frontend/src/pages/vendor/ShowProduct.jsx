import React, { useEffect, useState } from "react";
import VendorNavbar from "../../components/VendorNav";
import { ShoppingBag, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3000/api";

function ShowProduct() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 6;

  // 🔹 Fetch products with pagination
  const fetchProducts = async (page) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API}/vendor/products?page=${page}&limit=${limit}`,
        { credentials: "include" },
      );

      const data = await res.json();
      setProducts(data.productFetched);
      setTotalPages(data.pagination.totalPages);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  return (
    <>
      <VendorNavbar />

      <motion.div
        className="bg-white mt-6 p-5 rounded-2xl shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ShoppingBag className="text-green-600" /> My Products
          </h2>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
            onClick={() => navigate("/create/product")}
          >
            <Upload size={16} /> Add New Product
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 rounded-l-lg">#</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Orders</th>
                <th className="p-3 rounded-r-lg text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="5" className="p-4 text-center">
                    Loading...
                  </td>
                </tr>
              )}

              {!loading && products?.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center">
                    No products found
                  </td>
                </tr>
              )}

              {products?.map((p, i) => (
                <tr
                  key={p._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{(page - 1) * limit + i + 1}</td>
                  <td className="p-3">{p.productName}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3">{p.orders || 0}</td>
                  <td className="p-3 text-right">
                    <button className="text-blue-600 hover:underline mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-5">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default ShowProduct;
