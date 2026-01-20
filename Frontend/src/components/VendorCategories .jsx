import { motion } from "framer-motion";

const categories = [
  { id: 1, label: "Fruits & Vegetables", icon: "🍎" },
  { id: 2, label: "Grocery", icon: "🛒" },
  { id: 3, label: "Street Food", icon: "🍲" },
  { id: 4, label: "Local Markets", icon: "🧺" },
  { id: 5, label: "Services", icon: "🛠" },
];

const VendorCategories = ({ onSelectCategory }) => {
  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-xl md:text-2xl font-bold text-[#0F2B52] mb-5">
          Browse by Category
        </h2>

        {/* Horizontal scroll container */}
        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectCategory?.(cat.label)}
              className="
                flex items-center gap-3
                whitespace-nowrap
                rounded-full
                bg-white
                px-6 py-3
                text-base font-medium
                text-[#0F2B52]
                border border-[#0F2B52]/20
                shadow-sm
                hover:shadow-lg
                hover:ring-2 hover:ring-[#0F2B52]/30
                transition-all
              "
            >
              <span className="text-2xl">{cat.icon}</span>
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VendorCategories;
