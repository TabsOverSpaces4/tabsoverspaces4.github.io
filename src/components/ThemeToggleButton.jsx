import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggleButton({ theme, setTheme }) {
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-300 focus:outline-none"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={14} className="text-neutral-100" />
      ) : (
        <Moon size={14} className="text-neutral-900" />
      )}
    </motion.button>
  );
}
