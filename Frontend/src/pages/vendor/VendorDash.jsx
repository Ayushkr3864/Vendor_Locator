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
import VendorNavbar from "./VendordashNav";
const API = import.meta.env.VITE_BACKEND_URL;
const VendorDashboard = () => {
  const { vendor, fetchUser, loading, totalProducts } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading vendor data...</div>
      </div>
    );
  }

  return (
    <>
      <VendorNavbar />
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
                {!vendor.isProfileComplete && (
                  <p className="flex items-center gap-2 mt-2">
                    <MapPin size={16} className="text-green-600" />
                    <span>
                      Register your business to featured{" "}
                      <button
                        onClick={() => navigate("/registerBusiness")}
                        className="ml-2 px-3 py-1 rounded-full
                 bg-gradient-to-r from-green-500 to-emerald-500
                 text-white text-xs font-semibold
                 hover:scale-105 transition-all duration-200
                 shadow-md hover:shadow-green-500/40"
                      >
                        Click here
                      </button>
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
                    {totalProducts || 0}
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
        </main>
      </div>
    </>
  );
};

export default VendorDashboard;
