import { motion } from "framer-motion";

const Loader = () => (
  <div className="flex flex-col items-center gap-4 py-12">
    <motion.div
      className="w-16 h-16 rounded-full gradient-bg-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      style={{ clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 30% 50%)" }}
    />
    <p className="text-sm text-muted-foreground animate-pulse">Removing background...</p>
  </div>
);

export default Loader;
