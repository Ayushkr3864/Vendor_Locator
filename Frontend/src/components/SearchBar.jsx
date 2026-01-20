import { motion } from "framer-motion";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full mx-auto mt-10 relative z-20 px-6"
    >
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0F2B52]" />
        <input
          type="text"
          placeholder="Search vendors, markets, products..."
          className="w-full rounded-xl py-4 pl-12 pr-4 text-lg shadow-lg
                     focus:outline-none focus:ring-2 focus:ring-[#0F2B52]
                     transition"
        />
      </div>
    </motion.div>
  );
};

export default SearchBar;
