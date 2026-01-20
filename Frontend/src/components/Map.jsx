import { motion } from "framer-motion";

const MapSection = () => {
  return (
    <section className="py-20 bg-[#0F2B52]/5">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6"
      >
        <h2 className="text-3xl font-bold text-[#0F2B52] text-center mb-8">
          Vendors Near You
        </h2>

        <div className="overflow-hidden rounded-2xl shadow-xl">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=local%20market&output=embed"
            className="w-full h-[450px]"
            loading="lazy"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default MapSection;
