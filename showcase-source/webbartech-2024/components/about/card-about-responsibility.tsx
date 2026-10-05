"use client";

import Image from "next/image";
import clsx from "clsx";
import { responsabilities } from "@/data/information";
import { useI18n } from "@/locales/client";
import { CircleScrollProgress, CircleScrollProgressNew } from "@/components/ui/circle";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconRotate } from "@/components/ui/icon-rotate";
import { useMediaQuery } from "react-responsive";

export const CardAboutResponsablility = () => {
  const t = useI18n();
  const items = responsabilities.items;

  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  const getVisibleItems = () => {
    const prev = (selectedIndex - 1 + items.length) % items.length;
    const next = (selectedIndex + 1) % items.length;
    return [prev, selectedIndex, next];
  };

  const isMobile = useMediaQuery({ maxWidth: 767 });

  // 👇 Auto-cambio cada 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="w-full relative h-auto flex flex-col items-center justify-center py-28">
      {/* Contenedor título + engranajes */}
      <div className="flex items-center justify-center gap-8 relative w-full">

        {/* Título */}
        <h2 className="text-center uppercase text-slate-800 font-semibold">
          <span className="title_font_dm block text-[1.8rem] md:text-[2.8rem] xl:text-[4.8rem] leading-tight">
            {t(responsabilities.title.first as keyof typeof t)}
          </span>
          <span className="title_font_dm block text-[1.8rem] md:text-[2.8rem] xl:text-[4.8rem] leading-tight">
            {t(responsabilities.title.second as keyof typeof t)}
          </span>
        </h2>
       
      </div>

      {/* Slider */}
      <div className="mt-40 mb-38 flex items-center justify-center w-full px-20">
        <div className="relative flex items-center justify-center w-full h-[500px]">
          {getVisibleItems().map((itemIndex, position) => {
            const item = items[itemIndex];
            const isSelected = itemIndex === selectedIndex;

            const offset = position - 1;

            return (
              <motion.div
                key={itemIndex}
                onClick={() => handleSelect(itemIndex)}
                initial={false}
                animate={{
                  scale: isSelected ? 1.1 : 1,
                  x: offset * (isMobile ? 220 : 650),
                  opacity: isSelected ? 1 : 0.6,
                  zIndex: isSelected ? 20 : 10,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="absolute flex flex-col items-center text-center cursor-pointer max-w-xs md:max-w-md"
              >
                <div className="relative flex flex-col items-center justify-center">
                  {isSelected && (
                    <div className="absolute -z-10 scale-[2.2]">
                      <CircleScrollProgressNew />
                    </div>
                  )}

                  <Image
                    src={item.icon as string}
                    width={isSelected ? 150 : 90}
                    height={isSelected ? 150 : 90}
                    alt={t(item.title as keyof typeof t)}
                    className={clsx(
                      "transition-all duration-500 invert",
                      isSelected
                        ? "w-[7.5rem] h-[7.5rem] lg:w-[9rem] lg:h-[9rem]"
                        : "w-[4.5rem] h-[4.5rem] lg:w-[6.5rem] lg:h-[6.5rem]"
                    )}
                  />
                  <h4
                    className={clsx(
                      "text-slate-900 font-bold mt-6 transition-all duration-500",
                      isSelected ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                    )}
                  >
                    {t(item.title as keyof typeof t)}
                  </h4>
                  {isSelected && (
                    <p className="text-slate-600 font-light mt-4 text-lg md:text-xl max-w-md">
                      {t(item.description as keyof typeof t)}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
