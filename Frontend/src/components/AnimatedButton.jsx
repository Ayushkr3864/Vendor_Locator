// AnimatedLoginButton.jsx
import { motion } from "framer-motion";
import { LogIn, Loader2 } from "lucide-react";

function AnimatedLoginButton({ onClick, loading, disabled,role }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className="relative w-[80%] bg-gradient-to-r  from-green-600 to-green-700 text-white font-semibold py-3 px-6 rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ scale: loading ? 1 : 1.02 }}
      whileTap={{ scale: loading ? 1 : 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600"
        initial={{ x: "-100%" }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Button Content */}
      <span className="relative flex items-center justify-center gap-2">
        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 size={20} />
            </motion.div>
            Logging in...
          </>
        ) : (
          <>
            <LogIn size={25} />
           {role==="vendor"?"Login as vendor": "User Login"}
          </>
        )}
      </span>
    </motion.button>
  );
}

export default AnimatedLoginButton;
