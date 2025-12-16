import { motion } from "framer-motion";

function AskHint() {
  const isMac = navigator.platform.toUpperCase().includes("MAC");
  const shortcut = isMac ? "⌘ K" : "Ctrl K";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
      className="
	  hidden md:flex
        fixed bottom-4 right-4 z-50
        rounded-xl
        bg-neutral-900 text-neutral-100
        dark:bg-neutral-100 dark:text-neutral-900
        px-4 py-2
        text-xs md:text-sm
        shadow-lg
        pointer-events-none
      "
    >
      <span className="font-medium">{shortcut}</span>
      <span className="opacity-80 pl-1">to ask me anything</span>
    </motion.div>
  );
}
export default AskHint;