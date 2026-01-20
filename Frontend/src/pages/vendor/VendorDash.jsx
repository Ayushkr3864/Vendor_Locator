import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Store,
  MapPin,
  ShoppingBag,
  Edit,
  Upload,
  BarChart3,
} from "lucide-react";
import StatusBadge from "../../components/StatusBadge";
import ActiveBadge from "../../components/ActiveBadge";
import VendorNavbar from "../../components/VendorNav";
const VendorDashboard = () => {
  const { vendor, fetchUser, loading } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: "$50", orders: 10 },
    { id: 2, name: "Product 2", price: "$30", orders: 5 },
  ]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading vendor data...</div>
      </div>
    );
  }

  return (
    <>
      <VendorNavbar/>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <motion.div
              className="bg-white p-5 rounded-2xl shadow-md flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Store className="text-green-600" /> Vendor Info
                  </h2>
                  <h2>
                    <StatusBadge status={vendor?.isProfileComplete} />
                  </h2>
                </div>
                <div className="flex justify-between mb-2">
                  <p>
                    <span className="font-medium">Name:</span> {vendor?.name}
                  </p>
                  <ActiveBadge isActive={vendor?.isActive} />
                </div>
                <p className="mb-1">
                  <span className="font-medium">Category:</span>{" "}
                  {vendor?.category}
                </p>
                <p className="mb-1">
                  <span className="font-medium">Email:</span> {vendor?.email}
                </p>
                <p className="mb-1">
                  <span className="font-medium">City:</span> {vendor?.city}
                </p>
                <p className="mb-1">
                  <span className="font-medium">Contact:</span> {vendor?.phone}
                </p>
                {vendor?.location && (
                  <p className="flex items-center gap-2 mt-2">
                    <MapPin size={16} className="text-green-600" />
                    <span>
                      {vendor?.location.lat}, {vendor?.location.long}
                    </span>
                  </p>
                )}
              </div>

              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2"
                onClick={() => navigate("/registerBusiness")}
              >
                <Edit size={16} /> Edit Profile
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="bg-white p-5 rounded-2xl shadow-md col-span-1 md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <BarChart3 className="text-green-600" /> Business Stats
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-100 p-4 rounded-xl text-center">
                  <p className="text-2xl font-bold text-green-700">
                    {vendor?.totalSales || 0}
                  </p>
                  <p className="text-gray-600 text-sm">Total Sales</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl text-center">
                  <p className="text-2xl font-bold text-blue-700">
                    {vendor?.totalProducts || 0}
                  </p>
                  <p className="text-gray-600 text-sm">Products</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl text-center">
                  <p className="text-2xl font-bold text-yellow-700">
                    {vendor?.totalViews || 0}
                  </p>
                  <p className="text-gray-600 text-sm">Views</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product List */}
          <motion.div
            className="bg-white mt-6 p-5 rounded-2xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
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
                  {products.map((p, i) => (
                    <tr
                      key={p.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3">{i + 1}</td>
                      <td className="p-3">{p.name}</td>
                      <td className="p-3">{p.price}</td>
                      <td className="p-3">{p.orders}</td>
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
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default VendorDashboard;
