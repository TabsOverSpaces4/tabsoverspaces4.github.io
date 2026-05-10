import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { assistAIMetrics } from "../data/portfolio";

const LatestWorkCard = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="border border-neutral-200 dark:border-neutral-800 hover:border-orange-500 dark:hover:border-orange-500 transition-colors overflow-hidden"
    >
      <Link
        to="/projects/assistai"
        className="group flex items-center justify-between px-4 py-3"
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0"
            animate={hovered ? { scale: [1, 1.6, 1] } : {}}
            transition={{ duration: 0.4 }}
          />
          <div>
            <span className="text-[12px] font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-orange-500 transition-colors">
              AssistAI
            </span>
            <span className="text-[11px] text-neutral-400 dark:text-neutral-500 ml-2">
              — Cognitive AI Usage Tracker
            </span>
          </div>
        </div>
        <ArrowUpRight
          size={13}
          className="text-neutral-400 group-hover:text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0"
        />
      </Link>

      <AnimatePresence>
        {hovered && (
          <motion.div
            key="metrics"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/60 space-y-2.5">
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
                Sample Analysis
              </p>
              {assistAIMetrics.map((metric, i) => (
                <div key={metric.label} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                      {metric.label}
                    </span>
                    <motion.span
                      className="text-[10px] font-mono text-orange-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.12 + 0.2 }}
                    >
                      {metric.value}
                    </motion.span>
                  </div>
                  <div className="h-[2px] bg-neutral-100 dark:bg-neutral-800">
                    <motion.div
                      className="h-full bg-orange-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{
                        duration: 0.7,
                        delay: i * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LatestWorkCard;
