"use client";
import { MainCircuitLeft, MainCircuitRight } from "@/components/ui/circuits";
import clsx from "clsx";
import { useI18n } from "@/locales/client";
import { motion } from "framer-motion";
import Image from "next/image";


export const CardPortfolioMain = () => {
  const t = useI18n();
  return (
    <div className="w-full flex flex-col items-center">
      {/* 🖼️ BANNER */}
      <div className="relative w-full h-[28rem] sm:h-[32rem] md:h-[36rem] lg:h-screen">
        <Image
          src="/images/portfolio/newP/bannerP.webp"
          alt="Portfolio Banner"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* ⬇️ TEXTO FUERA DEL BANNER */}
      <div className="w-full mt-24 px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 2xl:px-40">
        <motion.h2
          initial={{ opacity: 0, scaleY: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, scaleY: 1, filter: "blur(0)" }}
          transition={{ duration: 0.75, delay: 0.5 }}
          style={{ originY: 1 }}
          className="text-center normal-case text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
        >
          {t("portfolio.subtitle")}
        </motion.h2>
      </div>
    </div>
  );
};
