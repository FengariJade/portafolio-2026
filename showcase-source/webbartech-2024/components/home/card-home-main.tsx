"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const IMAGES = [
  "/images/home/b1.jpg",
  "/images/home/b2.jpg",
  "/images/home/b3.jpg",
  "/images/home/b4.jpg",
];

export const CardHomeMain = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % IMAGES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div className="relative w-full h-[28rem] sm:h-[32rem] md:h-[36rem] lg:h-screen overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex w-full h-[16rem] sm:h-[18rem] md:h-[22rem] lg:h-[50rem]">
          {IMAGES.map((src, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={index}
                layout
                onMouseEnter={() => {
                  setIsHovering(true);
                  setActiveIndex(index);
                }}
                onMouseLeave={() => setIsHovering(false)}
                animate={{ flex: isActive ? 3 : 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={clsx(
                  "relative overflow-hidden cursor-pointer",
                  "bg-slate-200"
                )}
              >
                <motion.img
                  src={src}
                  alt={`Imagen ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    filter: isActive ? "blur(0px)" : "blur(2px)",
                  }}
                  transition={{ duration: 0.8 }}
                />

                <motion.div
                  animate={{ opacity: isActive ? 0 : 0.4 }}
                  className="absolute inset-0 bg-black"
                />

                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 20,
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-8 left-8 text-white"
                >
                  <p className="uppercase tracking-wide text-sm opacity-80">
                    Proyecto destacado
                  </p>
                  <h2 className="text-2xl font-semibold">
                    Innovación Digital
                  </h2>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};