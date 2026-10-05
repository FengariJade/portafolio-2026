"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import clsx from "clsx";
import { useI18n } from "@/locales/client";
import Image from "next/image";
import { MapButton } from "../Brand/map-button";

function getColorFromClass(className: string): string {
  const tempElement = document.createElement("div");
  tempElement.className = className;
  document.body.appendChild(tempElement);
  const computedStyle = window.getComputedStyle(tempElement);
  const color = computedStyle.color;
  document.body.removeChild(tempElement);
  return color.replace("rgb(", "").replace(")", "");
}

interface ParallaxProps {
  children: React.ReactNode;
  color: string;
  className?: string;
}

const ParallaxText = ({ children, color, className }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const element = ref.current.querySelector("#text_title") as HTMLElement;
      if (element) {
        element.style.background = `linear-gradient(to right, rgba(${color}, 1) 0%, rgba(${color}, .1) 100%)`;
        element.style.backgroundClip = `text`;
        element.style.webkitBackgroundClip = `text`;
        element.style.color = "transparent";
      }
    }
  }, [isInView, color]);

  return (
    <div ref={ref} className={clsx("flex-grow-0", className)}>
      <motion.div
        initial={{ x: "-5%", opacity: 0 }}
        animate={isInView ? { x: "0%", opacity: 1 } : {}}
        transition={{ type: "tween", duration: 0.75, ease: "easeOut" }}
      >
        <span id="text_title" className={clsx("inline-block", className)}>
          {children}
        </span>
      </motion.div>
    </div>
  );
};

export const CardTag = () => {
  const t = useI18n();
  const [color, setColor] = useState<string>("63, 63, 70");

  return (
    <div className="flex w-full">
      <h2 className="font-medium uppercase title_font w-full flex flex-col justify-center items-center text-center">
        <ParallaxText color={color} className="w-full flex items-center justify-end">
          <div className="leading-[1] text-[4.096rem] sm:text-[5.12rem] md:text-[6.4rem] lg:text-[8rem] xl:text-[10rem] 2xl:text-[12.5rem] text-[#3f3f46]">
            {t("home.tagline.first")}
          </div>
        </ParallaxText>
        <ParallaxText color={color} className="w-full flex items-center justify-center">
          <div
            className={clsx(
              "leading-[1] text-[4.096rem] sm:text-[5.12rem] md:text-[6.4rem] lg:text-[8rem] xl:text-[10rem] 2xl:text-[12.5rem]",
              "text-gradient-to-b from-[15%] to-[85%]",
              "from-[#60c3dc] to-[#504d9b]"
            )}
          >
            {t("home.tagline.second")}
          </div>
        </ParallaxText>
        <ParallaxText color={color} className="w-full flex items-center justify-start">
          <div className="leading-[1] text-[4.096rem] sm:text-[5.12rem] md:text-[6.4rem] lg:text-[8rem] xl:text-[10rem] 2xl:text-[12.5rem] text-[#3f3f46]">
            {t("home.tagline.third")}
          </div>
        </ParallaxText>
      </h2>
    </div>
  );
};

export const CardTag2 = () => {
  return (
    <section className="relative w-full overflow-hidden pb-40">

      {/* ===== TÍTULO SUPERIOR ===== */}
      <div className="w-full flex justify-center pb-16">
        <h2 className="uppercase text-center">
          <span
            className="
              text-[#3f3f46]
              title_font_dm
              leading-[1]
              text-[1.9rem]
              md:text-[2.725rem]
              lg:text-[3.65rem]
              xl:text-[4.8rem]
              2xl:text-[5.25rem]
            "
          >
            UNIDOS EN UN MISMO EQUIPO
          </span>
        </h2>
      </div>

      {/* ===== CONTENEDOR RELATIVO GENERAL ===== */}
      <div className="relative w-full">

        <div className="relative w-full max-w-[100rem] mx-auto px-6 md:px-10">
          <Image
            src="/images/home/map.svg"
            alt="Mapa"
            width={1820}
            height={900}
            priority
            className="w-full h-auto object-contain"
          />

          {/* BOTONES ENCIMA */}
          {/* Norteamérica */}
          <MapButton top="28%" left="19%" />

          {/* Sudamérica */}
          <MapButton top="58%" left="27%" />

          {/* Sudamérica 2 */}
          <MapButton top="74%" left="30%" />

          {/* Europa */}
          <MapButton top="24%" left="48%" />

          {/* África */}
          <MapButton top="35%" left="58%" />

          {/* Asia */}
          <MapButton top="33%" left="77%" />

          {/* Asia 2 */}
          <MapButton top="13%" left="64%" />
        </div>


        {/* ===== CÍRCULO FUERA DEL MAPA ===== */}
        <div
          className="
            absolute
            bottom-[-3rem]
            right-6
            md:bottom-[-4rem]
            md:right-12
            lg:bottom-[-6rem]
            lg:right-16
          "
        >

        <div
          className="
            absolute
            right-full
            bottom-6
            mr-5
            hidden md:block
          "
        >
          <div
            className="
              relative
              bg-white
              rounded-[1.25rem]
              px-6 py-4
              shadow-[0_8px_20px_rgba(0,0,0,0.15)]
              max-w-[18rem]
              text-center
            "
          >
            <p className="text-[#3f3f46] text-sm leading-snug font-medium">
              ¿Necesitas ayuda?
              <br />
              <span className="font-semibold">¡Conversemos!</span>
            </p>

            {/* Pico */}
            <div
              className="
                absolute
                right-[-0.75rem]
                top-1/2
                -translate-y-1/2
                w-5 h-5
                bg-white
                rotate-45
              "
            />
          </div>
        </div>


          <div
            className="
              w-[5.5rem]
              h-[5.5rem]
              md:w-[7rem]
              md:h-[7rem]
              lg:w-[8rem]
              lg:h-[8rem]
              rounded-full
              bg-[#60C3DC]
              flex
              items-center
              justify-center
            "
          >
            <Image
              src="/images/home/robotface.svg"
              alt="Robot"
              width={64}
              height={64}
              className="
                w-[3rem]
                md:w-[3.75rem]
                lg:w-[4.5rem]
                h-auto
              "
            />
          </div>
        </div>

      </div>
    </section>

  );
};
