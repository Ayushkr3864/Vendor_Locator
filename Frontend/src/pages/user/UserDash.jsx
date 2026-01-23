import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  User,
  MapPin,
  Heart,
  Search,
  Store,
  LogOut,
  Star,
  Compass,
} from "lucide-react";
import { motion } from "framer-motion";
// import { useAuth } from "../store/auth";
const UserDashboard = () => {
 
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col mt-20">
      {/* Header */}
      <header className="bg-green-700 text-white py-4 px-6 flex justify-between items-center shadow-lg">
        {/* Left Side */}
        <div className="flex items-center gap-2">
          <User className="w-8 h-8" />
          <h1 className="text-2xl font-semibold">User Dashboard</h1>
        </div>

        {/* Right Side: User Info + Logout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src={userData?.profileImg}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-white shadow-md"
            />
            <div className="hidden sm:block">
              <p className="font-semibold">{userData?.name}</p>
              <p className="text-xs text-gray-200">{userData?.email}</p>
            </div>
          </div>

          <motion.button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-3 py-2 rounded-xl transition text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={16} />
            Logout
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            className="bg-white p-5 rounded-2xl shadow-md flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <User className="text-green-600" /> My Info
              </h2>
              <p>
                <span className="font-medium">Name:</span> {userData?.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {userData?.email}
              </p>
              <p>
                <span className="font-medium">User ID:</span> {userData?.userId}
              </p>
              <p className="flex items-center gap-2 mt-2">
                <MapPin size={16} className="text-green-600" />
                <span>
                  {user.location.lat}, {user.location.long}
                </span>
              </p>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            className="bg-white p-5 rounded-2xl shadow-md col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Compass className="text-green-600" /> My Activity
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-100 p-4 rounded-xl text-center">
                <p className="text-2xl font-bold text-green-700">
                  {user.totalOrders}
                </p>
                <p className="text-gray-600 text-sm">Total Orders</p>
              </div>
              <div className="bg-pink-100 p-4 rounded-xl text-center">
                <p className="text-2xl font-bold text-pink-700">
                  {user.totalSaved}
                </p>
                <p className="text-gray-600 text-sm">Saved Vendors</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Nearby Vendors */}
        <motion.div
          className="bg-white mt-6 p-5 rounded-2xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Store className="text-green-600" /> Nearby Vendors
            </h2>
            <button className="flex items-center gap-2 border border-green-500 text-green-700 px-3 py-2 rounded-xl hover:bg-green-600 hover:text-white transition">
              <Search size={16} /> Find More
            </button>
          </div>

          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
            {vendors.map((vendor) => (
              <motion.div
                key={vendor.id}
                className="border rounded-xl p-4 shadow hover:shadow-lg bg-gray-50 transition"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {vendor.name}
                  </h3>
                  <span className="text-xs bg-green-200 text-green-700 px-2 py-1 rounded-lg">
                    {vendor.category}
                  </span>
                </div>
                <p className="text-gray-500 mt-1">{vendor.distance} away</p>
                <div className="flex items-center mt-2">
                  <Star className="text-yellow-500 w-4 h-4" />
                  <p className="ml-1 text-sm font-medium text-gray-600">
                    {vendor.rating} / 5
                  </p>
                </div>

                <div className="flex justify-between mt-4">
                  <button className="text-green-700 border border-green-500 px-3 py-1 rounded-lg hover:bg-green-600 hover:text-white transition text-sm">
                    View
                  </button>
                  <button className="text-pink-600 border border-pink-400 px-3 py-1 rounded-lg hover:bg-pink-600 hover:text-white transition text-sm flex items-center gap-1">
                    <Heart size={14} /> Save
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default UserDashboard;
