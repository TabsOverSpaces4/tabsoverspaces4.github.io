import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Briefcase,
  GraduationCap,
  Code2,
  FolderOpen,
} from "lucide-react";

const navItems = [
  { id: "ask", label: "Ask Me", icon: Sparkles },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "work", label: "Works", icon: FolderOpen },
];

const positions = [
  { top: "16%", left: "50%" },
  { top: "42%", left: "27%" },
  { top: "42%", left: "73%" },
  { top: "70%", left: "27%" },
  { top: "70%", left: "73%" },
];

const circleVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.05 + i * 0.06,
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  }),
  exit: { scale: 0, opacity: 0, transition: { duration: 0.12 } },
};

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { delay: 0.35, duration: 0.5, ease: "easeOut" },
  },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

export default function ImageNavOverlay({ onAskClick }) {
  const [active, setActive] = useState(false);

  const handleAction = (item) => {
    if (item.id === "ask") {
      onAskClick();
    } else {
      document.getElementById(item.id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setActive(false);
  };

  return (
    <div
      className="absolute inset-0 z-10"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => {
        if (!active) setActive(true);
      }}
    >
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-neutral-950/55 backdrop-blur-[3px]"
            onClick={(e) => {
              e.stopPropagation();
              setActive(false);
            }}
          >
            {/* Connecting lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Center to each node */}
              {positions.map((pos, i) => (
                <motion.line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={pos.left}
                  y2={pos.top}
                  stroke="rgba(249,115,22,0.12)"
                  strokeWidth="1"
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                />
              ))}
            </svg>

            {/* Center dot */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500/30 pointer-events-none"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />

            {/* Nav circles */}
            {navItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  custom={i}
                  variants={circleVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 group/nav"
                  style={{ top: positions[i].top, left: positions[i].left }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(item);
                  }}
                >
                  <div className="w-13 h-13 md:w-16 md:h-16 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/[0.12] flex items-center justify-center group-hover/nav:border-orange-500/60 group-hover/nav:bg-orange-500/10 transition-all duration-300 shadow-lg shadow-black/20">
                    <Icon
                      size={20}
                      className="text-neutral-300 group-hover/nav:text-orange-500 transition-colors duration-300"
                    />
                  </div>
                  <span className="text-[8px] md:text-[10px] font-mono uppercase tracking-wider text-neutral-400 group-hover/nav:text-orange-500 transition-colors duration-300 whitespace-nowrap select-none">
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
