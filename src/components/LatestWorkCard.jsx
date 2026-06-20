import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const FLOW = ["Webhook", "Intake", "Master", "Tools"];
const SAMPLE = {
  message: "Add Aanya's birthday to my calendar on 22nd July",
  result: "Calendar event · Aanya's Birthday · Jul 22 · All day",
};

const LatestWorkCard = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="border border-neutral-200 dark:border-neutral-800 hover:border-orange-500 dark:hover:border-orange-500 transition-colors overflow-hidden"
    >
      <Link
        to="/projects/chief-of-staff"
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
              Chief of Staff
            </span>
            <span className="text-[11px] text-neutral-400 dark:text-neutral-500 ml-2">
              — A Local-First Personal AI
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
            key="flow"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/60 space-y-3">
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
                Sample Run
              </p>

              <p className="text-[10.5px] font-mono text-neutral-500 dark:text-neutral-400">
                <span className="text-orange-500">›</span> {SAMPLE.message}
              </p>

              <div className="flex items-center gap-1.5">
                {FLOW.map((step, i) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <motion.span
                      className="text-[9px] font-mono px-1.5 py-0.5 border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {step}
                    </motion.span>
                    {i < FLOW.length - 1 && (
                      <span className="text-neutral-300 dark:text-neutral-700 text-[9px]">
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <motion.p
                className="text-[10px] font-mono text-orange-500 pt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                ✓ {SAMPLE.result}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LatestWorkCard;
