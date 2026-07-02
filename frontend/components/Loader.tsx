"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 12;

      if (value >= 100) {
        value = 100;
        clearInterval(interval);

        setTimeout(() => {
          setLoading(false);
        }, 500);
      }

      setProgress(value);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-[#F8F6F1] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
  opacity: 0,
  scale: 1.1,
  filter: "blur(10px)",
  transition: {
    duration: 0.8,
    ease: [0.76, 0, 0.24, 1],
  },
}}
        >
          <div className="flex flex-col items-center">

            {/* Logo */}

            <motion.div
              className="relative w-28 h-28 mb-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-[2px] border-[#C89A45]"
                style={{
                  borderTopColor: "transparent",
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "linear",
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl tracking-wide font-light text-[#264653]">
                  EMB
                </span>
              </div>
            </motion.div>

            {/* Title */}

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: .3,
              }}
              className="text-3xl tracking-[12px] uppercase text-[#264653]"
            >
              EMB AYUB ENTERPRISES
            </motion.h1>

            {/* Progress */}

            <div className="mt-20 w-[300px] h-[2px] bg-gray-200 rounded-full overflow-hidden">

              <motion.div
                className="h-full bg-[#C89A45]"
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  ease: "easeOut",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}