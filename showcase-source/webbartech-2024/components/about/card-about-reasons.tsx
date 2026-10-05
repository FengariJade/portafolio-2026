"use client";

import { reasons } from "@/data/information";
import { useI18n } from "@/locales/client";
import { useState } from "react";
import Image from "next/image";
import { TitleBartech } from "../title-bartech";

const shapes = [
  "/images/about/Forma2.svg",
  "/images/about/Forma4.svg",
  "/images/about/Forma1.svg",
  "/images/about/Forma3.svg",
];

export const CardAboutReasons = () => {
  const t = useI18n();
  const [index, setIndex] = useState(0);
  const item = reasons[index];

  return (
    <section className="relative z-30 w-full bg-[#38C0E0] flex flex-col items-center overflow-hidden">

  {/* TÍTULO */}
  <div className="pt-40 pb-28 title_font_dm">
    <h2 className=" text-white text-5xl lg:text-7xl xl:text-8xl tracking-wide text-center">
      {t("about.reasons.title.first")}
    </h2>
  </div>

  {/* CONTENIDO */}
  <div className="w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 items-center gap-20 px-6 md:px-12 xl:px-20 pb-40">

    {/* IZQUIERDA – TEXTO */}
    <div className="flex flex-col items-start text-black max-w-xl mx-auto">

      <span className="text-[9rem] font-extrabold leading-none mb-2">
        {index + 1}
      </span>

      <h3 className="text-3xl font-bold uppercase mb-6">
        RAZÓN
      </h3>

      <h4 className="text-2xl font-semibold mb-4">
        {t(item.title as keyof typeof t)}
      </h4>

      <p className="text-lg leading-relaxed">
        {t(item.description as keyof typeof t)}
      </p>
    </div>

    {/* DERECHA – FORMAS LIBRES */}
    <div className="relative w-[420px] h-[360px] mx-auto rotate-[-6deg]">

      {shapes.map((shape, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          className="absolute transition-transform hover:scale-105"
          style={{
            top: [
              "0%",    // Forma 1
              "22%",   // Forma 2
              "40%",   // Forma 3
              "60%",   // Forma 4
            ][i],
            left: [
              "0%",
              "28%",
              "55%",
              "18%",
            ][i],
          }}
        >
          <Image
            src={shape}
            alt={`Forma ${i + 1}`}
            width={140}
            height={140}
            className={`
              transition-colors duration-300
              ${index === i ? "text-black" : "text-white"}
            `}
          />
        </button>
      ))}

    </div>
  </div>
</section>

  );
};
