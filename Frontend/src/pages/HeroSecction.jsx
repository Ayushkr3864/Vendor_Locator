import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const floatingPin = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Animated Background */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/bgimage.png')` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0F2B52]/70 backdrop-blur-[2px]" />

      {/* Floating Pins */}
      <motion.div
        variants={floatingPin}
        animate="animate"
        className="absolute top-1/4 left-1/4 text-blue-300"
      >
        <MapPin size={36} />
      </motion.div>

      <motion.div
        variants={floatingPin}
        animate="animate"
        className="absolute top-1/3 right-1/4 text-blue-200"
      >
        <MapPin size={30} />
      </motion.div>

      <motion.div
        variants={floatingPin}
        animate="animate"
        className="absolute bottom-1/4 right-1/3 text-blue-400"
      >
        <MapPin size={40} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-3xl text-center text-white"
        >
          <motion.h1
            variants={item}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            Discover Nearby Vendors Instantly
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-lg md:text-xl text-blue-100"
          >
            Locate trusted local vendors around you in real time. Explore
            markets, compare options, and connect instantly.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl bg-blue-500 px-8 py-3 text-lg font-semibold shadow-lg hover:bg-blue-600 transition"
            >
              Get Started
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl border border-blue-300 px-8 py-3 text-lg font-semibold text-blue-100 hover:bg-blue-500/20 transition"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
