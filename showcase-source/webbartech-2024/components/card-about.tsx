"use client";

import Image from "next/image";
import { useI18n } from "@/locales/client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export const CardAbout = () => {
  const t = useI18n();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Cuando el componente se monta, activa la animación
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center pt-20 gap-12">
      {/* Imagen */}
      <motion.div
        className="w-full flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/images/banner/aboutbanner.webp"
          alt="about"
          className="w-full h-auto object-cover"
          width={2400}
          height={910}
        />
      </motion.div>
    </div>
  );
};
