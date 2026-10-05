"use client";
import { MainCircuitLeft, MainCircuitRight } from "@/components/ui/circuits";
import clsx from "clsx";
import { useI18n } from "@/locales/client";
import { motion } from "framer-motion";
import Image from "next/image";

export const CardContactMain = () => {
  const t = useI18n();
  return (
    <div className="relative h-[28rem] sm:h-[32rem] md:h-[36rem] lg:h-screen w-full bg-slate-100">
      <Image
        src="/images/contactanos/BannerContactanos.webp"
        alt="Contact banner"
        fill
        priority
        className="
          object-contain
          object-center
        "
      />
    </div>
  );
};
