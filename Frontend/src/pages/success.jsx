import { motion } from "framer-motion";
import { CheckCircle, Sparkles } from "lucide-react";

const SuccessMessage = ({
  title = "Success!",
  message = "Operation completed successfully",
  icon: Icon = CheckCircle,
  iconSize = 80,
  iconClassName = "text-green-500",
  showSparkles = true,
  titleClassName = "text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mt-6",
  messageClassName = "text-gray-600 mt-2 flex items-center gap-2",
}) => {
  return (
    <motion.div
      key="success"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 180 }}
      className="relative z-10 flex flex-col items-center justify-center py-12"
    >
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 0.6 },
          scale: { duration: 1, repeat: Infinity },
        }}
      >
        <Icon size={iconSize} className={iconClassName} />
      </motion.div>
      <motion.h2
        className={titleClassName}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className={messageClassName}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {message}
        {showSparkles && <Sparkles size={20} className="text-yellow-500" />}
      </motion.p>
    </motion.div>
  );
};

export default SuccessMessage;
