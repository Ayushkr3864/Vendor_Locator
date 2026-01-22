import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom"
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Award,
  TrendingUp,
  ShoppingBag,
  ChevronRight,
  Search,
  Filter,
  Sparkles,
  Flame,
  Zap,
} from "lucide-react";
const api = import.meta.env.VITE_BACKEND_URL
// Mock data - replace with actual API call


const FeaturedVendors = () => {
  const [category, setcategory] = useState("All");
  const [featuredVendors, setFeaturedVendors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [location, setLocation] = useState({ lat: null, long: null });
  const [locationStatus, setLocationStatus] = useState("idle");
const navigate = useNavigate()
  const categories = [
    "All",
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
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("denied");
      return;
    }

    setLocationStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        setLocationStatus("granted");
        console.log(
          ("lat", position.coords.latitude, "long", position.coords.longitude),
        );
        
      },
      () => {
        setLocationStatus("denied");
      },
    );
  };

  const limit = 6;
  const fetchVendors = async (page) => {
    let url = `${api}/featuredVendor?page=${page}&limit=${limit}&category=${category}`;

    if (location.lat && location.long) {
      url += `&lat=${location.lat}&long=${location.long}&distance=5`;
    }

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    const vendors = await res.json();
    setFeaturedVendors(vendors.featuredVendor);
    setTotalPages(vendors.pagination.totalPage);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      (error) => {
        console.log("Location error:", error.message);
      },
    );
  }, []);

  useEffect(() => {
    fetchVendors(page);
  }, [page, category, location.lat, location.long]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 text-slate-100">
      {/* Animated Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative bg-slate-900/80 backdrop-blur-xl shadow-2xl sticky top-0 z-20 border-b-4 border-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg">
                  <Award className="text-white" size={32} />
                </div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Featured Vendors
                </h1>
              </div>
              {/* 📍 Location Banner */}

              <p className="text-slate-300 ml-16 text-lg">
                ✨ Discover our top-rated trusted sellers
              </p>
            </div>
            <div className="mb-6">
              {locationStatus !== "granted" ? (
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-yellow-500/10 border border-yellow-400/30 rounded-2xl p-5">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-yellow-400" />
                    <p className="text-yellow-300 font-semibold">
                      Enable location to see nearby vendors
                    </p>
                  </div>

                  <button
                    onClick={detectLocation}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-xl hover:opacity-90 transition"
                  >
                    {locationStatus === "loading"
                      ? "Detecting..."
                      : "Enable Location"}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-400/30 rounded-2xl p-4">
                  <MapPin className="text-emerald-400" />
                  <p className="text-emerald-300 font-semibold">
                    Showing vendors near you
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 bg-slate-800 px-6 py-3 rounded-full border border-emerald-500/30 shadow-lg">
              <Sparkles className="text-emerald-400" size={22} />
              <span className="font-bold text-lg bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {featuredVendors.length} Premium Vendors
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 mb-10 border border-emerald-500/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}

            {/* Category */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" />
              <select
                value={category}
                onChange={(e) => setcategory(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-cyan-600/40 rounded-xl outline-none text-slate-100"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {category == "All" ? (
              ""
            ) : (
              <button
                onClick={() => {
                  setcategory("All");
                  setPage(1);
                }}
                disabled={category == "All"}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl
             bg-slate-700/80 hover:bg-slate-600
             border border-slate-500/50
             text-slate-200 font-semibold
             transition-all duration-200
             hover:shadow-lg hover:shadow-emerald-500/20"
              >
                <Filter size={18} className="text-emerald-400" />
                Clear Filters
              </button>
            )}

            {/* Sort */}
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVendors?.map((vendor, index) => {
            // const badgeStyle = getBadgeStyle(vendor.badge);
            // const BadgeIcon = badgeStyle.icon;

            return (
              <div
                key={vendor._id}
                className="bg-slate-800 rounded-3xl shadow-xl hover:shadow-emerald-500/20 transition-all duration-500 overflow-hidden group hover:-translate-y-2 border border-transparent hover:border-emerald-500/40"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={vendor.vendorimg}
                    alt={vendor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                  <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    {/* <BadgeIcon size={16} /> */}
                    {vendor.isActive ? "Verified" : "not verified"}
                  </div>

                  {/* <div className="absolute bottom-4 left-4 bg-slate-900/90 px-4 py-2 rounded-full flex items-center gap-2">
                    <Star
                      className="text-yellow-400"
                      size={18}
                      fill="currentColor"
                    />
                    <span className="font-bold">{vendor.rating}</span>
                  </div> */}
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    {vendor.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm mb-3">
                    <span className="px-3 py-1 rounded-full bg-slate-700 text-emerald-300 font-semibold">
                      {vendor.category}
                    </span>

                    {vendor.distance !== undefined && (
                      <span className="flex items-center gap-1 text-cyan-300 font-medium">
                        <MapPin size={14} />
                        {vendor.distance.toFixed(1)} km away
                      </span>
                    )}
                  </div>

                  <p className="text-slate-300 text-sm mb-5 line-clamp-2">
                    {vendor.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-slate-700 rounded-xl p-3 text-center">
                      <ShoppingBag className="mx-auto text-emerald-400 mb-1" />
                      <div className="font-bold text-lg">
                        {vendor.totalProducts || 20}
                      </div>
                      <p className="text-xs text-slate-400">Products</p>
                    </div>
                    <div className="bg-slate-700 rounded-xl p-3 text-center">
                      <Award className="mx-auto text-cyan-400 mb-1" />
                      <div className="font-bold text-lg">
                        {vendor.rating || 4.5}
                      </div>
                      <p className="text-xs text-slate-400">Rating</p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="space-y-2 mb-5 text-sm">
                    <div className="flex items-center gap-3">
                      <MapPin className="text-emerald-400" size={16} />
                      <span className="truncate">{vendor.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="text-teal-400" size={16} />
                      <span>{vendor.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="text-cyan-400" size={16} />
                      <span>{vendor.email}</span>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                    onClick={() => navigate(`/vendor/${vendor._id}`)}
                  >
                    View Store
                    <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {featuredVendors.length === 0 && (
          <div className="text-center py-20 bg-slate-800 rounded-3xl shadow-xl mt-10">
            <Search size={80} className="mx-auto text-slate-500 mb-4" />
            <h3 className="text-3xl font-bold text-emerald-400 mb-2">
              No vendors found
            </h3>
            <p className="text-slate-400">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
          {/* Prev */}
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="
      px-6 py-3 rounded-xl font-semibold
      bg-gradient-to-r from-emerald-600 to-teal-600
      text-white shadow-lg
      hover:from-emerald-500 hover:to-teal-500
      transition-all duration-300
      disabled:opacity-40 disabled:cursor-not-allowed
    "
          >
            ← Previous
          </button>

          {/* Page Info */}
          <span
            className="text-sm font-semibold bg-slate-800/80 px-4 py-2 rounded-full
                   border border-emerald-500/30 text-emerald-300"
          >
            Page {page} of {totalPages}
          </span>

          {/* Next */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="
      px-6 py-3 rounded-xl font-semibold
      bg-gradient-to-r from-teal-600 to-cyan-600
      text-white shadow-lg
      hover:from-teal-500 hover:to-cyan-500
      transition-all duration-300
      disabled:opacity-40 disabled:cursor-not-allowed
    "
          >
            Next →
          </button>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default FeaturedVendors;
