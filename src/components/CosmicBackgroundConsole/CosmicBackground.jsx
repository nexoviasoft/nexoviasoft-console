"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

const CosmicBackground = () => {
  const stars = useMemo(() => {
    const rand01 = (seed) => {
      let a = seed | 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    return [...Array(50)].map((_, i) => {
      const width = 1 + rand01(i * 5 + 1) * 2;
      const height = 1 + rand01(i * 5 + 2) * 2;

      return {
        id: i,
        width: `${Number(width.toFixed(4))}px`,
        height: `${Number(height.toFixed(4))}px`,
        top: `${Number((rand01(i * 5 + 3) * 100).toFixed(4))}%`,
        left: `${Number((rand01(i * 5 + 4) * 100).toFixed(4))}%`,
        duration: Number((2 + rand01(i * 5 + 5) * 3).toFixed(4)),
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#050505] -z-10">
      {/* Premium Modern Glow Effects - Enhanced with #f58220 */}
      <motion.div
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[40%] left-1/2 -translate-x-1/2 w-[90%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(245,130,32,0.25)_0%,rgba(245,130,32,0.05)_40%,transparent_70%)] pointer-events-none will-change-transform"
      />

      {/* Secondary Ambient Glows - Stronger */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] pointer-events-none opacity-40 will-change-transform"
      >
        <div className="absolute top-[15%] left-[15%] w-[45%] h-[45%] bg-[radial-gradient(circle,rgba(245,130,32,0.15)_0%,transparent_60%)] rounded-full" />
        <div className="absolute bottom-[25%] right-[25%] w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(245,130,32,0.15)_0%,transparent_60%)] rounded-full" />
      </motion.div>

      {/* Stars Background */}
      <div className="absolute inset-0 opacity-40">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white/60 will-change-transform"
            style={{
              width: star.width,
              height: star.height,
              top: star.top,
              left: star.left,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Bottom Fade for Smooth Transition */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </div>
  );
};

export default CosmicBackground;
