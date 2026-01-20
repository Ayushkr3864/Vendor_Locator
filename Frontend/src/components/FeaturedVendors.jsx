import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";

const vendors = [
  {
    id: 1,
    name: "Green Fresh Veggies",
    category: "Fruits & Vegetables",
    distance: "0.8 km",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800",
  },
  {
    id: 2,
    name: "Street Bites Corner",
    category: "Street Food",
    distance: "1.2 km",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1555992336-03a23c7b20e4?q=80&w=800",
  },
  {
    id: 3,
    name: "Daily Needs Store",
    category: "Grocery",
    distance: "2.1 km",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=800",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

const FeaturedVendors = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F2B52] mb-10">
          Featured Vendors
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {vendors.map((vendor, i) => (
            <motion.div
              key={vendor.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                rotateX: 5,
                rotateY: -5,
                scale: 1.03,
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#0F2B52]/10 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="inline-block mb-2 rounded-full bg-[#0F2B52]/10 px-3 py-1 text-sm text-[#0F2B52]">
                  {vendor.category}
                </span>

                <h3 className="text-lg font-semibold text-[#0F2B52]">
                  {vendor.name}
                </h3>

                <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} className="text-[#0F2B52]" />
                    {vendor.distance}
                  </div>

                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500" />
                    {vendor.rating}
                  </div>
                </div>

                <button className="mt-5 w-full rounded-xl bg-[#0F2B52] py-2 text-white font-semibold hover:opacity-90 transition">
                  View on Map
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVendors;
