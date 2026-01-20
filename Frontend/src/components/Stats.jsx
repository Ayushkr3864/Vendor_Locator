import { motion } from "framer-motion";

const stats = [
  { value: 500, label: "Vendors", max: 600 },
  { value: 25, label: "Markets", max: 50 },
  { value: 10000, label: "Users", max: 12000 },
];

const radius = 45;
const circumference = 2 * Math.PI * radius;

const StatCircle = ({ value, max, label }) => {
  const progress = (value / max) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex flex-col items-center"
    >
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90">
          {/* Background Circle */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="#E5ECF6"
            strokeWidth="10"
            fill="none"
          />

          {/* Animated Progress Circle */}
          <motion.circle
            cx="56"
            cy="56"
            r={radius}
            stroke="#0F2B52"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        </svg>

        {/* Value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-[#0F2B52]">
            {value >= 1000 ? `${value / 1000}k+` : `${value}+`}
          </span>
        </div>
      </div>

      <p className="mt-3 text-gray-600 font-medium">{label}</p>
    </motion.div>
  );
};

const StatsBar = () => {
  return (
    <section className="py-16 ">
      <div className=" mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          {stats.map((stat, index) => (
            <StatCircle key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
