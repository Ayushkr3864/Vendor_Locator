import React, { useEffect, useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setcategory] = useState("All");
  const [featuredVendors, setFeaturedVendors] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages,setTotalPages] = useState(1)
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
  const limit = 6
  const fetchVendors = async (page) => {
    const res = await fetch(
      `${api}/featuredVendor?page=${page}&limit=${limit}&category=${category}`,
      {
        method: "GET",
        credentials: "include",
      },
    );
    const vendors = await res.json();
    console.log(vendors);
    
   
    setFeaturedVendors(vendors.featuredVendor);
    setTotalPages(vendors.pagination.totalPage);
  }
  useEffect(() => {
    fetchVendors(page);
  }, [page, category]);
  const getBadgeStyle = (badge) => {
    const styles = {
      "Top Seller": {
        bg: "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500",
        icon: Flame,
      },
      Trending: {
        bg: "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600",
        icon: TrendingUp,
      },
      Verified: {
        bg: "bg-gradient-to-r from-green-400 via-teal-500 to-blue-500",
        icon: Award,
      },
      New: {
        bg: "bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-500",
        icon: Sparkles,
      },
      "Top Rated": {
        bg: "bg-gradient-to-r from-red-400 via-pink-500 to-purple-500",
        icon: Star,
      },
      "Best Choice": {
        bg: "bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600",
        icon: Zap,
      },
    };
    return (
      styles[badge] || {
        bg: "bg-gradient-to-r from-gray-400 to-gray-600",
        icon: Award,
      }
    );
  };

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
              <p className="text-slate-300 ml-16 text-lg">
                ✨ Discover our top-rated trusted sellers
              </p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" />
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-emerald-600/40 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none text-slate-100"
              />
            </div>

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
                    {vendor.isActive?"Verified":"not verified"}
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
                      <div className="font-bold text-lg">{vendor.rating || 4.5}</div>
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
                  <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
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
  );;
};

export default FeaturedVendors;
