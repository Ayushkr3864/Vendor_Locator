import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Phone, Mail, ShoppingBag, Star } from "lucide-react";

const api = import.meta.env.VITE_BACKEND_URL;

const VendorDetails = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendor = async () => {
      const res = await fetch(`${api}/vendorDetails/${id}`);
        const data = await res.json();
        console.log(data);
        
        console.log(data.vendor.products);
        
      setVendor(data.vendor);
      setProducts(data.vendor.products);
      setLoading(false);
    };

    fetchVendor();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 text-white p-6">
      {/* Vendor Header */}
      <div className="max-w-6xl mx-auto bg-slate-800 rounded-3xl p-6 shadow-xl mb-10">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={vendor.vendorimg}
            alt={vendor.name}
            className="w-full md:w-64 h-64 object-cover rounded-2xl"
          />

          <div className="flex-1">
            <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {vendor.name}
            </h1>

            <p className="text-slate-300 mt-3">{vendor.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="text-emerald-400" /> {vendor.address}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-teal-400" /> {vendor.phone}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-cyan-400" /> {vendor.email}
              </div>
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" /> Rating:{" "}
                {vendor.rating || 4.5}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <ShoppingBag className="text-emerald-400" />
          Products ({products?.length})
        </h2>

        {products?.length === 0 ? (
          <p className="text-slate-400">No products available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <div
                key={product._id}
                className="bg-slate-800 rounded-2xl shadow-lg p-4 hover:shadow-emerald-500/20 transition"
              >
                <img
                  src={product.productImage}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded-xl mb-3"
                />
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-slate-400 text-sm line-clamp-2">
                  {product.productName}
                </p>

                <div className="mt-3 flex justify-between items-center">
                  <span className="text-emerald-400 font-bold">
                    ₹{product.price}
                  </span>
                  <span className="text-xs bg-slate-700 px-3 py-1 rounded-full">
                    {product.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDetails;
